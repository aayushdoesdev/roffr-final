<script setup>
import { useProjectStore } from "@/stores/projectStore";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { storeToRefs } from "pinia";

const projectStore = useProjectStore()
const {specificProjectDetails} = storeToRefs(projectStore)

const images = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600",
  "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1600",
  "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1600",
];

const highlights = [
  "Gated community with security and leisure amenities",
  "Close to major South Goa beaches like Colva & Benaulim",
  "Good connectivity to Margao",
  "Focus on peaceful, wellness-oriented lifestyle",
  "Designed with modern architecture + Goan aesthetic elements",
];
</script>

<template>
  <section
    class="py-10 max-w-7xl mx-auto px-4 2xl:px-0 mt-10 flex flex-col gap-6"
  >
    <div class="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
      <div>
        <h1 class="text-3xl font-semibold">{{ specificProjectDetails?.projectName }}</h1>
        <p class="text-gray-500">{{ specificProjectDetails?.venue }}</p>
      </div>

      <div class="flex gap-6 text-gray-600">
        <div class="flex items-center gap-2 cursor-pointer">
          <i class="pi pi-share-alt"></i> Share
        </div>
        <div class="flex items-center gap-2 cursor-pointer">
          <i class="pi pi-sliders-h"></i> Compare
        </div>
        <div class="flex items-center gap-2 cursor-pointer">
          <i class="pi pi-heart"></i> Shortlist
        </div>
      </div>
    </div>

    <!-- Top Header -->
    <div class="flex flex-col xl:flex-row items-stretch justify-between gap-6">
      <div class="w-full xl:w-[70%]">
        <!-- Tabs -->
        <div
          class="flex justify-between gap-6 border rounded-full p-1 w-full mb-6 bg-gray-50 overflow-x-auto whitespace-nowrap"
        >
          <div
            class="flex items-center gap-2 bg-black text-white px-4 py-1 rounded-full"
          >
            <i class="pi pi-images"></i> Photos
          </div>
          <div class="flex items-center gap-2 text-gray-600">
            <i class="pi pi-video"></i> Video
          </div>
          <div class="flex items-center gap-2 text-gray-600">
            <i class="pi pi-star"></i> Amenities
          </div>
          <div class="flex items-center gap-2 text-gray-600">
            <i class="pi pi-th-large"></i> Project Plans
          </div>
          <div
            class="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full"
          >
            <i class="pi pi-eye"></i> Views
          </div>
        </div>

        <div class="">
          <Swiper class="rounded-xl overflow-hidden">
            <SwiperSlide v-for="(img) in specificProjectDetails?.propertyPictures" :key="i">
              <img :src="img" class="w-full h-[500px] object-cover" />
            </SwiperSlide>
          </Swiper>

          <div class="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
            <img
              v-for="(img) in specificProjectDetails?.propertyPictures"
              :key="i"
              :src="img"
              class="h-20 w-full object-cover rounded-lg cursor-pointer hover:opacity-80"
            />
          </div>
        </div>
      </div>

      <div class="w-full xl:w-[30%]">
        <div class="border rounded-xl p-3 h-full flex flex-col justify-between shadow-sm w-full bg-gray-50">
          <div class="">
            <h2 class="text-[28px] font-semibold mb-2">PROJECT HIGHLIGHTS</h2>
            <p class="text-sm text-gray-500 mb-4">
              GQ8C+3FF, Candolim, Goa 403511, India
            </p>

            <div class="text-blue-600 text-sm mb-4 cursor-pointer">
              View on Map
            </div>

            <ul class="space-y-3 text-sm text-gray-700">
              <li v-for="(item, i) in highlights" :key="i" class="flex gap-2">
                <i class="pi pi-circle-fill text-[6px] mt-2"></i>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="border-t border-black pt-4 mt-6 xl:mt-0">
            <button class="border rounded-md w-full py-2 border-black">Download Brochure</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
