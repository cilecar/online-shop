<script setup>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <NavBar></NavBar>
  <router-view class="content"></router-view>
  <Footer class="footer"></Footer>
</template>
