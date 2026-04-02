<script setup>
import { ref, computed, onMounted } from "vue";
import { useProjectStore } from "@/stores/projectStore";
import { storeToRefs } from "pinia";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

const projectStore = useProjectStore();
onMounted(async () => {
  await projectStore.getProjectAffordiablityData();
});

const { projectAffordablityData } = storeToRefs(projectStore);

const activeTab = ref("under");

// Data like your UI (possession-based cards)
const data = {
  under: [
    {
      title: "Possession in '27",
      count: "544+ projects",
      bg: "bg-[#E8DFC8]",
    },
    {
      title: "Possession in '28",
      count: "382+ projects",
      bg: "bg-[#EADDE3]",
    },
    {
      title: "Possession in '29",
      count: "233+ projects",
      bg: "bg-[#DCEBE3]",
    },
    {
      title: "Possession Beyond '29",
      count: "287+ projects",
      bg: "bg-[#DCE3EC]",
    },
    {
      title: "Possession in '30",
      count: "190+ projects",
      bg: "bg-[#F1E4D3]",
    },
  ],
};

const activeCards = computed(() => data[activeTab.value] || []);
</script>

<template>
  <section class="max-w-7xl mx-auto py-10 px-4 2xl:px-0">
    <h1 class="title-text text-center">Projects by Budget</h1>
    <!-- Swiper -->
    <div class="mt-6">
      <Swiper
        :space-between="20"
        :slides-per-view="4"
        :breakpoints="{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }"
      >
        <SwiperSlide
          v-for="(card, index) in projectAffordablityData"
          :key="index"
        >
          <div
            class="rounded-2xl h-[420px] overflow-hidden relative shadow-sm border text-white"
          >
            <!-- Background Image -->
            <img
              :src="card?.propertyPictures[0]"
              class="absolute inset-0 w-full h-full object-cover"
            />

            <!-- Dark Overlay -->
            <div class="absolute inset-0 bg-black/50"></div>

            <!-- Content -->
            <div class="relative z-10 p-5 flex flex-col justify-between h-full">
              <div>
                <h2 class="text-[24px] font-semibold">
                  {{ card?.projectName }}
                </h2>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>
