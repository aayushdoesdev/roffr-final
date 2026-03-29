<script setup></script>

<template>
  <section class="max-w-7xl mx-auto py-10 px-4 2xl:px-0">
    <div class="bg-[#222222] px-6 py-10 sm:px-10 sm:py-14 lg:p-20 rounded-3xl">
      <h1
        class="title-text text-white text-center text-2xl sm:text-3xl lg:text-4xl leading-snug"
      >
        Why Choose us for your next<br />
        Home Purchase?
      </h1>

      <!-- 1 col on mobile, 2 on md, 3 on lg+ -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-10"
      >
        <div
          class="text-center font-outfit flex flex-col items-center space-y-3"
        >
          <img src="/svg/AboutPage/whyChoose/why1.svg" alt="" class="w-10" />
          <p class="text-orange-600 text-xl sm:text-2xl font-semibold">
            Group Buying Power
          </p>
          <p class="text-white text-sm sm:text-base">
            Big discounts born from strength in numbers available only through
            developer partnerships.
          </p>
        </div>

        <div
          class="text-center font-outfit flex flex-col items-center space-y-3"
        >
          <img src="/svg/AboutPage/whyChoose/why2.svg" alt="" class="w-10" />
          <p class="text-orange-600 text-xl sm:text-2xl font-semibold">
            Expert Negotiation Support
          </p>
          <p class="text-white text-sm sm:text-base">
            Seasoned negotiators secure the best quotes and the most attractive
            inventory.
          </p>
        </div>

        <div
          class="text-center font-outfit flex flex-col items-center space-y-3"
        >
          <img src="/svg/AboutPage/whyChoose/why3.svg" alt="" class="w-10" />
          <p class="text-orange-600 text-xl sm:text-2xl font-semibold">
            Regret-free Buying
          </p>
          <p class="text-white text-sm sm:text-base">
            No more discovering later that someone else in your project paid
            less—everyone in the group gets the same deal.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
