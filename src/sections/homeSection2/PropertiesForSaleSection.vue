<script setup>
import { ref, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const tabs = [
  { label: "Budget", key: "under" },
  { label: "Type", key: "ready" },
  { label: "BHK", key: "upcoming" },
];

const activeTab = ref("under");

// Data like your UI (possession-based cards)
const data = {
  under: [
    {
      title: "Possession in '27",
      count: "544+ projects",
      bg: "bg-[#E8DFC8]",
      img: "https://cdn-icons-png.flaticon.com/512/1040/1040230.png",
    },
    {
      title: "Possession in '28",
      count: "382+ projects",
      bg: "bg-[#EADDE3]",
      img: "https://cdn-icons-png.flaticon.com/512/1040/1040230.png",
    },
    {
      title: "Possession in '29",
      count: "233+ projects",
      bg: "bg-[#DCEBE3]",
      img: "https://cdn-icons-png.flaticon.com/512/1040/1040230.png",
    },
    {
      title: "Possession Beyond '29",
      count: "287+ projects",
      bg: "bg-[#DCE3EC]",
      img: "https://cdn-icons-png.flaticon.com/512/1040/1040230.png",
    },
    {
      title: "Possession in '30",
      count: "190+ projects",
      bg: "bg-[#F1E4D3]",
      img: "https://cdn-icons-png.flaticon.com/512/1040/1040230.png",
    },
  ],

  ready: Array(6).fill({
    title: "Ready Homes",
    count: "300+ projects",
    bg: "bg-[#E0F2FE]",
    img: "https://cdn-icons-png.flaticon.com/512/609/609803.png",
  }),

  upcoming: Array(5).fill({
    title: "New Launch",
    count: "150+ projects",
    bg: "bg-[#FCE7F3]",
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png",
  }),
};

const activeCards = computed(() => data[activeTab.value] || []);
</script>

<template>
  <section class="max-w-7xl mx-auto py-10 px-4 2xl:px-0">
    <h1 class="title-text text-center">Properties For Sale</h1>

    <!-- Tabs -->
    <div
      class="flex items-center justify-center w-fit gap-6 border border-black p-1 rounded-full mx-auto mt-6"
    >
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="activeTab = tab.key"
        :class="[
          'px-5 py-2 rounded-full transition text-sm',
          activeTab === tab.key
            ? 'bg-black text-white'
            : 'text-gray-600',
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Swiper -->
    <div class="mt-6">
      <Swiper
        :space-between="20"
        :slides-per-view="3"
        :breakpoints="{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3 }
        }"
      >
        <SwiperSlide
          v-for="(card, index) in activeCards"
          :key="index"
        >
          <div
            class="rounded-2xl p-5 h-[320px] flex flex-col justify-between shadow-sm"
            :class="card.bg"
          >
            <div>
              <h2 class="text-lg font-semibold">{{ card.title }}</h2>
              <p class="text-sm text-gray-600 mt-1">
                {{ card.count }}
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>