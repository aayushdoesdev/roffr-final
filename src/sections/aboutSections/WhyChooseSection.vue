<script setup>
import AnimatedTitle from "@/components/AnimatedTitle.vue";

const reasons = [
  {
    icon: '/svg/AboutPage/whyChoose/choose1.svg',
    title: 'Group Buying Power',
    text:
      'Big discounts born from strength in numbers available only through developer partnerships.',
  },
  {
    icon: '/svg/AboutPage/whyChoose/choose2.svg',
    title: 'Expert Negotiation Support',
    text:
      'Seasoned negotiators secure the best quotes and the most attractive inventory.',
  },
  {
    icon: '/svg/AboutPage/whyChoose/choose3.svg',
    title: 'Regret-free Buying',
    text:
      'No more discovering later that someone else in your project paid less—everyone in the group gets the same deal.',
  },
]
</script>

<template>
  <section class="max-w-7xl mx-auto py-10 px-4 2xl:px-0">
    <AnimatedTitle
      text="Why Choose us for your next Home Purchase?"
      customClass="font-marcellus text-[50px] text-center"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4 xl:gap-32 mt-16">
      <div
        v-for="item in reasons"
        :key="item.title"
        class="bg-[#F8F1D7] p-10 pt-0 rounded-tr-[80px] rounded-bl-[80px] space-y-10 shadow-xl"
      >
        <div class="flex justify-center items-center">
          <div
            class="bg-gradient-to-b from-[#DDA439] to-[#EB3131] p-3 h-[150px] rounded-bl-3xl flex items-center"
          >
            <img :src="item.icon" alt="" class="w-[40px]" />
          </div>
        </div>

        <div class="text-center space-y-8">
          <p class="font-marcellus text-[28px] leading-snug">
            {{ item.title }}
          </p>
          <p class="font-inter text-sm leading-relaxed">
            {{ item.text }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
