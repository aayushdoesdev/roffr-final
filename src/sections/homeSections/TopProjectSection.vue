<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import { useProjectStore } from "@/stores/projectStore";
import { storeToRefs } from "pinia";
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
const { projectAffordablityData, wishlistData } = storeToRefs(projectStore);

const tabs = [
  { label: "Affordable", value: "affordable" },
  { label: "Luxury", value: "luxury" },
  { label: "New Launch", value: "new" },
];

const activeTab = ref(tabs[0].value);

const customerId = ref("");

const fetchProjects = () => {
  projectStore.getProjectAffordiablityData("mumbai", activeTab.value);
};

onMounted(() => {
  fetchProjects();
  customerId.value = localStorage.getItem("customerId");
  projectStore.getWishlist(customerId.value);
});

const isWishlisted = (projectId) => {
  return wishlistData.value?.some(
    (item) => item._id === projectId || item.id === projectId
  );
};


watch(activeTab, fetchProjects);

const setTab = (val) => {
  activeTab.value = val;
};

const formatINR = (num) => `₹ ${Number(num || 0).toLocaleString("en-IN")}`;

// Swiper config: auto-slide every 3s, same as your interval
const swiperModules = [Autoplay, Navigation];

const swiperOptions = {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: projectAffordablityData.value?.length > 3,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    // we will bind these to custom buttons in the template
    nextEl: ".top-projects-next",
    prevEl: ".top-projects-prev",
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

const handleWishlist = async (projectId, customer) => {
  try {
    await projectStore.addToWishlist(projectId, customer);

    toast.success("Added to wishlist", {
      autoClose: 1500,
    });

    // if addToWishlist returns something to indicate removal/add toggle,
    // you can branch and show different messages
  } catch (e) {
    console.error(e);
    toast.error("Could not update wishlist", {
      autoClose: 2000,
    });
  }
};
</script>

<template>
  <section class="max-w-7xl mx-auto pt-10 py-20 px-4 2xl:px-0">
    <div class="flex items-center justify-between gap-4">
      <AnimatedTitle text="Top Deals" customClass="title-text" />

      <div class="hidden md:flex items-center gap-3 text-[18px]">
        <button
          class="pi pi-angle-left border border-black p-2 rounded-full top-projects-prev"
        ></button>
        <button
          class="pi pi-angle-right border border-black p-2 rounded-full top-projects-next"
        ></button>
      </div>
    </div>

    <div class="mt-4 border-b border-gray-200 flex gap-8 text-[16px]">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="setTab(tab.value)"
        class="pb-2 transition-colors font-semibold font-urbanist"
        :class="
          activeTab === tab.value
            ? 'text-[#d3542f] border-b-2 border-[#d3542f]'
            : 'text-gray-700 border-b-2 border-transparent'
        "
      >
        {{ tab.label }}
      </button>
    </div>

    <Swiper class="mt-8 pb-4" :modules="swiperModules" v-bind="swiperOptions">
      <SwiperSlide
        v-for="value in projectAffordablityData"
        :key="value._id"
        class="!flex !justify-center"
      >
        <article
          class="relative w-[90%] md:w-[400px] overflow-hidden rounded-3xl bg-black text-white cursor-pointer"
          @click="redirect(value._id)"
        >
          <div class="relative h-72">
            <img
              :src="value.thumbnail || value.images?.[0]"
              :alt="value.projectName"
              class="h-full w-full object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
            ></div>

            <div class="absolute top-4 left-4">
              <p
                class="bg-white text-black px-4 py-1 rounded-md font-inter font-semibold text-[12px]"
              >
                {{ value.projectStatus }}
              </p>
            </div>

            <div class="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <button
                @click="
                  (e) => {
                    e.stopPropagation();
                    openShareModal(
                      `/property-details/${value._id}`,
                      value.projectName
                    );
                  }
                "
                class="h-9 w-9 rounded-full bg-white/90 flex items-center justify-center text-orange-500 shadow"
              >
                <i class="pi pi-share-alt text-base"></i>
              </button>

              <button
                @click="handleWishlist(value._id, customerId)"
                class="h-9 w-9 rounded-full bg-white/90 flex items-center justify-center text-orange-500 shadow"
              >
                <i
                  class="text-base"
                  :class="
                    isWishlisted(value._id) ? 'pi pi-heart-fill' : 'pi pi-heart'
                  "
                ></i>
              </button>
            </div>
          </div>

          <div class="px-4 pb-0 pt-4 bg-black">
            <div>
              <h2 class="text-xl font-semibold">
                {{ value.projectName }}
              </h2>
              <p class="text-sm text-gray-200">
                {{ value.region }}, {{ value.city }}
              </p>
            </div>

            <div class="flex justify-between text-xs text-gray-300 my-4">
              <div>
                <p class="uppercase tracking-wide">Configuration</p>
                <p class="text-sm text-white font-semibold">
                  {{ value.PropertyConfig?.join(" • ") }}
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
                <p class="text-xs text-gray-300">Starting Price</p>
                <div class="flex items-baseline gap-1">
                  <span class="text-xl font-semibold">
                    {{ formatINR(value.priceMin) }}
                  </span>
                </div>
                <p class="text-xs text-gray-400 mt-1">
                  Upto
                  <span class="line-through opacity-70">
                    {{ formatINR(value.priceMax) }}
                  </span>
                </p>
              </div>
            </div>

            <button
              class="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-lg flex items-center gap-2 w-full justify-center"
              @click="redirect(value._id)"
            >
              Join Group
              <i class="pi pi-arrow-right text-xs"></i>
            </button>

            <div class="space-y-1 my-4 text-xs">
              <p class="text-green-400 capitalize">
                ●
                {{
                  value.projectAffordability ||
                  "Affordable homes with smart value"
                }}
              </p>
              <p class="text-gray-200">
                {{ value.builder?.name }} • Since {{ value.builder?.since }}
              </p>
              <p class="text-gray-400">RERA No: {{ value.reraNo }}</p>
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
