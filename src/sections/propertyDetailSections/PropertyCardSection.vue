<script setup>
import { useRoute } from "vue-router";
import { onMounted, computed } from "vue";
import { usePropertyStore } from "@/stores/propertyStore";
import { storeToRefs } from "pinia";

const propertyStore = usePropertyStore();
const { specificPropertyDetails } = storeToRefs(propertyStore);

const route = useRoute();
const propertyId = route.params.id;

onMounted(async () => {
  await propertyStore.getPropertyById(propertyId);
});

const formatINR = (num) =>
  `₹ ${Number(num || 0).toLocaleString("en-IN")}`;

// super / carpet text
const areaText = computed(() => {
  const p = specificPropertyDetails.value;
  if (!p) return "";
  // prefer carpet if present
  if (p.carpetArea && p.totalArea) {
    return `${p.carpetArea} sq.ft. carpet • ${p.totalArea} sq.ft. super built-up`;
  }
  if (p.carpetArea) return `${p.carpetArea} sq.ft. carpet`;
  if (p.totalArea) return `${p.totalArea} sq.ft. super built-up`;
  return "";
});

// price per sq.ft text
const pricePerSqftText = computed(() => {
  const p = specificPropertyDetails.value;
  if (!p?.pricePerUnit) return "";
  return `₹ ${Number(p.pricePerUnit).toLocaleString("en-IN")} / sq.ft.`;
});

// property meta line (type, BHK, status)
const primaryMetaText = computed(() => {
  const p = specificPropertyDetails.value;
  if (!p) return "";
  const bits = [];
  if (p.propertyType) bits.push(p.propertyType);
  if (p.bhkConfiguration) bits.push(p.bhkConfiguration.toUpperCase());
  if (p.propertyStatus) bits.push(p.propertyStatus);
  return bits.join(" • ");
});

// secondary meta (floor, age, furnishing, facing)
const secondaryMetaText = computed(() => {
  const p = specificPropertyDetails.value;
  if (!p) return "";
  const bits = [];
  if (p.floorNumber && p.totalFloors) {
    bits.push(`Floor ${p.floorNumber} of ${p.totalFloors}`);
  }
  if (p.propertyAge != null) {
    bits.push(`${p.propertyAge} yrs old`);
  }
  if (p.furnishingStatus) bits.push(p.furnishingStatus);
  if (p.facingDirection) bits.push(`${p.facingDirection} facing`);
  return bits.join(" • ");
});

// offer text
const offerText = computed(() => {
  const p = specificPropertyDetails.value;
  if (!p?.offers || !p.offers.length) return "";
  // take first offer for hero
  const o = p.offers[0];
  return o.description || o.text;
});
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 xl:px-0 mt-24" v-if="specificPropertyDetails">
    <div
      class="bg-gradient-to-r from-[#EB3131] to-[#DDA439] p-6 md:p-8 rounded-[24px] flex flex-col md:flex-row gap-6 md:gap-10 items-stretch text-white"
    >
      <!-- Image -->
      <div class="md:w-1/2">
        <div
          class="bg-white/10 rounded-[18px] overflow-hidden md:max-w-[80%] h-[400px]"
        >
          <img
            :src="
              specificPropertyDetails.thumbnail ||
              specificPropertyDetails.images?.[0] ||
              specificPropertyDetails.imageUrl
            "
            :alt="specificPropertyDetails.propertyTitle || specificPropertyDetails.address"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Right content -->
      <div class="md:w-1/2 font-inter flex flex-col gap-4">
        <!-- Title + location -->
        <div>
          <h1 class="font-outfit text-[28px] md:text-[34px] leading-tight">
            {{ specificPropertyDetails.propertyTitle || 'Residential property' }}
          </h1>

          <p class="mt-1 text-[14px]">
            {{ specificPropertyDetails.address }}
          </p>

          <p class="mt-1 text-sm md:text-base">
            {{ specificPropertyDetails.landmark }}
            <span v-if="specificPropertyDetails.landmark && (specificPropertyDetails.region || specificPropertyDetails.city)"> • </span>
            <span v-if="specificPropertyDetails.region || specificPropertyDetails.city">
              {{ specificPropertyDetails.region }},
              {{ specificPropertyDetails.city }}
            </span>
            <span v-if="specificPropertyDetails.pinCode">
              • {{ specificPropertyDetails.pinCode }}
            </span>
          </p>
        </div>

        <!-- primary meta chips -->
        <div class="flex flex-wrap gap-2 mt-2">
          <span
            v-if="primaryMetaText"
            class="px-3 py-1 rounded-full border border-white/60 text-xs md:text-sm bg-white/5"
          >
            {{ primaryMetaText }}
          </span>
          <span
            v-if="secondaryMetaText"
            class="px-3 py-1 rounded-full border border-white/40 text-[11px] md:text-xs bg-white/5"
          >
            {{ secondaryMetaText }}
          </span>
          <span
            v-if="specificPropertyDetails.parkingCount"
            class="px-3 py-1 rounded-full border border-white/40 text-[11px] md:text-xs bg-white/5"
          >
            {{ specificPropertyDetails.parkingCount }} Parking
          </span>
          <span
            v-if="specificPropertyDetails.bathroomCount"
            class="px-3 py-1 rounded-full border border-white/40 text-[11px] md:text-xs bg-white/5"
          >
            {{ specificPropertyDetails.bathroomCount }} Bathrooms
          </span>
        </div>

        <!-- Area -->
        <p v-if="areaText" class="text-sm md:text-base mt-1">
          Area: {{ areaText }}
        </p>

        <!-- Prices & discount -->
        <div class="mt-4 flex flex-col gap-2 md:gap-3">
          <div class="flex justify-between text-[20px]">
            <span>Target Price</span>
            <span>Price per sq.ft</span>
          </div>

          <div class="flex justify-between items-baseline">
            <span class="text-2xl md:text-3xl font-semibold">
              {{ formatINR(specificPropertyDetails.price) }}
            </span>
            <span
              v-if="pricePerSqftText"
              class="text-lg md:text-xl opacity-90"
            >
              {{ pricePerSqftText }}
            </span>
          </div>

          <!-- offer / highlight -->
          <div
            v-if="offerText"
            class="inline-flex items-center gap-2 mt-2 pl-2 px-4 py-2 rounded-xl bg-gradient-to-r from-white via-white to-transparent text-[#1a9b32] text-xs md:text-sm font-semibold max-w-max rounded-r-none"
          >
            <i
              class="pi pi-percentage rounded-full bg-[#1a9b32] text-white flex items-center justify-center text-[8px] p-2"
            ></i>
            <span>
              {{ offerText }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
