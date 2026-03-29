<script setup>
import AnimatedTitle from "@/components/AnimatedTitle.vue";

const steps = [
  {
    title: "Shortlist Your Dream Project",
    text: "Explore new and under‑construction residential projects via our map search, quick videos, and live virtual tours.",
  },
  {
    title: "Express Interest",
    text: "Plan a physical site visit with support from your dedicated Relationship Manager, armed with data and guidance.",
  },
  {
    title: "Join a Buyer Group",
    text: "Select your preferred home and join others in the group to strengthen bargaining power.",
  },
  {
    title: "Unlock Developer Discounts",
    text: "Gain access to exclusive pre‑launch and bulk‑buy offers directly negotiated with developers.",
  },
  {
    title: "Finalize Purchase",
    text: "Complete your deal confidently with zero brokerage and maximum savings.",
  },
  {
    title: "Maximize Savings",
    text: "Pay no broker fees and walk away with a great deal, and save up to 75 lakhs.",
  },
];
</script>

<template>
  <section class="max-w-7xl mx-auto py-10 px-4 2xl:px-0">
    <AnimatedTitle
      text="Stress free Steps for Your Dream Home"
      customClass="font-marcellus text-[30px] sm:text-[40px] lg:text-[50px] text-center leading-snug"
    />

    <div class="mt-8 lg:mt-12 space-y-6 lg:space-y-8">
      <div v-for="(step, index) in steps" :key="step.title" class="relative">
        <div
          class="bg-gradient-to-r from-[#DDA439] to-[#EB3131] w-full rounded-[32px] sm:rounded-[50px] lg:rounded-[70px] flex flex-col md:flex-row items-stretch gap-4 md:gap-10 p-4 md:p-0"
        >
          <!-- number block -->
          <div
            class="flex items-center justify-center md:px-10 text-white"
            :class="index % 2 === 0 ? 'md:order-2 md:text-right' : 'md:order-1 md:text-left'"
          >
            <p
              class="font-inter font-semibold text-[40px] sm:text-[56px] lg:text-[70px]"
            >
              {{ String(index + 1).padStart(2, "0") }}
            </p>
          </div>

          <!-- content bubble -->
          <div
            class="bg-white rounded-[24px] sm:rounded-[40px] lg:rounded-[70px] border px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-8 flex-1"
            :class="index % 2 === 0 ? 'md:order-1' : 'md:order-2'"
          >
            <h3
              class="font-marcellus text-[18px] sm:text-[20px] lg:text-[24px] mb-1"
            >
              {{ step.title }}
            </h3>
            <p class="font-inter text-xs sm:text-sm text-gray-600">
              {{ step.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
