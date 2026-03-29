<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section
    class="max-w-7xl mx-auto pb-10 pt-36 px-4 xl:px-0 flex flex-col md:flex-row items-center justify-between"
  >
    <div class="w-full md:w-[60%]">
      <img
        src="/images/AboutPage/aboutHero/about-hero.webp"
        alt=""
        class="w-full md:w-[70%] mx-auto"
      />
    </div>
    <div class="w-full md:w-[40%]">
      <div class="w-full md:w-[70%] space-y-6">
        <div class="">
          <img
            src="/images/AboutPage/aboutHero/about-text.png"
            alt=""
            class="max-w-[350px]"
          />
        </div>
        <p class="font-inter">
          Join our Homebuyers Community and unlock savings of up to ₹50 lakhs on
          residential homes!
        </p>
        <router-link to="/contact" class="base-btn w-fit">
            <p>Join Community</p>
            <i class="pi pi-arrow-up-right"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>
