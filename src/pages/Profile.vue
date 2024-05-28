<template>
    <div>
      <h1>Profile</h1>
      <form @submit.prevent="updateProfile">
        <input type="text" v-model="fullName" placeholder="Full Name" />
        <input type="date" v-model="birthdate" placeholder="Birthdate" />
        <input type="text" v-model="phoneNumber" placeholder="Phone Number" />
        <button type="submit">Save</button>
      </form>
      <p v-if="error">{{ error }}</p>
      <p v-if="success">{{ success }}</p>
  
      <!-- Добавленная кнопка "Выход" -->
      <button @click="logout">Выход</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fullName: '',
        birthdate: '',
        phoneNumber: '',
        error: '',
        success: ''
      };
    },
    async created() {
      this.loadProfile();
    },
    methods: {
      async loadProfile() {
        const token = localStorage.getItem('token');
        if (!token) {
          this.error = 'Unauthorized';
          return;
        }
        try {
          const response = await fetch('http://localhost:3000/api/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const user = await response.json();
          if (!response.ok) {
            throw new Error(user.error);
          }
          this.fullName = user.fullName;
          this.birthdate = user.birthdate ? new Date(user.birthdate).toISOString().substring(0, 10) : '';
          this.phoneNumber = user.phoneNumber;
        } catch (error) {
          this.error = error.message;
        }
      },
      async logout() {
        // Очищаем токен из localStorage
        localStorage.removeItem('token');
        // Перенаправляем пользователя на страницу входа или куда-то еще
        // В данном случае перенаправляем на главную страницу
        this.$router.push('/');
      }
    }
  };
  </script>
  