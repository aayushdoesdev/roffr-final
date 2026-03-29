<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <footer class="bg-black text-white font-lato py-28 px-4 2xl:px-0">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row items-center justify-between gap-10">
        <div class="">
          <img src="/svg/Global/main-logo-white.svg" alt="" class="w-[170px]" />
        </div>

        <div class="flex items-center gap-6">
          <button class="pi pi-linkedin text-[30px]"></button>
          <button class="pi pi-google text-[30px]"></button>
          <button class="pi pi-facebook text-[30px]"></button>
          <button class="pi pi-instagram text-[30px]"></button>
          <button class="pi pi-twitter text-[30px]"></button>
        </div>
      </div>

      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-8 xl:gap-0 border-t border-white border-opacity-10 mt-10 py-6"
      >
        <div class="flex flex-col space-y-4">
          <p class="font-semibold">Quick Links</p>
          <router-link class="opacity-70" to="/">Home</router-link>
          <router-link class="opacity-70" to="/about">About Us</router-link>
          <router-link class="opacity-70" to="/resources">Resources</router-link>
        </div>

        <div class="flex flex-col space-y-4">
          <p class="font-semibold">Company</p>
          <router-link class="opacity-70" to="/about">About Us</router-link>
          <router-link class="opacity-70" to="/channel">Channel Partner</router-link>
          <router-link class="opacity-70" to="/loan">Loan</router-link>
          <router-link class="opacity-70" to="/resources">Resources</router-link>
        </div>

        <div class="flex flex-col space-y-4">
          <p class="font-semibold">Legal</p>
          <router-link class="opacity-70" to="/">Help Center</router-link>
          <router-link class="opacity-70" to="/corporate">Corporate</router-link>
          <router-link class="opacity-70" to="/resources">Resources</router-link>
        </div>

         <div class="space-y-4">
          <p class="font-semibold">Office Location</p>
          <p class="opacity-70">Ashok Nagar Chowk, Sarkanda, Bilaspur (C.G.)</p>
          <p class="opacity-70">ABC@gmail.com</p>
          <p class="opacity-70">+91 77355 53000</p>
        </div>
      </div>

      <div class="border-t border-white border-opacity-10 mt-10 py-6">
        <p>© 2025 Roffr. All rights reserved.</p>
      </div>

      <div class="border-t border-white border-opacity-10 py-6">
        <p>
          All property information provided is deemed reliable but not guaranteed. Interested parties are advised to verify details independently. The agency does not offer legal or financial advice and property availability or terms may change without notice.
        </p>
      </div>
    </div>
  </footer>
</template>
