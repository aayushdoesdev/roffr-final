<script setup>
import { ref, computed, watch } from "vue";
import { usePropertyStore } from "@/stores/propertyStore";
import { useCustomerStore } from "@/stores/customerStore";
import { storeToRefs } from "pinia";
import { useAmenityStore } from "@/stores/amenityStore";

const propertyStore = usePropertyStore();
const { specificPropertyDetails } = storeToRefs(propertyStore);

const amenityStore = useAmenityStore();
const { amenityData } = storeToRefs(amenityStore);

const constructionUpdate = computed(() => {
  const p = specificPropertyDetails.value;
  if (!p) return null;
  return {
    dateText: "Mon, 21st July, 2025",
    tower: p.landmark || "-",
    statusText: `${p.propertyStatus || "Ready to move"}`,
  };
});

// area text for this property schema
const areaText = computed(() => {
  const p = specificPropertyDetails.value;
  if (!p) return "";
  if (p.carpetArea && p.totalArea) {
    return `${p.carpetArea} sq.ft. carpet • ${p.totalArea} sq.ft. super built-up`;
  }
  if (p.carpetArea) return `${p.carpetArea} sq.ft. carpet`;
  if (p.totalArea) return `${p.totalArea} sq.ft. super built-up`;
  return "";
});

// price helpers
const formatINR = (val) => `₹ ${Number(val || 0).toLocaleString("en-IN")}`;

const pricePerSqftText = computed(() => {
  const p = specificPropertyDetails.value;
  if (!p?.pricePerUnit) return "";
  return `₹ ${Number(p.pricePerUnit).toLocaleString("en-IN")} / sq.ft.`;
});

// primary meta: type, BHK, status, purpose
const primaryMetaText = computed(() => {
  const p = specificPropertyDetails.value;
  if (!p) return "";
  const bits = [];
  if (p.propertyType) bits.push(p.propertyType);
  if (p.bhkConfiguration) bits.push(p.bhkConfiguration.toUpperCase());
  if (p.propertyCategory) bits.push(p.propertyCategory);
  if (p.propertyStatus) bits.push(p.propertyStatus);
  if (p.propertyPurpose) bits.push(p.propertyPurpose);
  return bits.join(" • ");
});

// secondary meta: floor, age, furnishing, facing, beds/baths/parking
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
  if (p.bedCount) bits.push(`${p.bedCount} Bed`);
  if (p.bathroomCount) bits.push(`${p.bathroomCount} Bath`);
  if (p.parkingCount) bits.push(`${p.parkingCount} Parking`);
  return bits.join(" • ");
});

// offer text from offers[]
const offerText = computed(() => {
  const p = specificPropertyDetails.value;
  if (!p?.offers || !p.offers.length) return "";
  const o = p.offers[0];
  return o.description || o.text;
});

// EMI / Mortgage calculator
const propertyPrice = ref(1000000);
const downPayment = ref(100000);
const loanAmount = ref(900000);
const interestRate = ref(10);
const durationYears = ref(3);

const emi = computed(() => {
  const principal = loanAmount.value;
  const r = interestRate.value / (12 * 100);
  const n = durationYears.value * 12;
  if (!principal || !r || !n) return 0;
  const v = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(v);
});

const totalPayment = computed(() => emi.value * durationYears.value * 12);
const totalInterest = computed(() => totalPayment.value - loanAmount.value);

const amenityMap = computed(() => {
  const list = Array.isArray(amenityData.value) ? amenityData.value : [];
  const map = {};
  list.forEach((a) => {
    map[a.value] = a; // id -> { value, label }
  });
  return map;
});


const resolvedAmenities = computed(() => {
  const p = specificPropertyDetails.value;
  if (!p || !Array.isArray(p.amenities)) return [];

  return p.amenities
    .map((id) => amenityMap.value[id]) // find object by id
    .filter(Boolean); // remove unknown ids
});

</script>

<template>
  <section
    v-if="specificPropertyDetails"
    class="py-10 mx-auto max-w-7xl px-4 xl:px-0"
  >
    <div class="flex flex-col xl:flex-row items-start gap-6">
      <div class="w-full md:w-[70%] space-y-10">
        <!-- Description -->
        <div class="font-inter">
          <p class="font-semibold text-[20px]">Description</p>
          <p
            v-if="specificPropertyDetails.propertyDescription"
            class="mt-2 opacity-70 text-sm leading-relaxed"
          >
            {{ specificPropertyDetails.propertyDescription }}
          </p>
        </div>

        <!-- Key details row (type, meta, area, price) -->
        <div class="font-inter space-y-2">
          <p v-if="primaryMetaText" class="text-sm font-semibold">
            {{ primaryMetaText }}
          </p>
          <p v-if="secondaryMetaText" class="text-xs text-gray-600">
            {{ secondaryMetaText }}
          </p>
          <p v-if="areaText" class="text-sm text-gray-700">
            Area: {{ areaText }}
          </p>
          <p class="text-sm text-gray-700 mt-1">
            Listing ID: {{ specificPropertyDetails.listingId }}
          </p>
          <p
            v-if="specificPropertyDetails.price"
            class="text-sm text-gray-900 mt-1"
          >
            Asking Price:
            <span class="font-semibold">
              {{ formatINR(specificPropertyDetails.price) }}
            </span>
            <span v-if="pricePerSqftText" class="ml-2 text-xs text-gray-600">
              ({{ pricePerSqftText }})
            </span>
          </p>
        </div>

        <!-- Amenities (IDs here – if you later expand, map to names/icons) -->
        <div
          class="font-inter"
          v-if="specificPropertyDetails.amenities?.length"
        >
          <p class="font-semibold text-[20px] mb-4">Amenities</p>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-sm"
          >
            <div
              v-for="amenity in resolvedAmenities"
              :key="amenity.value"
              class="flex items-center gap-2"
            >
              <!-- if later you add icons per amenity, bind here -->
              <!-- <img :src="amenity.iconLocation" :alt="amenity.label" class="h-6 w-6 object-contain" /> -->
              <span class="text-gray-800">
                {{ amenity.label }}
              </span>
            </div>
          </div>
        </div>

        <!-- Facilities if present (already using iconImage/name) -->
        <div
          v-if="specificPropertyDetails.facilities?.length"
          class="font-inter"
        >
          <p class="font-semibold text-[18px] mb-3">
            Location &amp; Public Facilities
          </p>
          <div class="flex flex-wrap gap-2 mb-3">
            <span
              v-for="item in specificPropertyDetails.facilities"
              :key="item._id"
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF7F1] text-xs font-medium text-gray-700 border border-[#ffd4b4]"
            >
              <img :src="item?.iconImage" alt="" class="w-5 h-5" />
              {{ item?.name }}
            </span>
          </div>
        </div>

        <!-- Master / Floor plan (if using from property) -->
        <div v-if="specificPropertyDetails.masterPlan" class="">
          <p class="font-semibold text-[18px] font-inter">Master Plan</p>
          <div class="mt-2">
            <img :src="specificPropertyDetails.masterPlan" alt="" />
          </div>
        </div>

        <div v-if="specificPropertyDetails.floorPlan" class="">
          <p class="font-semibold text-[18px] font-inter">Floor Plan</p>
          <div class="mt-2">
            <img :src="specificPropertyDetails.floorPlan" alt="" />
          </div>
        </div>

        <!-- Property video -->
        <div v-if="specificPropertyDetails.videoLink" class="space-y-3">
          <p class="font-semibold text-[18px] font-inter">Property Video</p>
          <div class="rounded-2xl overflow-hidden shadow-md">
            <iframe
              :src="specificPropertyDetails.videoLink"
              title="Property video"
              class="w-full h-64 md:h-80"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <!-- Map -->
        <div class="space-y-3">
          <p class="font-semibold text-[18px] font-inter">Location &amp; Map</p>
          <p class="text-sm text-gray-700">
            {{ specificPropertyDetails.address }},
            {{ specificPropertyDetails.city }},
            {{ specificPropertyDetails.state }}
            <span v-if="specificPropertyDetails.pinCode">
              - {{ specificPropertyDetails.pinCode }}
            </span>
          </p>
          <div class="rounded-2xl overflow-hidden shadow-md">
            <iframe
              v-if="
                specificPropertyDetails.latitude &&
                specificPropertyDetails.longitude
              "
              :src="`https://www.google.com/maps?q=${specificPropertyDetails.latitude},${specificPropertyDetails.longitude}&hl=en&z=15&output=embed`"
              class="w-full h-72"
              style="border: 0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <!-- RIGHT: Contact + quick info -->
      <div class="w-full xl:w-[30%] xl:sticky top-20 space-y-4">
        <!-- Contact Expert -->
        <div class="font-inter border rounded-xl shadow-xl p-4">
          <p class="font-semibold text-[18px]">Contact Expert</p>

          <div class="flex items-start gap-2 blur-sm mt-6">
            <div>
              <img
                src="https://plus.unsplash.com/premium_photo-1661510749856-47c47ea10fc7?w=600&auto=format&fit=crop&q=60"
                class="w-[50px] h-[50px] rounded-full object-cover"
                alt=""
              />
            </div>
            <div>
              <p class="font-semibold text-[20px]">Dealzo Advisor</p>
              <p>dealzoadvisor@gmail.com</p>
            </div>
          </div>

          <div class="base-btn flex justify-center mt-6">Contact Expert</div>
        </div>

        <!-- Quick property facts -->
        <div class="font-inter border rounded-xl shadow p-4 text-sm space-y-2">
          <p class="font-semibold text-[16px] mb-1">Property Facts</p>
          <div class="flex justify-between">
            <span>Property Type</span>
            <span>{{ specificPropertyDetails.propertyType }}</span>
          </div>
          <div class="flex justify-between">
            <span>Category</span>
            <span>{{ specificPropertyDetails.propertyCategory }}</span>
          </div>
          <div class="flex justify-between">
            <span>Purpose</span>
            <span>{{ specificPropertyDetails.propertyPurpose }}</span>
          </div>
          <div class="flex justify-between">
            <span>Age</span>
            <span>{{ specificPropertyDetails.propertyAge }} years</span>
          </div>
          <div class="flex justify-between">
            <span>Furnishing</span>
            <span>{{ specificPropertyDetails.furnishingStatus }}</span>
          </div>
          <div class="flex justify-between">
            <span>Facing</span>
            <span>{{ specificPropertyDetails.facingDirection }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Construction Updates -->
    <div v-if="constructionUpdate" class="space-y-3 mt-10">
      <p class="font-semibold text-[18px] font-inter">Construction Updates</p>

      <div
        class="flex flex-col md:flex-row gap-6 items-stretch border-b border-gray-200 pb-6"
      >
        <!-- LEFT -->
        <div class="w-full md:w-[60%]">
          <div
            class="mt-2 h-full rounded-2xl overflow-hidden text-white p-6 flex flex-col justify-center bg-cover bg-center bg-no-repeat"
            style="
              background-image: linear-gradient(
                  to right,
                  rgba(0, 0, 0, 0.7),
                  rgba(0, 0, 0, 0.2)
                ),
                url('https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80');
            "
          >
            <p class="text-lg font-semibold">
              {{ specificPropertyDetails.propertyTitle }}
            </p>
            <p class="mt-1">
              {{ constructionUpdate.tower }}
            </p>
            <p class="mt-1">
              {{ constructionUpdate.statusText }}
            </p>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="w-full md:w-[40%]">
          <div
            class="mt-2 h-full rounded-2xl overflow-hidden flex items-center justify-center bg-white"
          >
            <img
              src="/svg/ProjectDetail/project-detail-img.svg"
              alt="Construction illustration"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- EMI / Mortgage Calculator -->
    <div class="space-y-4 font-inter mt-10">
      <p class="font-semibold text-[18px]">Calculate Your Mortgage</p>

      <div class="flex flex-col lg:flex-row gap-6 items-start border-t pt-4">
        <!-- Left: inputs -->
        <div class="flex-1 w-full space-y-3">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="space-y-1">
              <p class="text-xs text-gray-500">Property Price</p>
              <div
                class="rounded-full bg-gray-50 border px-4 py-2 flex items-center gap-2 text-sm"
              >
                <span>₹</span>
                <input
                  v-model.number="propertyPrice"
                  type="number"
                  class="bg-transparent outline-none flex-1"
                />
              </div>
            </div>

            <div class="space-y-1">
              <p class="text-xs text-gray-500">Down Payment</p>
              <div
                class="rounded-full bg-gray-50 border px-4 py-2 flex items-center gap-2 text-sm"
              >
                <span>₹</span>
                <input
                  v-model.number="downPayment"
                  type="number"
                  class="bg-transparent outline-none flex-1"
                />
              </div>
            </div>

            <div class="space-y-1">
              <p class="text-xs text-gray-500">Loan Amount</p>
              <div
                class="rounded-full bg-gray-50 border px-4 py-2 flex items-center gap-2 text-sm"
              >
                <span>₹</span>
                <input
                  v-model.number="loanAmount"
                  type="number"
                  class="bg-transparent outline-none flex-1"
                />
              </div>
            </div>

            <div class="space-y-1">
              <p class="text-xs text-gray-500">Interest Rate</p>
              <div
                class="rounded-full bg-gray-50 border px-4 py-2 flex items-center gap-2 text-sm"
              >
                <input
                  v-model.number="interestRate"
                  type="number"
                  class="bg-transparent outline-none flex-1"
                />
                <span>%</span>
              </div>
            </div>
          </div>

          <div class="space-y-1 mt-2">
            <div class="flex justify-between text-xs text-gray-500">
              <span>Loan Duration</span>
              <span>{{ durationYears }} Years</span>
            </div>
            <input
              v-model.number="durationYears"
              type="range"
              min="1"
              max="30"
              step="1"
              class="w-full accent-orange-500"
            />
          </div>
        </div>

        <!-- Right: summary -->
        <div
          class="w-full lg:w-80 rounded-2xl border bg-white shadow-sm overflow-hidden text-sm"
        >
          <div class="px-4 py-3 border-b bg-gray-50 flex justify-between">
            <span class="font-semibold">Details</span>
            <span class="font-semibold">Amount</span>
          </div>
          <div class="px-4 py-3 space-y-2">
            <div class="flex justify-between">
              <span>Monthly EMI</span>
              <span>{{ formatINR(emi) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Interest Rate (Annual)</span>
              <span>{{ interestRate }}%</span>
            </div>
            <div class="flex justify-between">
              <span>Total Interest</span>
              <span>{{ formatINR(totalInterest) }}</span>
            </div>
            <div class="flex justify-between font-semibold border-t pt-2 mt-1">
              <span>Total Payment</span>
              <span>{{ formatINR(totalPayment) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
