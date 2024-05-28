import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  birthdate: Date,
  fullName: String,
  phoneNumber: String
});

const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://127.0.0.1:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

const jwtSecret = 'your_jwt_secret';

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Received registration data:', { name, email, password });
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    console.log('User registered:', user);
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ error: 'Invalid credentials' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
  res.send({ token, user: { id: user._id, name: user.name, email: user.email } });
});

app.get('/api/user', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  try {
    const payload = jwt.verify(token, jwtSecret);
    const user = await User.findById(payload.userId);
    res.send(user);
  } catch (error) {
    res.status(401).send({ error: 'Unauthorized' });
  }
});

// Обработчик для обновления профиля пользователя
app.put('/api/user', async (req, res) => {
  const { fullName, birthdate, phoneNumber } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  try {
    const payload = jwt.verify(token, jwtSecret);
    const user = await User.findByIdAndUpdate(payload.userId, { fullName, birthdate, phoneNumber }, { new: true });
    res.send(user);
  } catch (error) {
    res.status(401).send({ error: 'Unauthorized' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
