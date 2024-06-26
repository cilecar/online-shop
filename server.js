import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  birthdate: Date,
  fullName: String,
  phoneNumber: String,
});

const orderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  fullName: String,
  phoneNumber: String,
  email: String,
  items: Array,
  totalAmount: Number,
  orderDate: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderSchema);

mongoose
  .connect("mongodb+srv://mrcraboytm:mrcrabo1989@cluster0.mpxhujx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const jwtSecret = "your_jwt_secret";

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received registration data:", { name, email, password });
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "Пользователь уже зарегистрирован" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    console.log("User registered:", user);
    res.status(201).send({ message: "Пользователь успешно зарегистрирован" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ error: "Пользователь не найден или данные для входа неверные" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send({ error: "Пользователь не найден или данные для входа неверные" });
  }
  const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1h" });
  res.send({ token });
});

app.get("/api/user", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(401).send({ error: "Unauthorized" });
  }
});

app.put("/api/user", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const updatedUser = await User.findByIdAndUpdate(decoded.userId, req.body, {
      new: true,
    }).select("-password");
    res.send(updatedUser);
  } catch (error) {
    res.status(401).send({ error: "Unauthorized" });
  }
});

app.post("/api/orders", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.userId);
    const order = new Order({
      userId: user._id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
    });
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(401).send({ error: "Unauthorized" });
  }
});

app.get("/api/orders", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const orders = await Order.find({ userId: decoded.userId });
    res.send(orders);
  } catch (error) {
    res.status(401).send({ error: "Unauthorized" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});