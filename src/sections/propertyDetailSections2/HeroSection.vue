<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

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
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-semibold">Conscient Vista Arrozal</h1>
        <p class="text-gray-500">Candolim, Calangute</p>
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
    <div class="flex items-stretch justify-between gap-6">
      <div class="w-[70%]">
        <!-- Tabs -->
        <div
          class="flex justify-between gap-6 border rounded-full p-1 w-full mb-6 bg-gray-50"
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

        <div class="h-full">
          <Swiper class="rounded-xl overflow-hidden">
            <SwiperSlide v-for="(img, i) in images" :key="i">
              <img :src="img" class="w-full h-[500px] object-cover" />
            </SwiperSlide>
          </Swiper>

          <div class="grid grid-cols-5 gap-3 mt-4">
            <img
              v-for="(img, i) in images"
              :key="i"
              :src="img"
              class="h-20 w-full object-cover rounded-lg cursor-pointer hover:opacity-80"
            />
          </div>
        </div>
      </div>

      <div class="w-[30%] flex flex-col gap-6">
        <!-- KEY FEATURES CARD -->
        <div class="bg-[#f8f6f3] border rounded-2xl p-5 shadow-sm">
          <!-- Header -->
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold tracking-wide">KEY FEATURES</h2>

            <button
              class="flex items-center gap-2 border px-3 py-1.5 rounded-lg text-sm bg-white shadow-sm"
            >
              <i class="pi pi-file-pdf"></i>
              Brochure
            </button>
          </div>

          <div class="border-t mb-4"></div>

          <!-- Features -->
          <ul class="space-y-3 text-gray-700 text-sm">
            <li v-for="(item, i) in highlights" :key="i" class="flex gap-3">
              <span class="mt-2 w-2 h-[1px] bg-black"></span>
              <span>{{ item }}</span>
            </li>
          </ul>

          <div class="border-t my-5"></div>

          <!-- Dates -->
          <div class="flex justify-between text-sm">
            <div>
              <p class="text-gray-500">Listing Date</p>
              <p class="font-semibold">Mar 27, 2026</p>
            </div>

            <div class="text-right">
              <p class="text-gray-500">Last Updated</p>
              <p class="font-semibold">Mar 30, 2026</p>
            </div>
          </div>
        </div>

        <!-- VISIT DETAILS CARD -->
        <div class="bg-[#f8f6f3] border rounded-2xl p-5 shadow-sm">
          <h2 class="text-lg font-semibold tracking-wide mb-5">
            VISIT DETAILS
          </h2>

          <!-- Grid Info -->
          <div class="grid grid-cols-2 gap-y-5 gap-x-4 text-sm">
            <div>
              <p class="text-gray-500">Available From</p>
              <p class="border-b mt-1 pb-1">Mar 27, 2026</p>
            </div>

            <div>
              <p class="text-gray-500">Visit Days</p>
              <p class="border-b mt-1 pb-1">Mon - Sat</p>
            </div>

            <div>
              <p class="text-gray-500">Visit Timings</p>
              <p class="border-b mt-1 pb-1">10 AM - 08 PM</p>
            </div>

            <div>
              <p class="text-gray-500">Showing Status</p>
              <p class="border-b mt-1 pb-1">Tenant Occupied</p>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex gap-3 mt-6">
            <button class="flex-1 border rounded-lg py-2 bg-white shadow-sm">
              Make an offer
            </button>

            <button class="flex-1 border rounded-lg py-2 bg-white shadow-sm">
              Request Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
