<script setup>
import { ref, computed, watch } from "vue";
import AnimatedTitle from "@/components/AnimatedTitle.vue";

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
  <section class="max-w-7xl mx-auto py-12 px-4 2xl:px-0">
    <div class="text-center mb-10">
      <AnimatedTitle text="Smart Loans, Fast Approvals" customClass="title-text" />
      <AnimatedTitle customClass="title-text text-orange-600" text="Get pre-approved in minutes and talk to our loan experts today."/>
    </div>

    <div class="grid gap-10 md:grid-cols-3">
      <!-- CARD WRAPPER 1 -->
      <div class="relative flex flex-col items-center">
        <!-- floating icon ABOVE card -->
        <div
          class="mb-3 h-16 w-16 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-xl absolute -top-5 -right-5 z-10"
        >
          <i class="pi pi-arrow-up-right text-2xl"></i>
        </div>

        <!-- card itself -->
        <div
          class="w-full rounded-3xl overflow-hidden shadow-lg cursor-pointer"
        >
          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80"
              alt="Buy a home"
              class="w-full h-64 object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/80 to-transparent"
            ></div>
            <div
              class="absolute inset-0 flex flex-col justify-end p-6 text-white"
            >
              <h3 class="text-2xl mb-2 text-orange-400 font-marcellus">
                Buy a Home
              </h3>
              <p class="text-sm font-inter">
                Finance your dream home with a smart loan.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- CARD WRAPPER 2 -->
      <div class="relative flex flex-col items-center">
        <div
          class="mb-3 h-16 w-16 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-xl absolute -top-5 -right-5 z-10"
        >
          <i class="pi pi-arrow-up-right text-2xl"></i>
        </div>

        <div
          class="w-full rounded-3xl overflow-hidden shadow-lg cursor-pointer"
        >
          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80"
              alt="Lower your loan"
              class="w-full h-64 object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/80 to-transparent"
            ></div>
            <div
              class="absolute inset-0 flex flex-col justify-end p-6 text-white"
            >
              <h3 class="text-2xl font-marcellus mb-2 text-orange-400">
                Lower Your Loan
              </h3>
              <p class="text-sm font-inter">
                Switch to better terms and save on interest.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- CARD WRAPPER 3 -->
      <div class="relative flex flex-col items-center">
        <div
          class="mb-3 h-16 w-16 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-xl absolute -top-5 -right-5 z-10"
        >
          <i class="pi pi-arrow-up-right text-2xl"></i>
        </div>

        <div
          class="w-full rounded-3xl overflow-hidden shadow-lg cursor-pointer"
        >
          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9hbnxlbnwwfHwwfHx8MA%3D%3D"
              alt="Need funds"
              class="w-full h-64 object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/80 to-transparent"
            ></div>
            <div
              class="absolute inset-0 flex flex-col justify-end p-6 text-white"
            >
              <h3 class="text-2xl font-marcellus mb-2 text-orange-400">
                Need Funds?
              </h3>
              <p class="text-sm font-inter">
                Get a loan backed by your property.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

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
