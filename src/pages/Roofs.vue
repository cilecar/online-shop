<script setup>
import { RoofingCorrugatedBoard, MetalTiles } from '../../data';
</script>

<template>
    <main class="text-center mt-3 px-2">
        <h1 class="text-white text-3xl">Каталог кровли</h1>
        <div>
            <h1 class="text-white text-2xl text-left border-b border-solid border-white">Профнастил</h1>
            <div class="flex flex-wrap mt-3 gap-3">
                <div class="cardCatalog p-3 rounded-md text-white" v-for="item in RoofingCorrugatedBoard" :key="item.id">
                    <router-link :to="{ name: 'ItemPage', params: { id: item.id }}">
                        <p>{{ item.name }}</p>
                        <div class="flex justify-center">
                            <img :src="item.img.img1" class="max-h-40 mx-2" />
                        </div>
                        <p>Цена от {{ item.price }} р.</p>
                    </router-link>
                </div>
            </div>
        </div>
        <div>
            <h1 class="text-white text-2xl text-left border-b border-solid border-white">Металлочерепица</h1>
            <div class="flex flex-wrap mt-3 gap-3">
                <div class="cardCatalog p-3 rounded-md text-white" v-for="item in MetalTiles" :key="item.id">
                    <router-link :to="{ name: 'ItemPage', params: { id: item.id }}">
                        <p>{{ item.name }}</p>
                        <div class="flex justify-center">
                            <img :src="item.img.img1" class="max-h-40 mx-2" />
                        </div>
                        <p>Цена от {{ item.price }} р.</p>
                    </router-link>
                </div>
            </div>
        </div>
    </main>
</template>