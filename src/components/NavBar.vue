<script setup>
import { useRouter } from 'vue-router';

// Получаем объект роутера
const router = useRouter();

// Создаем реактивную переменную для отслеживания статуса авторизации
const isAuthenticated = !!localStorage.getItem('token');
</script>

<template>
    <nav class="flex justify-between p-2">

        <!-- logo and name -->
        <div class="flex items-center">
            <router-link :to="{ name: `home` }">
                <img class="h-24" src="../img/logo.png" alt="">
            </router-link>
            <div class="text-white text-3xl h-fit">
                <p>Кровля от</p>
                <p class="-ml-6">производителя</p>
            </div>
        </div>
        <!-- /logo and name -->

        <!-- social link -->
        <div class="items-center grid">
            <div class="flex gap-2">
                <img src="../img/map-pin-regular-24.png" alt="">
                <a href="https://yandex.ru/maps/-/CDqgaK9G" target="_blank" class="text-white text-xl">г.Краснодар, ул. Ростовское шоссе, д. 66</a>
            </div>

            <div class="flex gap-2">
                <img src="../img/phone-regular-24.png" alt="">
                <a href="tel:8 (800) 222-52-62" class="text-white text-xl">8 (800) 222-52-62</a>
            </div>

            <div class="flex gap-2">
                <img src="../img/gmail-logo-24.png" alt="">
                <a href="mailto:info@sstkvik.ru" class="text-white text-xl">info@sstkvik.ru</a>
            </div>
        </div>
        <!-- /social link -->
        
    </nav>

    <!-- menu -->
    <nav class="flex m-auto mt-2 bg-menu text-xl justify-between w-full">
        <router-link :to="{ path: `/roofs` }">Кровля</router-link>
        <router-link :to="{ path: `/about` }">О нас</router-link>
        <router-link :to="{ path: `/partners` }">Партнерам</router-link>
        <router-link :to="{ path: `/customers` }">Покупателям</router-link>
        <router-link :to="{ path: `/documents` }">Документы</router-link>
        <router-link :to="{ path: `/contacts` }">Контакты</router-link>
        <!-- Используем реактивную переменную для отображения кнопки -->
        <router-link v-if="!isAuthenticated" :to="{ path: `/register` }">Зарегистрироваться</router-link>
        <router-link v-else :to="{ path: `/profile` }">Профиль</router-link>
        <router-link :to="{ path: `/cart` }">Корзина</router-link>
    </nav>
    <!-- /menu -->
</template>
