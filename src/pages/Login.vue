<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <p v-if="user">Welcome, {{ user.name }}!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      user: null
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: this.email, password: this.password })
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        console.log('Login successful:', data);
        this.user = data.user;
        localStorage.setItem('token', data.token);
        this.error = '';

        // Проверка токена
        this.verifyToken();
      } catch (error) {
        console.error('Error during login:', error);
        this.error = error.message;
      }
    },
    async verifyToken() {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3000/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        console.log('Current user:', data);
        this.user = data; // Обновите информацию о пользователе
      } catch (error) {
        console.error('Error verifying token:', error);
        this.error = error.message;
      }
    }
  },
  created() {
    // Проверка токена при загрузке компонента
    const token = localStorage.getItem('token');
    if (token) {
      this.verifyToken();
    }
  }
};
</script>
