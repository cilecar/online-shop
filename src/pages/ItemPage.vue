<template>

    <div class="p-3 text-white grid">
        <div>
            <p class="font-bold text-2xl text-center">{{ currentItem.ItemName }}</p>
            <div class="flex justify-center items-center mt-3">
                <img v-for="img in currentItem.img" :key="img" :src="img" class="max-h-40 mx-2" />
            </div>
        </div>

        <div class=" p-3 rounded-md item-specifications">
            <p>{{ currentItem.description }}</p>
            <p>{{ currentItem.note }}</p>
            <p v-if="currentItem.specifications">Характеристики:</p>
            <div v-if="currentItem.specifications">
                <div>
                    <p>Габаритная ширина {{ currentItem.specifications.OverallWidth }}</p>
                </div>
                <div>
                    <p>Полезная ширина {{ currentItem.specifications.UsefulWidth }}</p>
                </div>
                <div>
                    <p>Рекомендуемая длина листа {{ currentItem.specifications.RecommendedSheetLength }}</p>
                </div>
            </div>
            <p>{{ currentItem.price }} р.</p>
        </div>
    </div>

</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useRoute } from 'vue-router';
import { RoofingCorrugatedBoard, MetalTiles } from '../../data';

const route = useRoute();

const currentItem = ref(null);

const findItemById = (id) => {
    const allItems = [...RoofingCorrugatedBoard, ...MetalTiles];
    const itemId = parseInt(id);
    const foundItem = allItems.find(item => item.id === itemId);
    return foundItem;
};

currentItem.value = findItemById(route.params.id);
</script>