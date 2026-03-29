<script setup>
import { RouterLink } from 'vue-router';
import AnimatedTitle from "@/components/AnimatedTitle.vue";
</script>

<template>
  <section
    class="relative w-full min-h-[500px] flex items-center justify-center bg-cover bg-center mt-10"
    style="
      background-image: url('https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1400&q=80');
    "
  >
    <div class="max-w-7xl mx-auto px-4 w-full flex justify-center">
      <div
        class="bg-gradient-to-r from-[#DDA439]/30 to-[#EB3131]/30 rounded-2xl text-white text-center max-w-[70%] mx-auto flex flex-col items-center space-y-6 backdrop-blur-md bg-opacity-50 p-8"
      >
        <AnimatedTitle text="Together, We Save More" customClass="font-marcellus text-[40px]" />
        <p class="font-outfit text-[18px]">
          We’re not just offering deals—we’re building India’s largest
          collective of residential homebuyers because better homes and better
          decisions are made together.
        </p>

        <router-link to="/contact" class="base-btn w-fit flex items-center gap-2">
          <p>Explore More</p>
          <i class="pi pi-arrow-up-right"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>
