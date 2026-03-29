<script setup>
import { ref } from "vue";
import { useBlogStore } from "@/stores/blogsStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import AnimatedTitle from "@/components/AnimatedTitle.vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const blogStore = useBlogStore();
const { blogData } = storeToRefs(blogStore);
const router = useRouter();

const swiperModules = [Autoplay, Navigation];

const swiperOptions = {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: false,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: ".blog-next",
    prevEl: ".blog-prev"
  },
  breakpoints: {
    640: { slidesPerView: 1.2, spaceBetween: 24 },
    768: { slidesPerView: 2, spaceBetween: 24 },
    1024: { slidesPerView: 3, spaceBetween: 24 } // 3 full cards on desktop
  }
};

const redirect = (id) => {
  router.push(`/blog-details/${id}`);
};
</script>


<template>
  <section class="bg-[#FFEEE9] py-10 xl:py-24">
    <div class="max-w-7xl mx-auto px-4 xl:px-0">
      <div class="text-center">
        <AnimatedTitle
          text="Unlocking Real Estate"
          customClass="title-text"
        />
        <p class="font-outfit">
          Your key to understanding market shifts, property laws, and investment
          tips
        </p>
      </div>

      <!-- Swiper instead of manual horizontal scroll -->
      <Swiper
        class="mt-8 pb-4"
        :modules="swiperModules"
        v-bind="swiperOptions"
      >
        <SwiperSlide
          v-for="value in blogData"
          :key="value._id"
          class="!flex !justify-center"
        >
          <div
            class="relative w-[90%] md:w-[450px] overflow-hidden cursor-pointer"
            @click="redirect(value._id)"
          >
            <div class="w-full h-48 md:h-60 overflow-hidden">
              <img
                :src="value.coverImage"
                :alt="value.title"
                class="w-full h-full object-cover rounded-2xl hover:scale-105 transition-all"
              />
            </div>

            <p
              class="font-outfit font-semibold text-sm md:text-base px-2 pt-3 pb-4"
            >
              {{ value.title }}
            </p>

            <button
              class="bg-white font-outfit font-semibold flex items-center gap-1 px-4 py-2 rounded-full"
            >
              <span>Know More</span>
              <i class="pi pi-arrow-up-right"></i>
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

          <div
        class="hidden md:flex items-center justify-center w-full gap-3 text-[18px] mt-10"
      >
        <button
          class="pi pi-angle-left border border-black p-2 rounded-full bg-white blog-prev"
        ></button>
        <button
          class="pi pi-angle-right border border-black p-2 rounded-full bg-white blog-next"
        ></button>
      </div>
  </section>
</template>

