<template>
  <div class="min-w-80 mx-auto mt-8">
    <h1 class="text-3xl font-bold mb-4 text-white text-center">Регистрация</h1>
    <form @submit.prevent="register" class="space-y-3">
      <div>
        <label for="name" class="block text-xl font-medium text-gray-50">Никнейм:</label>
        <input type="text" v-model="name" id="name" autocomplete="name" required
          class="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
      </div>
      <div>
        <label for="email" class="block text-xl font-medium text-gray-50">Почта:</label>
        <input type="email" v-model="email" id="email" autocomplete="email" required
          class="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
      </div>
      <div>
        <label for="password" class="block text-xl font-medium text-gray-50">Пароль:</label>
        <input type="password" v-model="password" id="password" autocomplete="new-password" required
          class="mt-1 p-2 w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
      </div>
      <button type="submit"
        class="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Зарегистрироваться</button>
    </form>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <button @click="goToLogin"
      class="block w-full py-2 px-4 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 mt-4">Уже зарегистрированы?
      Войти</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: this.name, email: this.email, password: this.password })
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        console.log('Registration successful:', data);
        this.$router.push('/login');
      } catch (error) {
        console.error('Error during registration:', error);
        this.error = error.message;
      }
    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>
