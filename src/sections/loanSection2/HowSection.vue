<script setup>
const steps = [
  {
    id: 1,
    icon: "/svg/Loanpage/why1.svg",
    text: "Fill an online form to view the best offers from our partner banks."
  },
  {
    id: 2,
    icon: "/svg/Loanpage/why2.svg",
    text: "Our executive helps you choose the best offer for your requirement."
  },
  {
    id: 3,
    icon: "/svg/Loanpage/why3.svg",
    text: "We pick up documents at your doorstep and submit to the bank."
  },
  {
    id: 4,
    icon: "/svg/Loanpage/why4.svg",
    text: "Bank reviews your application and confirms approval."
  }
]
</script>

<template>
  <section class="max-w-7xl mx-auto py-10 px-4 2xl:px-0">
    <h1 class="title-text text-center">How it Works?</h1>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 mt-10 font-outfit">
      <div
        v-for="step in steps"
        :key="step.id"
        class="bg-[#FAF8F9] border p-4 rounded-xl relative text-center"
      >
        <!-- Top badge -->
        <div
          class="text-white font-semibold bg-orange-600 px-8 py-2 rounded-full w-fit
                 absolute -top-5 left-1/2 -translate-x-1/2"
        >
          {{ step.id }}
        </div>

        <!-- Icon -->
        <div class="flex justify-center mt-8">
          <img :src="step.icon" :alt="`Step ${step.id}`" />
        </div>

        <!-- Text -->
        <p class="font-semibold mt-4">
          {{ step.text }}
        </p>
      </div>
    </div>
  </section>
</template>
