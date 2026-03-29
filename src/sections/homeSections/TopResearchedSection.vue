<script setup>
import { storeToRefs } from "pinia";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useProjectStore } from "@/stores/projectStore";
import { useRouter } from "vue-router";
import { useShare } from "@/utils/useShare";
import ShareModal from "@/components/ShareModal.vue";
import AnimatedTitle from "@/components/AnimatedTitle.vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

const router = useRouter();
const {
  showShareModal,
  shareUrl,
  shareTitle,
  openShareModal,
  closeShareModal,
} = useShare();

const projectStore = useProjectStore();
const { groupBuyingData } = storeToRefs(projectStore);

const formatINR = (num) => `₹ ${Number(num || 0).toLocaleString("en-IN")}`;

// Swiper configuration to mimic your 3s auto slide
const swiperModules = [Autoplay, Navigation];

const swiperOptions = {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: groupBuyingData.value?.length > 3,
  autoplay: {
    delay: 3000, // same as scrollInterval
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".exclusive-group-next",
    prevEl: ".exclusive-group-prev",
  },
  breakpoints: {
    640: { slidesPerView: 1.2, spaceBetween: 24 },
    768: { slidesPerView: 2, spaceBetween: 24 },
    1024: { slidesPerView: 3, spaceBetween: 24 },
  },
};

const redirect = (id) => {
  if (isAuthenticated.value) {
    router.push(`/project-details/${id}`);
  } else {
    router.push("/login");
  }
};
</script>

<template>
  <section class="max-w-7xl mx-auto py-10 px-4 2xl:px-0">
    <div class="flex items-center justify-between gap-4">
      <div
        class="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start gap-2 text-center md:text-left w-full"
      >
        <div class="flex items-center gap-4">
          <div class="relative">
            <div class="h-3 w-3 bg-red-500 rounded-full"></div>
            <div
              class="absolute -inset-1 animate-ping bg-red-500 rounded-full opacity-75"
            ></div>
          </div>
          <h1 class="title-text text-red-500">Live</h1>
        </div>
        <AnimatedTitle text="Exclusive Group Launch" customClass="title-text" />
      </div>

      <!-- Swiper navigation controls -->
      <div class="hidden md:flex items-center gap-3 text-[18px]">
        <button
          class="pi pi-angle-left border border-black p-2 rounded-full bg-white exclusive-group-prev"
        ></button>
        <button
          class="pi pi-angle-right border border-black p-2 rounded-full bg-white exclusive-group-next"
        ></button>
      </div>
    </div>

    <!-- Swiper slider -->
    <Swiper class="mt-8 pb-4" :modules="swiperModules" v-bind="swiperOptions">
      <SwiperSlide
        v-for="project in groupBuyingData"
        :key="project._id"
        class="!flex !justify-center"
      >
        <article
          class="relative w-[90%] md:w-[400px] overflow-hidden rounded-3xl bg-black text-white cursor-pointer"
          @click="redirect(project._id)"
        >
          <div class="relative h-80">
            <img
              :src="project.thumbnail || project.images?.[0]"
              :alt="project.projectName"
              class="h-full w-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
            ></div>

            <div class="absolute top-4 left-4">
              <p
                class="bg-white text-black px-4 py-1 rounded-md font-inter font-semibold text-[12px]"
              >
                {{ project.projectStatus }}
              </p>
            </div>

            <div class="absolute top-4 right-4 flex flex-col gap-2 z-20">
              <button
                @click="
                  (e) => {
                    e.stopPropagation();
                    openShareModal(
                      `/project-details/${project._id}`,
                      project.projectName
                    );
                  }
                "
                class="h-9 w-9 rounded-full bg-white/90 flex items-center justify-center text-orange-500 shadow"
              >
                <i class="pi pi-share-alt text-base"></i>
              </button>
            </div>
          </div>

          <div class="p-4 bg-black">
            <div>
              <h2 class="text-xl font-semibold">
                {{ project.projectName }}
              </h2>
              <p class="text-sm text-gray-200">
                {{ project.region }}, {{ project.city }}
              </p>
            </div>

            <div class="flex justify-between text-xs text-gray-300 my-4">
              <div>
                <p class="uppercase tracking-wide">Configuration</p>
                <p class="text-sm text-white font-semibold capitalize">
                  {{ project.PropertyConfig?.join(" • ") }}
                </p>
              </div>

              <div class="border-l border-white/20 pl-4 text-right">
                <p class="uppercase tracking-wide">Joined</p>
              </div>
              <div class="border-l border-white/20 pl-4 text-right">
                <p class="uppercase tracking-wide">Openings</p>
              </div>
            </div>

            <div class="flex items-end justify-between mb-3">
              <div>
                <p class="text-xs text-gray-300">Group Target Price</p>
                <div class="flex items-baseline gap-1">
                  <span class="text-xl font-semibold">
                    {{ formatINR(project.priceMin) }}
                  </span>
                </div>
                <p class="text-xs text-gray-400 mt-1">
                  Market price up to
                  <span class="line-through opacity-70">
                    {{ formatINR(project.priceMax) }}
                  </span>
                </p>
              </div>
            </div>

            <button
              class="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-lg flex items-center gap-2 w-full justify-center"
              @click="redirect(project._id)"
            >
              Join Group
              <i class="pi pi-arrow-right text-xs"></i>
            </button>

            <div class="space-y-1 text-xs mt-4">
              <p class="text-green-400">
                ● {{ project.minCarpetArea }}–{{ project.maxCarpetArea }} sq.ft
                carpet area
              </p>
              <p class="text-gray-200">
                {{ project.builder?.name }} • Since {{ project.builder?.since }}
              </p>
              <p class="text-gray-400">RERA No: {{ project.reraNo }}</p>
            </div>
          </div>
        </article>
      </SwiperSlide>
    </Swiper>

    <ShareModal
      :show="showShareModal"
      :url="shareUrl"
      :title="shareTitle"
      @close="closeShareModal"
    />
  </section>
</template>
