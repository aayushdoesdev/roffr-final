<script setup>
// static section, no logic needed for now
</script>

<template>
  <section class="relative">
    <!-- Hero with image -->
    <div class="relative">
      <img
        src="/images/LoanPage/loan-hero.webp"
        alt="Loan Hero"
        class="min-h-[400px] md:max-h-[650px] w-full object-cover object-right md:object-center"
      />
    </div>

    <!-- Hero text -->
    <div
      class="absolute top-1/4 md:top-1/3 left-1/2 md:left-1/3 -translate-x-1/2 md:-translate-x-1/2 px-4 xl:px-0 text-center md:text-left"
    >
      <h1
        class="font-marcellus text-white text-[34px] sm:text-[42px] md:text-[60px] w-full xl:w-[60%]"
      >
        The Right <span class="text-orange-600">Loan</span>, Right Start
      </h1>
      <p class="font-outfit text-white mt-2 text-sm sm:text-base">
        Quick Loans. Easy EMIs. No Hassle.
      </p>
    </div>

    <!-- Stats: normal flow on mobile/tablet, absolute on lg+ -->
    <div class="mt-8 lg:mt-0">
      <div
        class="relative lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:-bottom-10 w-full max-w-5xl px-4 mx-auto"
      >
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-transparent">
          <!-- Card 1 -->
          <div
            class="bg-white rounded-3xl shadow-2xl px-6 md:px-8 py-5 md:py-6 flex flex-col items-center justify-center text-center"
          >
            <p
              class="text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-500 mb-1"
            >
              600+
            </p>
            <p class="text-xs sm:text-sm md:text-base text-gray-700 font-medium">
              Served
            </p>
          </div>

          <!-- Card 2 -->
          <div
            class="bg-white rounded-3xl shadow-2xl px-6 md:px-8 py-5 md:py-6 flex flex-col items-center justify-center text-center"
          >
            <p
              class="text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-500 mb-1"
            >
              ₹500 Cr+
            </p>
            <p class="text-xs sm:text-sm md:text-base text-gray-700 font-medium">
              Payout
            </p>
          </div>

          <!-- Card 3 -->
          <div
            class="bg-white rounded-3xl shadow-2xl px-6 md:px-8 py-5 md:py-6 flex flex-col items-center justify-center text-center"
          >
            <p
              class="text-2xl md:text-3xl lg:text-4xl font-semibold text-orange-500 mb-1"
            >
              60+
            </p>
            <p class="text-xs sm:text-sm md:text-base text-gray-700 font-medium">
              Trusted Banks
            </p>
          </div>

          <!-- Card 4 -->
          <div
            class="bg-white rounded-3xl shadow-2xl px-6 md:px-8 py-5 md:py-6 flex flex-col items-center justify-center text-center"
          >
            <p class="text-xs sm:text-sm md:text-base text-gray-700 font-medium">
              The Extra Mile,
            </p>
            <p
              class="text-sm sm:text-lg md:text-xl font-semibold text-orange-500"
            >
              Always
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
