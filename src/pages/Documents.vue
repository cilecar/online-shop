<template>
    <main class="text-white text-xl m-3 flex flex-col gap-3">
        <div class="flex flex-col gap-1">
            <h1 class="text-3xl font-bold text-center">Сертификаты на отделочные и строительные материалы</h1>
            <p>Продукция, изготавливаемая на заводе компании ВИК, соответствует всем установленным нормам и правилам.
            </p>
            <p>Мы заботимся о том, чтобы Ваш дом был Вашей крепостью надолго, что подтверждает наличие сертификатов на
                продукцию.</p>
        </div>
        <div class="flex flex-wrap gap-3">
            <div class="certificates" v-for="img in Certificates" :key="img.id">
                <a target="_blank" :href="img.img">
                    <img class="hover:scale-105 duration-300" :src="img.img" />
                </a>
            </div>
        </div>
    </main>
</template>

<script setup>
import { Certificates } from '../../data';
</script>