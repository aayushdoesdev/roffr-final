<script setup>
import AnimatedTitle from "@/components/AnimatedTitle.vue";

const points = [
  {
    icon: "/svg/investmentSection/i1.svg",
    title: "Power of Collective Capital",
    text: "When a group pools investment, it unlocks large, strategically located parcels that individuals alone cannot access—delivering branded, developed real estate at unmatched prices.",
  },
  {
    icon: "/svg/investmentSection/i2.svg",
    title: "Bigger Scale, Better Returns",
    text: "Bulk acquisition means lower per-unit cost, higher appreciation potential, and stronger long-term value. Every member benefits from economies of scale that directly enhance ROI.",
  },
  {
    icon: "/svg/investmentSection/i3.svg",
    title: "Legally Assured, Fully Transparent",
    text: "Each project comes with complete legal clarity, government approvals, and structured documentation—ensuring every investor's stake is protected, compliant, and future-ready.",
  },
  {
    icon: "/svg/investmentSection/i4.svg",
    title: "Ready-to-Use Infrastructure",
    text: "Roads, utilities, markings, and amenities are pre-developed so every plot becomes immediately usable—whether for building, renting, or holding for appreciation.",
  },
  {
    icon: "/svg/investmentSection/i5.svg",
    title: "Community-Driven Legacy",
    text: "Group buying builds more than assets; it builds a community of ambitious investors who share a vision—creating a stronger, more resilient future for generations.",
  },
];

import { onMounted, onBeforeUnmount } from "vue";
import gsap from "gsap";

onMounted(() => {
  gsap.to(".float-icon", {
    y: -10, // up 10px
    duration: 1.5,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1, // loop forever
  });
});

onBeforeUnmount(() => {
  gsap.killTweensOf(".float-icon");
});
</script>

<template>
  <section class="bg-[#1E1E1E]">
    <div class="max-w-7xl mx-auto py-16 xl:py-32 px-4 2xl:px-0">
      <div class="">
        <AnimatedTitle
          text="Why Community investment"
          customClass="font-intertight text-center text-[40px] text-white"
        />
        <AnimatedTitle
          text="real estate new legacy"
          customClass="font-intertight text-center text-[40px] text-white"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-5 gap-8 mt-16">
        <div
          v-for="item in points"
          :key="item.title"
          class="font-outfit text-white space-y-3"
        >
          <img :src="item.icon" alt="" class="mb-2 float-icon" />
          <p class="text-[20px] md:text-[22px] font-semibold leading-snug">
            {{ item.title }}
          </p>
          <p class="text-sm text-gray-300 leading-relaxed">
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
