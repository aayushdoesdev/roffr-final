<script setup>
// static section, no logic needed for now
</script>

<template>
  <section class="relative">
    <!-- Hero with image -->
    <div class="relative py-10">
      <img
        src="/images/ChannelPage/partner-hero.webp"
        alt="Loan Hero"
        class="min-h-[450px] md:max-h-[650px] w-full object-cover object-center md:object-center"
      />
    </div>

    <!-- Hero text -->
    <div
      class="absolute top-1/4 md:top-1/3 right-1/2 md:right-1/3 translate-x-1/2 md:translate-x-1/2 px-4 xl:px-0 text-center md:text-right"
    >
      <h1
        class="font-marcellus text-white text-[34px] sm:text-[42px] md:text-[60px] w-full xl:w-[90%]"
      >
        Your Shortcut to Smarter Real Estate Sales
      </h1>
      <p class="font-outfit text-white mt-2 text-sm sm:text-base w-full xl:w-[90%]">
        <span class="text-orange-600">Roffr</span> helps developers sell smarter with data-backed marketing and high-intent buyers.
      </p>
    </div>

    <!-- Floating cards overlapping hero -->
    <div class="hidden xl:flex absolute left-0 -bottom-10 w-[40%]">
      <img src="/images/ChannelPage/mobile-hero.webp" alt="" />
    </div>
  </section>
</template>
