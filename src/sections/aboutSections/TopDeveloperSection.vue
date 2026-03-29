<script setup>
import AnimatedTitle from "@/components/AnimatedTitle.vue";

const dev = [
    "/svg/AboutPage/topDeveloper/dev1.svg",
    "/svg/AboutPage/topDeveloper/dev2.svg",
    "/svg/AboutPage/topDeveloper/dev3.svg",
    "/svg/AboutPage/topDeveloper/dev4.svg",
    "/svg/AboutPage/topDeveloper/dev5.svg",
    "/svg/AboutPage/topDeveloper/dev6.svg",
]
</script>

<template>
  <section class=" font-lato py-10 px-4 xl:px-0">
    <div class="text-center">
      <AnimatedTitle text="Top Developers Trust Us" customClass="title-text" />
    </div>

    <Vue3Marquee :clone="true">
      <div class="mt-10 flex">
        <div
          v-for="item in dev"
          class="max-w-[800px] mr-16"
        >
          <div class="flex items-start gap-2">
            <div class=" rounded-full">
              <img :src="item" alt="" class="object-cover">
            </div>
          </div>
        </div>
      </div>
    </Vue3Marquee>
  </section>
</template>
