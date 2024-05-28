<template>
  <div class="min-w-80 mx-auto mt-8">
    <h1 class="text-3xl font-bold mb-4 text-white text-center">Авторизация</h1>
    <form @submit.prevent="login" class="space-y-3">
      <div>
        <label for="email" class="block text-xl font-medium text-gray-50">Почта:</label>
        <input type="email" v-model="email" id="email" autocomplete="email" required class="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
      </div>
      <div>
        <label for="password" class="block text-xl font-medium text-gray-50">Пароль:</label>
        <input type="password" v-model="password" id="password" autocomplete="current-password" required class="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
      </div>
      <button type="submit" class="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Авторизоваться</button>
    </form>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <p v-if="user" class="text-green-500">Welcome, {{ user.name }}!</p>
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

        // Перенаправление на главную страницу
        this.$router.push('/');
        
        // Задержка перед перезагрузкой страницы (1 секунда)
        setTimeout(() => {
          window.location.reload();
        }, 500);
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
