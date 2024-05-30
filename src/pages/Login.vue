<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl font-bold mb-4  text-center">Авторизация</h1>
    <form @submit.prevent="login" class="space-y-3">
      <div>
        <label for="email" class="block text-xl font-medium">Почта:</label>
        <input type="email" v-model="email" id="email" autocomplete="email" required class="mt-1 p-2 w-full bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
      </div>
      <div>
        <label for="password" class="block text-xl font-medium">Пароль:</label>
        <input type="password" v-model="password" id="password" autocomplete="current-password" required class="mt-1 p-2 w-full bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
      </div>
      <button type="submit" class="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Авторизоваться</button>
      <button @click="goToReg" class="block w-full py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 mt-4">Еще не зарегистрированы Зарегистрироваться</button>
    </form>
    </div>
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
    },

    goToReg() {
      this.$router.push('/register');
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
