<template>
    <div class="p-3 text-white flex">
        <div class="overflow-x-hidden w-2/3">
            <p class="font-bold text-2xl text-center">{{ currentItem.ItemName }}</p>
            <div class="swiper-container" ref="swiper">
                <div class="swiper-wrapper">
                    <div v-for="(img, index) in currentItem.img" :key="index" class="swiper-slide">
                        <img :src="img" class="img-equal-height" />
                    </div>
                </div>
                <p class="text-2xl text-center">← Листай изображения →</p>
            </div>
        </div>

        <div class="p-3 mt-3 w-1/2 text-xl rounded-md item-specifications">
            <p>{{ currentItem.description }}</p>
            <p>{{ currentItem.note }}</p>
            <p v-if="currentItem.specifications && Object.keys(currentItem.specifications).length > 0">Характеристики:
            </p>
            <div v-if="currentItem.specifications && Object.keys(currentItem.specifications).length > 0">
                <div v-if="currentItem.specifications.WidthSheetFull">
                    <p>Ширина листа полная: {{ currentItem.specifications.WidthSheetFull }}</p>
                </div>
                <div v-if="currentItem.specifications.WidthUseful">
                    <p>Ширина полезная: {{ currentItem.specifications.WidthUseful }}</p>
                </div>
                <div v-if="currentItem.specifications.HeightProfileSteps">
                    <p>Высота ступеней профиля: {{ currentItem.specifications.HeightProfileSteps }}</p>
                </div>
                <div v-if="currentItem.specifications.SheetThickness">
                    <p>Толщина листа: {{ currentItem.specifications.SheetThickness }}</p>
                </div>
                <div v-if="currentItem.specifications.CustomLengths">
                    <p>Длины на заказ: {{ currentItem.specifications.CustomLengths }}</p>
                </div>
                <div v-if="currentItem.specifications.WavelengthProfile">
                    <p>Длина волны профиля: {{ currentItem.specifications.WavelengthProfile }}</p>
                </div>
                <div v-if="currentItem.specifications.OverallWidth">
                    <p>Габаритная ширина {{ currentItem.specifications.OverallWidth }}</p>
                </div>
                <div v-if="currentItem.specifications.UsefulWidth">
                    <p>Полезная ширина {{ currentItem.specifications.UsefulWidth }}</p>
                </div>
                <div v-if="currentItem.specifications.RecommendedSheetLength">
                    <p>Рекомендуемая длина листа {{ currentItem.specifications.RecommendedSheetLength }}</p>
                </div>
            </div>
            <p>{{ currentItem.price }} р.</p>
        </div>

    </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
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

onMounted(() => {
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 10,
    });
    swiper.update();
});
</script>

<style>
.img-equal-height {
    height: 100%; /* Установите высоту изображения в 100% */
    width: auto; /* Позволяет изображению сохранять соотношение сторон */
    max-width: 100%; /* Избегает превышения максимальной ширины */
}
</style>