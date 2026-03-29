<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useProjectStore } from "@/stores/projectStore";
import { storeToRefs } from "pinia";
import GroupBuyCard from "@/components/GroupBuyCard.vue";
import { useAuthStore } from "@/stores/authStore";
import { usePlanStore } from "@/stores/planStore";

const projectStore = useProjectStore();
const { specificPropertyDetails, isModalOpen } = storeToRefs(projectStore);

const planStore = usePlanStore();
const { planData } = storeToRefs(planStore);

const authStore = useAuthStore();
const { currentUserData } = storeToRefs(authStore);

// group buy basic numbers
const targetCount = 5;
const joinedCount = computed(
  () => specificPropertyDetails.value?.projectGroup?.length || 0
);

onMounted(async () => {
  const customerId = localStorage.getItem("customerId");
  await authStore.getCurrentUserData(customerId);
});

// fetch customer data when projectGroup changes
watch(
  () => specificPropertyDetails.value?._id,
  (newId) => {
    if (!newId) return;
    // no need to fetch customers now
  },
  { immediate: true }
);

// members array for GroupBuyCard
const members = computed(() => {
  const group = specificPropertyDetails.value?.projectGroup || [];
  return group
    .map((item) => item.customer)
    .filter(Boolean)
    .map((c) => ({
      name: c.name?.trim() || "Guest",
      location: c.city || "",
      userImage: c.userImage || "", // fallback if needed
    }));
});

const groupBuyingPlanId = computed(() => {
  const plans = planData?.value || [];
  const plan = plans.find((p) => p.planType === "group_buying");
  return plan?._id || null;
});

const imageErrors = ref({});
const handleImageError = (key) => {
  imageErrors.value[key] = true;
};

function handleGroupBuyClick() {
  const el = document.getElementById("contact-expert");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

// ---- rest of your existing code (constructionUpdate, EMI, etc.) ----
const constructionUpdate = computed(() => {
  const p = specificPropertyDetails.value;
  if (!p) return null;
  return {
    dateText: "Mon, 21st July, 2025",
    tower: `${p.landmark || "-"}`,
    statusText: `${p.projectStatus} • Possession ${p.readyToPossessDate}`,
  };
});

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

const formatINR = (val) => `₹ ${Number(val || 0).toLocaleString("en-IN")}`;
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
            v-html="specificPropertyDetails.description"
            class="mt-2 opacity-70 text-sm leading-relaxed"
          ></p>
        </div>
        <GroupBuyCard
          :people-joined="joinedCount"
          :required-people="targetCount"
          :members="members"
          :projectId="specificPropertyDetails?._id"
          :customerId="currentUserData?._id"
          :planId="groupBuyingPlanId"
          @join="handleGroupBuyClick"
        />

        <div class="p-4 rounded-2xl bg-slate-50">
          <p class="font-semibold text-[20px] mb-4">
            Why consider buying this property?
          </p>

          <div
            class="flex items-center gap-1 flex-wrap"
            v-for="item in specificPropertyDetails?.whyConsiderBuying"
          >
            <i class="pi pi-arrow-circle-right"></i>
            <p class="font-inter">{{ item }}</p>
          </div>
        </div>

        <!-- Amenities grid like screenshot -->
        <div class="font-inter">
          <p class="font-semibold text-[20px] mb-4">Amenities</p>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-sm"
          >
            <div
              v-for="amenity in specificPropertyDetails?.amenities"
              :key="amenity._id"
              class="flex items-center gap-2"
            >
              <img
                v-if="!imageErrors[amenity._id]"
                :src="amenity.iconImage"
                :alt="amenity.name"
                class="h-6 w-6 object-contain"
                @error="handleImageError(amenity._id)"
              />
              <i v-else class="pi pi-check-circle text-lg text-orange-500"></i>
              <span class="text-gray-800">
                {{ amenity.name }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="specificPropertyDetails?.masterPlan" class="">
          <p class="font-semibold text-[18px] font-inter">Master Plan</p>
          <div class="mt-2">
            <img :src="specificPropertyDetails?.masterPlan" alt="" />
          </div>
        </div>

        <div v-if="specificPropertyDetails?.floorPlan" class="">
          <p class="font-semibold text-[18px] font-inter">Floor Plan</p>
          <div class="mt-2">
            <img :src="specificPropertyDetails?.floorPlan" alt="" />
          </div>
        </div>

        <!-- Property video (if any) -->
        <div v-if="specificPropertyDetails?.videoLink" class="space-y-3">
          <p class="font-semibold text-[18px] font-inter">Property Video</p>
          <div class="rounded-2xl overflow-hidden shadow-md">
            <iframe
              :src="specificPropertyDetails?.videoLink"
              title="Property video"
              class="w-full h-64 md:h-80"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <!-- Location & Public Facilities -->
        <div class="space-y-3">
          <p class="font-semibold text-[18px] font-inter">
            Location &amp; Public Facilities
          </p>

          <!-- nearby pills -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="item in specificPropertyDetails?.facilities"
              :key="item._id"
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF7F1] text-xs font-medium text-gray-700 border border-[#ffd4b4]"
            >
              <img :src="item?.iconImage" alt="" class="w-5 h-5" />
              {{ item?.name }}
            </span>
          </div>

          <!-- simple map placeholder using lat/lng -->
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

      <!-- RIGHT 30%: group buy card -->
      <div
        class="w-full xl:w-[30%] xl:sticky top-20 space-y-4 flex flex-col gap-2"
        id="contact-expert"
      >
        <div class="font-inter border rounded-xl shadow-xl p-4">
          <p class="font-semibold text-[18px]">Contact Roffr Expert</p>

          <div class="flex items-start gap-2 mt-6">
            <div class="">
              <img
                src="https://img.freepik.com/free-photo/consulting-service_1098-18149.jpg"
                class="w-[50px] h-[50px] rounded-full object-cover object-right"
                alt=""
              />
            </div>

            <div class="">
              <p class="font-semibold text-[20px]">Roffr Advisor</p>
              <p class="text-[14px]">roffradvisor@gmail.com</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <div class="base-btn flex justify-center mt-6 w-full">
              Contact Expert
            </div>
            <button
              class="flex justify-center mt-6 pi pi-whatsapp text-[25px] text-white p-3 bg-green-600 rounded-full"
            ></button>
          </div>
        </div>

        <div class="font-inter border rounded-xl shadow-xl p-4">
          <div class="flex items-center justify-between gap-6">
            <p class="font-semibold text-[18px]">
              Our team is here to help you with any questions.
            </p>

            <div class="flex items-center gap-3">
              <div class="relative">
                <div class="h-2 w-2 bg-red-500 rounded-full"></div>
                <div
                  class="absolute -inset-1 animate-ping bg-red-500 rounded-full opacity-75"
                ></div>
              </div>
              <h1 class="text-[16px] text-red-500">Live</h1>
            </div>
          </div>
          <a
            href="https://calendly.com/bramhastraai/30min?back=1"
            target="_blank"
            class="border border-orange-600 py-2 rounded-full shadow-md flex items-center justify-center w-full gap-2 mt-6"
          >
            <i class="pi pi-video"></i>
            <p>TAKE A TOUR LIVE</p>
          </a>
        </div>
      </div>
    </div>

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
              {{ specificPropertyDetails.projectName }}
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

        <!-- Right: summary table -->
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
