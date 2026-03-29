<script setup>
import { useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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
    nextEl: ".stories-next",
    prevEl: ".stories-prev"
  },
  breakpoints: {
    640: { slidesPerView: 1.2, spaceBetween: 24 },
    768: { slidesPerView: 2, spaceBetween: 24 },
    1024: { slidesPerView: 3, spaceBetween: 24 } // 3 full cards on desktop
  }
};

const stories = [
  {
    id: "cs-1",
    img: "/dummy/dummy-case1.webp",
    title: "Buy Your Dream Home Smarter with Roffr"
  },
  {
    id: "cs-2",
    img: "/dummy/dummy-case2.webp",
    title: "How Raghav Saved Big with Roffr"
  },
  {
    id: "cs-3",
    img: "/dummy/dummy-case3.webp",
    title: "How Anuj Unlocked a Better Deal with Roffr"
  }
];

const redirectCase = (id) => {
  router.push(`/case-details/${id}`);
};
</script>


<template>
  <section class="max-w-7xl mx-auto py-10 px-4 2xl:px-0">
    <div class="text-center">
      <h1 class="title-text">
        Real Estate Success stories :<br />
        Transforming spaces
      </h1>
      <p class="font-outfit">
        Explore real-world case studies of innovation, design, and success in
        real estate
      </p>
    </div>

    <!-- arrows -->
    <div
      class="hidden md:flex items-center justify-end w-full gap-3 text-[18px] mt-6"
    >
      <button
        class="pi pi-angle-left border border-black p-2 rounded-full bg-white stories-prev"
      ></button>
      <button
        class="pi pi-angle-right border border-black p-2 rounded-full bg-white stories-next"
      ></button>
    </div>

    <!-- Swiper for all 3 cases, same size -->
    <Swiper
      class="mt-8 pb-4"
      :modules="swiperModules"
      v-bind="swiperOptions"
    >
      <SwiperSlide
        v-for="story in stories"
        :key="story.id"
        class="!flex !justify-center"
      >
        <div
          class="relative w-[90%] md:w-[450px] overflow-hidden cursor-pointer"
          @click="redirectCase(story.id)"
        >
          <div class="w-full h-48 md:h-60 overflow-hidden">
            <img
              :src="story.img"
              :alt="story.title"
              class="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <p
            class="font-outfit font-semibold text-sm md:text-base px-2 pt-3 pb-4"
          >
            {{ story.title }}
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

