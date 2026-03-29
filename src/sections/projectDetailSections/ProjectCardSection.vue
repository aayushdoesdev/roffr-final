<script setup>
import { useRoute } from "vue-router";
import { onMounted, computed, ref } from "vue";
import { useProjectStore } from "@/stores/projectStore";
import { storeToRefs } from "pinia";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";

const projectStore = useProjectStore();
const { specificPropertyDetails } = storeToRefs(projectStore);

const route = useRoute();
const propertyId = route.params.id;

onMounted(async () => {
  await projectStore.getProjectById(propertyId);
});

const formatINR = (num) => `₹ ${Number(num || 0).toLocaleString("en-IN")}`;

const superAreaText = computed(() => {
  const p = specificPropertyDetails.value;
  if (!p) return "";
  if (p.minCarpetArea && p.maxCarpetArea) {
    return `${p.minCarpetArea} – ${p.maxCarpetArea} sq.ft.`;
  }
  if (p.minCarpetArea) return `${p.minCarpetArea} sq.ft.`;
  return "";
});
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 xl:px-0 mt-24">
    <div
      v-if="specificPropertyDetails"
      class="bg-gradient-to-r from-[#EB3131] to-[#DDA439] p-6 md:p-8 rounded-[24px] flex flex-col gap-6 md:gap-10 items-stretch text-white w-full"
    >
      <!-- Full Width Image Carousel -->
      <div class="w-full">
        <div class="rounded-[18px] overflow-hidden h-[500px] mx-auto">
          <Swiper
            :modules="[Autoplay, Navigation]"
            :slides-per-view="1"
            :space-between="10"
            :autoplay="{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }"
            :loop="true"
            :speed="800"
            class="h-full"
            :navigation="{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom'
            }"
          >
            <SwiperSlide
              v-for="(image, index) in specificPropertyDetails.images"
              :key="index"
            >
              <img
                :src="image"
                :alt="`${specificPropertyDetails.projectName} - Image ${index + 1}`"
                class="w-full h-full object-cover rounded-[18px]"
              />
            </SwiperSlide>
            <!-- Navigation buttons -->
            <div class="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 !important">
              <i class="pi pi-chevron-left text-lg"></i>
            </div>
            <div class="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 !important">
              <i class="pi pi-chevron-right text-lg"></i>
            </div>
          </Swiper>
        </div>
      </div>

      <!-- Right content - Original text sizes -->
      <div class="w-full font-inter flex flex-col gap-4">
        <!-- Title + location - Original sizes -->
        <div>
          <h1 class="font-outfit text-[28px] md:text-[34px] leading-tight">
            {{ specificPropertyDetails?.projectName }}
          </h1>

          <p class="mt-1 text-[14px]">
            {{ specificPropertyDetails?.address }}
          </p>

          <p class="mt-1 text-sm md:text-base">
            Sector - {{ specificPropertyDetails?.region }},
            {{ specificPropertyDetails?.city }}
          </p>
          <p class="mt-1 text-sm md:text-base">
            Rera No - {{ specificPropertyDetails?.reraNo }}
          </p>
        </div>

        <!-- Config chips - Original -->
        <div class="flex flex-wrap gap-2 mt-2">
          <button
            v-for="config in specificPropertyDetails?.PropertyConfig"
            :key="config"
            class="px-3 py-1 rounded-full border border-white/60 text-xs md:text-sm bg-white/5"
          >
            {{ config }}
          </button>
        </div>

        <!-- Super area - Original -->
        <p v-if="superAreaText" class="text-sm md:text-base mt-1">
          Super area : {{ superAreaText }}
        </p>

        <!-- Prices & discount - Original sizes -->
        <div class="mt-4 flex flex-col gap-2 md:gap-3">
          <div class="flex justify-between text-[20px]">
            <span>Target Price</span>
            <span>Developer price</span>
          </div>

          <div class="flex justify-between items-baseline">
            <span class="text-2xl md:text-3xl font-semibold">
              {{ formatINR(specificPropertyDetails?.priceMin) }}
            </span>
            <span class="text-lg md:text-3xl line-through opacity-80">
              {{ formatINR(specificPropertyDetails?.priceMax) }}
            </span>
          </div>

          <!-- simple discount display based on min/max - Original -->
          <div
            v-if="
              specificPropertyDetails?.priceMax &&
              specificPropertyDetails?.priceMin
            "
            class="inline-flex items-center gap-2 mt-2 pl-2 px-4 py-2 rounded-xl bg-gradient-to-r from-white via-white to-transparent text-[#1a9b32] text-xs md:text-sm font-semibold max-w-max rounded-r-none"
          >
            <i
              class="pi pi-percentage rounded-full bg-[#1a9b32] text-white flex items-center justify-center text-[8px] p-2"
            ></i>

            <span>
              Up to
              {{
                (
                  specificPropertyDetails?.priceMax -
                  specificPropertyDetails?.priceMin
                ).toLocaleString("en-IN")
              }}/- off
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.swiper-button-prev-custom.swiper-button-disabled,
.swiper-button-next-custom.swiper-button-disabled {
}

.swiper-button-prev-custom:hover:not(.swiper-button-disabled),
.swiper-button-next-custom:hover:not(.swiper-button-disabled) {
}
</style>
