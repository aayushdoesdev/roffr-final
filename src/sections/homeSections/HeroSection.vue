<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter } from "vue-router";
import { useSearchStore } from "@/stores/SearchStore";
import { useProjectStore } from "@/stores/projectStore";
import { useModalStore } from "@/stores/modalStore";
import { storeToRefs } from "pinia";
import { debounce } from "@/utils/debounce";

const searchStore = useSearchStore();
const { searchSuggestionData, term } = storeToRefs(searchStore);
const projectStore = useProjectStore();
const { projectPropertyListData, uniqueCitiesData } = storeToRefs(projectStore);

const router = useRouter();
const modalStore = useModalStore();
const { openLoginModal } = modalStore;

const searchInput = ref("");
const suggestionsVisible = ref(false);
const containerRef = ref(null);
const selectedCity = ref("");
const cityDropdownOpen = ref(false);
const videoRef = ref(null);

// Word animation
const words = ["Alone", "Solo", "By Yourself", "Individually"];
const currentWord = ref(words[0]);
let currentIndex = 0;

// 👉 ADD: counter animation state
const discountPercent = ref(100);
const isAnimating = ref(false);

const updateTermDebounced = debounce((value) => {
  const v = value.trim();
  if (!v) {
    suggestionsVisible.value = false;
    return;
  }
  term.value = v;
  searchStore.getSearchSuggestion();
}, 300);

watch(searchInput, (newVal) => {
  updateTermDebounced(newVal);
  suggestionsVisible.value = newVal.trim().length > 0;
});

const suggestionsList = computed(() =>
  Array.isArray(searchSuggestionData.value)
    ? searchSuggestionData.value
    : searchSuggestionData.value?.data || []
);

const locationPills = computed(() => {
  if (!projectPropertyListData.value) return [];
  const regions = projectPropertyListData.value
    .map((p) => p.region)
    .filter((r) => r && r.trim().length > 0);
  return [...new Set(regions)].slice(0, 4);
});

const redirect = (suggestion) => {
  if (!suggestion?._id) return;
  const path =
    suggestion.itsTypeIs === "PROJECT"
      ? `/project-details/${suggestion._id}`
      : `/property-details/${suggestion._id}`;
  router.push(path);
};

const onSearchButtonClicked = () => {
  suggestionsVisible.value = false;
  const query = {};
  if (searchInput.value) query.q = searchInput.value;
  if (selectedCity.value) query.city = selectedCity.value;
  router.push({ path: "/project", query });
};

const onCitySelect = (city) => {
  selectedCity.value = city;
  cityDropdownOpen.value = false;
};

const selectLocation = (loc) => {
  searchInput.value = loc;
};

const handleClickOutside = (e) => {
  if (containerRef.value && !containerRef.value.contains(e.target)) {
    suggestionsVisible.value = false;
    cityDropdownOpen.value = false;
  }
};

const onSuggestionClick = (id) => {
  router.push(`/project-details/${id}`);
  suggestionsVisible.value = false;
};

function startWordAnimation() {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % words.length;
    currentWord.value = words[currentIndex];
  }, 2000);
}

// 👉 ADD: counter animation function (100 → 20)
const animateDiscountCounter = () => {
  if (isAnimating.value) return;

  isAnimating.value = true;
  const start = 100;
  const end = 20;
  const duration = 2500;
  const startTime = performance.now();

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    discountPercent.value = Math.floor(start - (start - end) * easeOut);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      discountPercent.value = end;
      isAnimating.value = false;
    }
  };

  requestAnimationFrame(animate);
};

const handleScroll = () => {
  document.querySelectorAll(".fade-in-slide").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      el.classList.add("in-view");
    }
  });
};

onMounted(async () => {
  document.addEventListener("click", handleClickOutside);

  if (videoRef.value) {
    videoRef.value.play().catch(console.log);
  }

  await projectStore.getProjectCities();
  if (!projectPropertyListData.value?.length) {
    await projectStore.getProjectPropertyList("project", "", "");
  }

  startWordAnimation();
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // 👉 ADD: start the counter a bit after mount
  setTimeout(() => {
    animateDiscountCounter();
  }, 500);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  if (videoRef.value) videoRef.value.pause();
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <section
    class="relative max-w-7xl mx-auto rounded-3xl mt-16 sm:mt-24 lg:mt-32 px-4 md:px-6 2xl:px-0"
  >
    <!-- Hero Background -->
    <div class="relative w-full overflow-hidden rounded-3xl">
      <img
        src="/images/HomePage/herobg.webp"
        alt=""
        class="w-full h-[420px] sm:h-[520px] md:h-[600px] object-cover"
      />
      <div class="absolute inset-0 bg-black/30 md:bg-black/20 rounded-3xl"></div>
    </div>

    <!-- Centered Hero Content -->
    <div
      class="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-0 text-center fade-in-slide"
    >
      <!-- Title -->
      <h1
        class="font-intertight font-semibold text-white
               text-[22px] sm:text-[28px] md:text-[40px] lg:text-[50px]
               leading-tight max-w-xl sm:max-w-2xl lg:max-w-4xl mx-auto"
      >
        Upto
        <span
          class="text-orange-600
                 text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px]"
        >
          {{ discountPercent }}%
        </span>
        discount by Collective Negotiation power
      </h1>

      <!-- Subtitle -->
      <div class="space-y-3 sm:space-y-4 max-w-sm sm:max-w-md mx-auto mt-4 flex flex-col items-center">
        <p class="font-outfit text-white text-xs sm:text-sm md:text-base">
          India's 1st Collective buying platform for experiential commerce
        </p>

        <button class="base-btn">Join Community</button>
      </div>

      <!-- Search Bar -->
      <div
        ref="containerRef"
        class="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl
               p-[1px] rounded-full bg-gradient-to-r from-orange-500 to-red-600
               shadow-xl relative mt-6"
      >
        <div
          class="w-full flex items-center bg-white rounded-full
                 px-2 sm:px-3 py-1.5 sm:py-2 gap-1 sm:gap-2"
        >
          <!-- City dropdown -->
          <div class="relative flex items-center">
            <button
              type="button"
              class="flex items-center gap-1.5 sm:gap-2
                     px-3 sm:px-4 py-1.5 sm:py-2
                     text-gray-700 text-xs sm:text-sm font-medium
                     outline-none hover:text-orange-600 transition-colors"
              @click.stop="cityDropdownOpen = !cityDropdownOpen"
            >
              <span class="truncate max-w-[90px] sm:max-w-[140px]">
                {{ selectedCity || "All cities" }}
              </span>
              <i
                class="pi text-[10px] sm:text-xs"
                :class="cityDropdownOpen ? 'pi-chevron-up' : 'pi-chevron-down'"
              ></i>
            </button>

            <div class="h-5 sm:h-6 w-px bg-gray-300 mx-1.5 sm:mx-2"></div>

            <ul
              v-if="cityDropdownOpen"
              class="absolute top-full left-0 mt-2 w-40 sm:w-48 max-h-64 overflow-auto
                     bg-white text-black rounded-2xl shadow-lg
                     border border-gray-200 z-30 text-xs sm:text-sm"
            >
              <li
                class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                @click.stop="onCitySelect('')"
              >
                All cities
              </li>
              <li
                v-for="city in uniqueCitiesData"
                :key="city"
                class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                @click.stop="onCitySelect(city)"
              >
                {{ city }}
              </li>
            </ul>
          </div>

          <!-- Search input -->
          <input
            v-model="searchInput"
            type="text"
            class="w-full outline-none px-1.5 sm:px-2
                   text-gray-600 placeholder-gray-400
                   text-xs sm:text-sm md:text-base"
            placeholder="Search for locations, Developers, Projects"
            autocomplete="off"
            @keyup.enter="onSearchButtonClicked"
          />

          <!-- Search button -->
          <button
            @click="onSearchButtonClicked"
            class="h-8 w-8 sm:h-10 sm:w-10 min-w-[2rem] sm:min-w-[2.5rem]
                   rounded-full bg-gradient-to-r from-orange-500 to-red-600
                   text-white flex items-center justify-center
                   shadow-lg hover:shadow-xl transition-shadow"
          >
            <i class="pi pi-search text-xs sm:text-sm"></i>
          </button>

          <!-- Suggestions dropdown -->
          <ul
            v-if="suggestionsVisible && suggestionsList.length"
            class="absolute left-0 right-0 top-full mt-2 max-h-60 overflow-auto
                   bg-white text-black rounded-2xl shadow-lg
                   border border-gray-200 z-50 text-xs sm:text-sm"
          >
            <li
              v-for="(suggestion, index) in suggestionsList"
              :key="suggestion._id || index"
              class="px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer"
              @click="onSuggestionClick(suggestion?._id)"
            >
              {{ suggestion.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* keep your existing styles unchanged */
.animation-wrapper {
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
}

.static-word {
  visibility: hidden;
}

.dynamic-word-container {
  position: relative;
  min-height: 70px;
  min-width: 300px;
  overflow: hidden;
  display: inline-block;
}

@media (min-width: 768px) {
  .dynamic-word-container {
    min-width: 180px;
    min-height: 90px;
  }
}

.dynamic-word {
  display: inline-block;
  line-height: 1;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.fade-in-slide {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease;
}

.fade-in-slide.in-view {
  opacity: 1;
  transform: translateY(0);
}
</style>
