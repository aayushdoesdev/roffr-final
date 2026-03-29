<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from "vue";
import { useProjectStore } from "@/stores/projectStore";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { useSearchStore } from "@/stores/SearchStore";
import { debounce } from "@/utils/debounce";
import { useShare } from "@/utils/useShare";
import ShareModal from "@/components/ShareModal.vue";
import PropertyMap from "@/components/PropertyMap.vue";

const router = useRouter();

const {
  showShareModal,
  shareUrl,
  shareTitle,
  openShareModal,
  closeShareModal,
} = useShare();

const route = useRoute();

const projectStore = useProjectStore();
const {
  projectPropertyListData,
  uniqueCitiesData,
  pageNumber,
  totalpages,
  pageSize,
} = storeToRefs(projectStore);

const searchStore = useSearchStore();
const { searchSuggestionData, term } = storeToRefs(searchStore);

// UI state
const searchInput = ref("");
const suggestionsVisible = ref(false);
const containerRef = ref(null);

const selectedCity = ref("");
const cityDropdownOpen = ref(false);
const showBestDealsOnly = ref(false);
const selectedType = ref("project");

// status filter
const selectedStatuses = ref([]);

// New Filters
const filterFreeCancellation = ref(false);
const filterInstantBook = ref(false);
const priceDropdownOpen = ref(false);
const selectedPriceRange = ref(null);

const priceRanges = [
  { label: "Under ₹50L", min: 0, max: 5000000 },
  { label: "₹50L - ₹1Cr", min: 5000000, max: 10000000 },
  { label: "₹1Cr - ₹3Cr", min: 10000000, max: 30000000 },
  { label: "Above ₹3Cr", min: 30000000, max: Infinity },
];

const togglePriceRange = (range) => {
  if (selectedPriceRange.value?.label === range.label) {
    selectedPriceRange.value = null;
  } else {
    selectedPriceRange.value = range;
  }
  priceDropdownOpen.value = false;
};

const imageErrors = ref({});
const handleImageError = (key) => {
  imageErrors.value[key] = true;
};

const suggestionsList = computed(() => {
  if (Array.isArray(searchSuggestionData.value))
    return searchSuggestionData.value;
  return searchSuggestionData.value?.data || [];
});

const performSearch = async () => {
  await projectStore.getProjectPropertyList(
    "project",
    searchInput.value,
    selectedCity.value,
  );
};

onMounted(async () => {
  if (route.query.city) {
    selectedCity.value = route.query.city;
  }

  if (route.query.q || route.query.city) {
    if (route.query.q) searchInput.value = route.query.q;
    await performSearch();
  } else {
    await projectStore.getProjectPropertyList();
  }
  await projectStore.getProjectCities();
});

const formatINR = (num) => `₹ ${Number(num || 0).toLocaleString("en-IN")}`;

const redirect = (id, type = selectedType.value) => {
  if (type === "property") {
    router.push(`/property-details/${id}`);
  } else {
    router.push(`/project-details/${id}`);
  }
};

// suggestions
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

const suggestionRedirect = (suggestion) => {
  if (!suggestion || !suggestion._id) return;
  const type = (suggestion.itsTypeIs || "").toUpperCase();
  if (type === "PROJECT") {
    router.push(`/project-details/${suggestion._id}`);
  } else if (type === "PROPERTY") {
    router.push(`/property-details/${suggestion._id}`);
  } else {
    router.push(`/project-details/${suggestion._id}`);
  }
};

const onSuggestionClick = (s) => {
  router.push(`/project-details/${s}`);
  suggestionsVisible.value = false;
};

const onSearchButtonClicked = () => {
  suggestionsVisible.value = false;
  performSearch();
};

// city filter (server request)
async function fetchByCity(city) {
  await projectStore.getProjectPropertyList(
    "project",
    searchInput.value,
    city || "",
  );
}

function onCitySelect(city) {
  selectedCity.value = city;
  cityDropdownOpen.value = false;
  fetchByCity(city);
}

// close dropdowns on outside click
const handleClickOutside = (e) => {
  if (containerRef.value && !containerRef.value.contains(e.target)) {
    suggestionsVisible.value = false;
    cityDropdownOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() =>
  document.removeEventListener("click", handleClickOutside),
);

// helpers
const normalize = (str = "") => str.toString().toLowerCase().trim();

const isBestDeal = (project) => {
  if (project.bestDeal || project.negotiable) return true;
  const tags = project.tags || [];
  return tags.some((t) => {
    const txt = normalize(t.text);
    return (
      txt.includes("best deal") ||
      txt.includes("negotiable") ||
      txt.includes("offer") ||
      txt.includes("exclusive")
    );
  });
};

const matchesStatus = (project) => {
  if (!selectedStatuses.value.length) return true;
  const status = normalize(project.projectStatus || "");
  return selectedStatuses.value.some((s) => status.includes(normalize(s)));
};

// final list
const filteredProjects = computed(() => {
  const q = normalize(searchInput.value);
  let list = projectPropertyListData.value || [];

  // text search
  if (q) {
    list = list.filter((p) => {
      const name = normalize(p.projectName || p.title);
      const loc = normalize(p.location);
      const city = normalize(p.city);
      const region = normalize(p.region);
      const builder = normalize(p.builder?.name);
      const priceStr = normalize(
        `${p.priceMin || ""} ${p.priceMax || ""} ${p.price || ""}`,
      );
      const amenities = (p.amenities || [])
        .map((a) => normalize(a.text))
        .join(" ");
      const crmName = normalize(p.crmDetails?.crmName);

      return (
        name.includes(q) ||
        loc.includes(q) ||
        city.includes(q) ||
        region.includes(q) ||
        builder.includes(q) ||
        priceStr.includes(q) ||
        amenities.includes(q) ||
        crmName.includes(q)
      );
    });
  }

  // Price Filter
  if (selectedPriceRange.value) {
    list = list.filter((p) => {
      const price = p.priceMin || p.price || 0;
      return (
        price >= selectedPriceRange.value.min &&
        price <= selectedPriceRange.value.max
      );
    });
  }

  // Free Cancellation
  if (filterFreeCancellation.value) {
    list = list.filter(
      (p) =>
        p.freeCancellation ||
        (p.tags &&
          p.tags.some((t) =>
            t.text.toLowerCase().includes("free cancellation"),
          )),
    );
  }

  // Instant Book
  if (filterInstantBook.value) {
    list = list.filter(
      (p) =>
        p.instantBook ||
        (p.tags &&
          p.tags.some((t) => t.text.toLowerCase().includes("instant book"))),
    );
  }

  // best-deal / negotiable
  if (showBestDealsOnly.value) {
    list = list.filter((p) => isBestDeal(p));
  }

  // status
  list = list.filter((p) => matchesStatus(p));

  return list;
});

const locationPills = computed(() => {
  if (!projectPropertyListData.value) return [];
  const regions = projectPropertyListData.value
    .map((p) => p.region)
    .filter((r) => r && r.trim().length > 0);
  return [...new Set(regions)].slice(0, 5);
});

const selectLocation = (loc) => {
  searchInput.value = loc;
};

const fetchProjects = async () => {
  await projectStore.getProjectPropertyList(
    selectedType.value,
    "",
    selectedCity.value || "",
  );
};

watch([pageNumber, pageSize, selectedType], fetchProjects);

const canPrev = computed(() => pageNumber.value > 1);
const canNext = computed(() => pageNumber.value < totalpages.value);

const prevPage = () => {
  if (canPrev.value) pageNumber.value -= 1;
};

const nextPage = () => {
  if (canNext.value) pageNumber.value += 1;
};

// Map Sync
const mapRef = ref(null);
const onCardHover = (project) => {
  if (mapRef.value) {
    mapRef.value.flyToProject(project);
  }
};
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 2xl:px-0 mt-20 pb-10">
    <div class="flex flex-col xl:flex-row items-center justify-between">
      <h1 class="title-text">Select to explore</h1>
      <div class="flex items-center justify-center xl:justify-start gap-3 flex-wrap mt-4 xl:mt-0">
        <!-- Free Cancellation -->
        <button
          @click="filterFreeCancellation = !filterFreeCancellation"
          class="px-4 py-2 rounded-full border text-sm font-medium transition-all"
          :class="
            filterFreeCancellation
              ? 'bg-orange-50 border-orange-500 text-orange-600'
              : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
          "
        >
          Negotiable
        </button>

        <!-- Price Dropdown -->
        <div class="relative">
          <button
            @click.stop="priceDropdownOpen = !priceDropdownOpen"
            class="px-4 py-2 rounded-full border text-sm font-medium transition-all flex items-center gap-2"
            :class="
              selectedPriceRange
                ? 'bg-orange-50 border-orange-500 text-orange-600'
                : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
            "
          >
            {{ selectedPriceRange ? selectedPriceRange.label : "Price" }}
            <i class="pi pi-angle-down text-xs"></i>
          </button>

          <div
            v-if="priceDropdownOpen"
            class="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-30 overflow-hidden"
          >
            <button
              v-for="range in priceRanges"
              :key="range.label"
              @click="togglePriceRange(range)"
              class="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
              :class="
                selectedPriceRange?.label === range.label
                  ? 'text-orange-600 font-medium bg-orange-50'
                  : 'text-gray-700'
              "
            >
              {{ range.label }}
            </button>
          </div>
        </div>

        <!-- Instant Book -->
        <button
          @click="filterInstantBook = !filterInstantBook"
          class="px-4 py-2 rounded-full border text-sm font-medium transition-all"
          :class="
            filterInstantBook
              ? 'bg-orange-50 border-orange-500 text-orange-600'
              : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
          "
        >
          Best Deal
        </button>

        <!-- New Launch -->
        <button
          @click="filterInstantBook = !filterInstantBook"
          class="px-4 py-2 rounded-full border text-sm font-medium transition-all"
          :class="
            filterInstantBook
              ? 'bg-orange-50 border-orange-500 text-orange-600'
              : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
          "
        >
          New Launch
        </button>

        <!-- Under Construction -->
        <button
          @click="filterInstantBook = !filterInstantBook"
          class="px-4 py-2 rounded-full border text-sm font-medium transition-all"
          :class="
            filterInstantBook
              ? 'bg-orange-50 border-orange-500 text-orange-600'
              : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
          "
        >
          Under Construction
        </button>
      </div>
    </div>

    <div class="mt-2 bg-white z-20" ref="containerRef">
      <div class="w-full flex flex-col">
        <!-- Search Bar -->
        <div
          class="w-full p-[1px] rounded-full bg-gradient-to-r from-orange-500 to-red-600 shadow-md relative"
        >
          <div
            class="w-full flex items-center bg-white rounded-full px-2 py-2 gap-2"
          >
            <!-- City dropdown -->
            <div class="relative flex items-center shrink-0">
              <button
                type="button"
                class="flex items-center gap-2 px-3 py-1 text-gray-700 font-medium outline-none hover:text-orange-600 transition-colors text-sm"
                @click.stop="cityDropdownOpen = !cityDropdownOpen"
              >
                <span class="truncate max-w-[100px]">
                  {{ selectedCity || "All cities" }}
                </span>
                <i
                  class="pi text-[10px]"
                  :class="
                    cityDropdownOpen ? 'pi-chevron-up' : 'pi-chevron-down'
                  "
                ></i>
              </button>

              <!-- Vertical Divider -->
              <div class="h-5 w-px bg-gray-300 mx-2"></div>

              <ul
                v-if="cityDropdownOpen"
                class="absolute top-full left-0 mt-2 w-48 max-h-64 overflow-auto bg-white text-black rounded-xl shadow-lg border border-gray-200 z-30 text-sm"
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

            <!-- search input -->
            <input
              v-model="searchInput"
              type="text"
              class="w-full outline-none px-2 text-gray-600 placeholder-gray-400 text-sm"
              placeholder="Search..."
              autocomplete="off"
            />
            <button
              @click="onSearchButtonClicked"
              class="h-8 w-8 min-w-[2rem] rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white flex items-center justify-center shadow hover:shadow-md transition-shadow"
            >
              <i class="pi pi-search text-xs"></i>
            </button>

            <!-- suggestions dropdown -->
            <ul
              v-if="suggestionsVisible && suggestionsList.length"
              class="absolute left-0 right-0 top-full mt-2 max-h-60 overflow-auto bg-white text-black rounded-xl shadow-lg border border-gray-200 z-50"
            >
              <li
                v-for="(suggestion, index) in suggestionsList"
                :key="suggestion._id || index"
                class="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                @click="onSuggestionClick(suggestion?._id)"
              >
                {{ suggestion.title }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <div class="border rounded-xl">
        <div class="p-4 flex flex-col lg:flex-row gap-6">
          <!-- LEFT IMAGE -->
          <div class="w-full lg:w-[28%]">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920"
              alt="project"
              class="w-full h-[220px] md:h-[300px] object-cover rounded-xl"
            />
          </div>

          <!-- MIDDLE CONTENT -->
          <div class="w-full lg:w-[52%] flex flex-col justify-between">
            <!-- Title -->
            <div>
              <h2 class="text-xl md:text-2xl font-semibold">
                Vision Bela Vista
              </h2>
              <p class="text-gray-500 text-sm mt-1">
                Vision Developer · Marna Siolim, Siolim
              </p>

              <!-- INFO ROWS -->
              <div class="mt-5 space-y-4 text-sm">
                <div class="flex items-center gap-3">
                  <i class="pi pi-building text-gray-500"></i>
                  <span class="text-gray-600">Project Size</span>
                  <span class="ml-auto font-medium">0.64 Acre</span>
                </div>

                <div class="flex items-center gap-3">
                  <i class="pi pi-th-large text-gray-500"></i>
                  <span class="text-gray-600">Configurations</span>
                  <span class="ml-auto font-medium">1, 2 & 3 BHK</span>
                </div>

                <div class="flex items-center gap-3">
                  <i class="pi pi-home text-gray-500"></i>
                  <span class="text-gray-600">Amenities</span>
                  <span class="ml-auto font-medium text-right">
                    Swimming Pool · Clubhouse +2
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT PANEL -->
          <div
            class="w-full lg:w-[20%] bg-gray-50 rounded-xl flex flex-col justify-between p-4"
          >
            <div>
              <p class="text-gray-400 text-sm">Area Range</p>
              <h3 class="text-lg font-semibold mt-1">528 - 1610 sqft.</h3>
            </div>

            <button
              class="mt-6 text-sm underline text-gray-700 hover:text-black"
            >
              DETAILS
            </button>
          </div>
        </div>

        <div
          class="flex flex-col md:flex-row items-center justify-between gap-4 border-t px-4 py-4 bg-slate-100 rounded-b-xl"
        >
          <!-- TAGS -->
          <div class="flex flex-wrap gap-2">
            <span
              class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium"
            >
              Ready to Move
            </span>
            <span
              class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium"
            >
              Dec 2024
            </span>
            <span class="text-gray-500 text-sm flex items-center gap-1">
              RERA <i class="pi pi-info-circle"></i>
            </span>
          </div>

          <!-- ACTION BUTTONS -->
          <div class="flex gap-3">
            <button
              class="flex items-center gap-2 border px-6 py-2 rounded-lg text-sm bg-white hover:bg-gray-50"
            >
              <i class="pi pi-download"></i>
              Brochure
            </button>
            <button
              class="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg text-sm"
            >
              <i class="pi pi-phone"></i>
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
