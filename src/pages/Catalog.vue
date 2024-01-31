<script setup>
import { Catalog } from '../../data';
</script>

<template>
    <main class="text-center mt-3">
        <div>
            <h1 class="text-white text-4xl">Каталог</h1>
        </div>
        <div v-for="item in Catalog" :key="id">
            
        </div>
    </main>
</template>