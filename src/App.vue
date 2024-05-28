<script setup>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <NavBar></NavBar>
  <router-view class="content"></router-view>
  <Footer class="footer"></Footer>
</template>

<style>
#app {
  min-height: 100vh; /* Устанавливаем минимальную высоту равной высоте окна просмотра */
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1; /* Основной контент займет все доступное пространство */
}

.footer {
  flex-shrink: 0; /* Футер не будет сжиматься при нехватке места */
}
</style>
