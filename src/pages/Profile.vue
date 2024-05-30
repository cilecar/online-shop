<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl font-bold mb-4 text-center">Профиль</h1>
    <div v-if="isEditing" class="space-y-3">
      <div>
        <label for="fullName" class="block text-xl font-medium">ФИО:</label>
        <input type="text" v-model="fullName" id="fullName" placeholder="Full Name" class="mt-1 p-2 w-full bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
      </div>
      <div>
        <label for="birthdate" class="block text-xl font-medium">Дата рождения:</label>
        <input type="date" v-model="birthdate" id="birthdate" placeholder="Birthdate" class="mt-1 p-2 w-full bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
      </div>
      <div>
        <label for="phoneNumber" class="block text-xl font-medium">Номер телефона:</label>
        <input type="text" v-model="phoneNumber" id="phoneNumber" placeholder="Phone Number" class="mt-1 p-2 w-full bg-gray-300 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">
      </div>
      <button @click="updateProfile" class="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Сохранить</button>
    </div>
    <div v-else>
      <div class="space-y-3">
        <div>
          <label class="block text-xl font-medium">ФИО:</label>
          <p class="mt-1 p-2 w-full  border-gray-300 rounded-md bg-gray-100">{{ fullName || 'Не заполнено' }}</p>
        </div>
        <div>
          <label class="block text-xl font-medium">Дата рождения:</label>
          <p class="mt-1 p-2 w-full border-gray-300 rounded-md bg-gray-100">{{ birthdate || 'Не заполнено' }}</p>
        </div>
        <div>
          <label class="block text-xl font-medium">Номер телефона:</label>
          <p class="mt-1 p-2 w-full border-gray-300 rounded-md bg-gray-100">{{ phoneNumber || 'Не заполнено' }}</p>
        </div>
      </div>
      <button @click="isEditing = true" class="w-full mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Редактировать</button>
    </div>
    <p v-if="error" class="text-red-500">{{ error }}</p>
    <p v-if="success" class="text-green-500">{{ success }}</p>
    <button @click="logout" class="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600">Выйти из аккаунта</button>
    </div>
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
      success: '',
      isEditing: false
    };
  },
  async created() {
    this.loadProfile();
  },
  methods: {
    async loadProfile() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.error = 'Вы неавторизованны';
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
        this.fullName = user.fullName || '';
        this.birthdate = user.birthdate ? new Date(user.birthdate).toISOString().substring(0, 10) : '';
        this.phoneNumber = user.phoneNumber || '';
      } catch (error) {
        this.error = error.message;
      }
    },
    async updateProfile() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.error = 'Вы неавторизованны';
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3000/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            fullName: this.fullName,
            birthdate: this.birthdate,
            phoneNumber: this.phoneNumber
          })
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        this.success = 'Обновление данных профиля успешны';
        this.error = '';
        this.isEditing = false;
      } catch (error) {
        this.error = error.message;
        this.success = '';
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }
};
</script>
