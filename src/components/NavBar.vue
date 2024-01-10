<script setup>

</script>

<template>
    <nav class="flex justify-between px-2">

        <!-- logo and name -->
        <div class="flex items-center">
            <router-link :to="{ path: `home` }">
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
    <div class="flex h-11 m-auto mt-2 bg-menu text-xl">
        <router-link :to="{ path: `catalog` }"><div><a>Каталог</a></div></router-link>
        <router-link :to="{ path: `about`}"><a>О нас</a></router-link>
        <router-link :to="{ path: `partners`}"><a>Партнерам</a></router-link>
        <router-link :to="{ path: `customers`}"><a>Покупателям</a></router-link>
        <router-link :to="{ path: `documents`}"><a>Документы</a> </router-link>
        <router-link :to="{ path: `contacts`}"><a>Контакты</a></router-link>
    </div>
    <!-- /menu -->
</template>