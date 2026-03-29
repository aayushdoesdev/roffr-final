<script setup>
import { ref, computed } from "vue";

// sliders
const cost = ref(110); // in Lakhs
const buyers = ref(4); // number of buyers

// simple total savings: how much less each buyer pays in principal
// const totalSavings = computed(() => {
//   const singleCost = cost.value * 100000;          // full price in ₹
//   const groupCostPerBuyer = singleCost / buyers.value;
//   return singleCost - groupCostPerBuyer;           // saving vs buying alone
// });

// helpers
const interestRate = 9;
const tenureYears = 20;

const calculateEMI = (principal, ratePerMonth, tenureMonths) => {
  const emi =
    (principal * ratePerMonth * Math.pow(1 + ratePerMonth, tenureMonths)) /
    (Math.pow(1 + ratePerMonth, tenureMonths) - 1);
  return emi;
};

const singleEMI = computed(() => {
  const principal = cost.value * 100000;
  const r = interestRate / (12 * 100);
  const n = tenureYears * 12;
  return calculateEMI(principal, r, n);
});

const groupEMI = computed(() => {
  const principalPerBuyer = (cost.value * 100000) / buyers.value;
  const r = interestRate / (12 * 100);
  const n = tenureYears * 12;
  return calculateEMI(principalPerBuyer, r, n);
});

// formatters
const formatCrore = (amountInLakh) => {
  const crore = amountInLakh / 100;
  return `₹ ${crore.toFixed(2)} Cr`;
};

const formatRupee = (val) => `₹ ${val.toLocaleString("en-IN")}`;

// simple saving = fixed % of cost (in Lakhs)
const SAVING_PERCENT = 7; // tweak until it visually matches

const totalSavings = computed(() => {
  return (cost.value * SAVING_PERCENT) / 100 * 100000; // in ₹
});

// show as "₹ 8.70 L"
const formatLakh = (val) => {
  const inLakh = val / 100000;
  return `₹ ${inLakh.toFixed(2)} L`;
};
</script>

<template>
  <section class="py-10 px-4 2xl:px-0 max-w-7xl mx-auto">
    <div
      class="relative rounded-3xl bg-[#FF4639] overflow-hidden"
    >
      <div
        class="relative flex flex-col md:flex-row items-center p-4 md:p-10 gap-10"
      >
        <div class="w-full md:w-1/2 flex flex-col items-start">
          <div class="w-[100%]">
            <img
              src="/svg/calculateSection/saving-img.svg"
              alt="Apartments"
              class=""
            />
          </div>
        </div>

        <div class="w-full md:w-1/2 flex flex-col justify-end">
          <div class="bg-white p-4 rounded-3xl shadow-xl mt-6 xl:mt-0">
            <h1 class="font-intertight text-[25px] md:text-[35px] font-semibold text-center">
              Calculate how much can you save?
            </h1>

            <!-- 1: Cost slider -->
            <div class="my-6">
              <div class="flex items-center justify-between mb-2">
                <p class="text-sm font-medium text-gray-700">
                  Cost of Single Apartment
                </p>
                <span
                  class="px-3 py-1 rounded-full bg-orange-100 text-xs font-semibold text-orange-600"
                >
                  {{ formatCrore(cost) }}
                </span>
              </div>

              <input
                v-model="cost"
                type="range"
                min="50"
                max="300"
                step="1"
                class="w-full accent-red-500"
              />
            </div>

            <!-- 2: Buyers slider -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-2">
                <p class="text-sm font-medium text-gray-700">
                  No of Buyers / Apartments
                </p>
                <span
                  class="w-10 h-8 flex items-center justify-center rounded-full bg-orange-100 text-xs font-semibold text-red-600"
                >
                  {{ buyers }}
                </span>
              </div>

              <input
                v-model="buyers"
                type="range"
                min="1"
                max="20"
                step="1"
                class="w-full accent-red-500"
              />
            </div>

            <!-- Result: same design, simple saving logic -->
            <div class="text-center space-y-4">
              <div class="bg-[#FF4639] py-3 rounded-2xl">
                <p class="font-inter text-white mb-2">
                  Save Upto
                </p>
                <div
                  class="font-intertight font-semibold text-white text-[30px] inline-flex items-center justify-center"
                >
                  {{ formatLakh(totalSavings) }}
                </div>
              </div>

              <!-- <div
                class="flex justify-between items-center font-inter"
              >
                <div class="flex flex-col">
                  <p>Per Buyer EMI:</p>
                  <p class="text-[20px] font-semibold">
                    {{ formatRupee(groupEMI) }}
                  </p>
                </div>
                <div class="flex flex-col">
                  <p>Single Buyer EMI:</p>
                  <p class="text-[20px] font-semibold">
                    {{ formatRupee(singleEMI) }}
                  </p>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
