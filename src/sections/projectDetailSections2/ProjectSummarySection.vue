<script setup>
import { useProjectStore } from "@/stores/projectStore";
import { storeToRefs } from "pinia";

const projectStore = useProjectStore()
const {specificProjectDetails} = storeToRefs(projectStore)
</script>

<template>
  <section class="py-10 max-w-7xl mx-auto px-4 2xl:px-0 flex flex-col gap-6">
    <!-- Project Summary -->
    <div class="">
      <div class="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <h1 class="title-text">Project Summary</h1>
        <div class="">
          <p
            class="bg-gray-200 px-4 py-1 rounded-md w-fit font-semibold text-[14px]"
          >
            {{ specificProjectDetails?.projectStatus }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div class="border rounded-xl p-6 flex justify-center gap-16">
          <div class="flex flex-col items-center">
            <p>Plot Area</p>
            <p class="font-bold text-[24px]">2 Acre</p>
          </div>
          <div class="flex flex-col items-center">
            <p>Recreation</p>
            <p class="font-bold text-[24px]">12 Amenities</p>
          </div>
        </div>
        <div class="border rounded-xl p-6 flex justify-center gap-16">
          <div class="flex flex-col items-center">
            <p>Plot Area</p>
            <p class="font-bold text-[24px]">2 Acre</p>
          </div>
          <div class="flex flex-col items-center">
            <p>Recreation</p>
            <p class="font-bold text-[24px]">12 Amenities</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Configuration Plans -->
    <div class="">
      <div class="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <h1 class="title-text">Configuration Plans</h1>
        <div class="border border-black p-1 rounded-md flex items-center gap-3 w-fit">
          <p
            class="bg-black text-white px-4 py-1 rounded-md w-fit font-semibold text-[14px]"
          >
            Unit Plan
          </p>
          <p class="px-4 py-1">Floor Plan</p>
        </div>
      </div>

      <div class="border p-4 w-full rounded-md mt-6">
        <img :src="specificProjectDetails?.floorPlan" class="w-[50%]" alt="">
      </div>
    </div>


    <!-- Amenities -->
    <div class="">
      <div class="flex items-center justify-between">
        <h1 class="title-text">Amenities</h1>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 mt-6">
        <div v-for="value in specificProjectDetails?.amenities" class="border border-black shadow-md p-4 rounded-md font-semibold text-center">{{ value }}</div>
      </div>
    </div>
  </section>
</template>
