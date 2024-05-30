<template>
    <div class="flex justify-center items-center h-screen">
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4 text-center">Корзина</h1>
        <div v-if="cart.length > 0">
          <div v-for="item in cart" :key="item.id" class="flex justify-between items-center mb-3 border-b pb-2">
            <p class="text-lg">{{ item.name }} x {{ item.quantity }}</p>
            <p class="text-lg">{{ item.price * item.quantity }} р.</p>
          </div>
          <h2 class="text-xl font-semibold text-center mb-4">Итоговая сумма: {{ totalAmount }} р.</h2>
          <button 
            @click="placeOrder" 
            class="w-full py-2 px-4 rounded-md transition-colors duration-300"
            :class="{'bg-blue-500 text-white hover:bg-blue-600': canPlaceOrder, 'bg-gray-300 text-gray-500 cursor-not-allowed': !canPlaceOrder}" 
            :disabled="!canPlaceOrder">
            Оформить заказ
          </button>
          <p v-if="!isAuthorized" @click="redirectToRegister" class="text-center text-red-500 mt-2 cursor-pointer hover:underline">
            Для оформления заказа необходимо авторизоваться.
          </p>
          <p v-if="isAuthorized && (!user.fullName || !user.phoneNumber)" @click="redirectToProfile" class="text-center text-red-500 mt-2 cursor-pointer hover:underline">
            Заполните дополнительную информацию в профиле для оформления заказа.
          </p>
        </div>
        <div v-else>
          <p class="text-center text-lg">Корзина пуста</p>
        </div>
        <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
        <p v-if="success" class="text-green-500 text-center mt-4">{{ success }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cart: [],
        totalAmount: 0,
        error: '',
        success: '',
        isAuthorized: false,
        user: {},
        canPlaceOrder: false,
      };
    },
    created() {
      this.loadCart();
      this.checkAuthorization();
    },
    methods: {
      loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.cart = cart;
        this.calculateTotalAmount();
      },
      calculateTotalAmount() {
        this.totalAmount = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      },
      async checkAuthorization() {
        const token = localStorage.getItem('token');
        if (token) {
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
            this.isAuthorized = true;
            this.user = user;
            this.checkIfCanPlaceOrder();
          } catch (error) {
            this.error = error.message;
            this.isAuthorized = false;
          }
        }
      },
      checkIfCanPlaceOrder() {
        this.canPlaceOrder = this.isAuthorized && this.user.fullName && this.user.phoneNumber;
      },
      async placeOrder() {
        const token = localStorage.getItem('token');
        if (!token || !this.user.fullName || !this.user.phoneNumber) {
          return;
        }
  
        try {
          const response = await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              items: this.cart,
              totalAmount: this.totalAmount
            })
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error);
          }
          this.success = 'Заказ успешно оформлен. Ожидайте звонка от нашего оператора.';
          localStorage.removeItem('cart');
          this.cart = [];
          this.totalAmount = 0;
        } catch (error) {
          this.error = error.message;
        }
      },
      redirectToRegister() {
        this.$router.push('/register');
      },
      redirectToProfile() {
        this.$router.push('/profile');
      }
    }
  };
  </script>
  
  <style>
  .cart-container {
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .checkout-button {
    padding: 10px;
    border: none;
    cursor: pointer;
    width: 100%;
    margin-top: 20px;
    border-radius: 5px;
  }
  
  .checkout-button.bg-blue-500:hover {
    background-color: darkblue;
  }
  </style>
  