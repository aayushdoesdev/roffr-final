<script setup>
import { useProjectStore } from "@/stores/projectStore";
import { storeToRefs } from "pinia";

const projectStore = useProjectStore()
const {specificProjectDetails} = storeToRefs(projectStore)

const stats = [
  { label: "Experience", value: "36+ years" },
  { label: "Operating in", value: "Gurugram" },
  { label: "All Projects", value: "4" },
  { label: "Ready to Move", value: "0" },
  { label: "Under Const.", value: "4" },
  { label: "Newly Launched", value: "0" },
];
</script>

<template>
  <section class="py-10 max-w-7xl mx-auto px-4 2xl:px-0 flex flex-col gap-6">
    
    <!-- Title -->
    <h1 class="text-3xl font-semibold uppercase tracking-wide">
      About Developer
    </h1>

    <!-- Main Flex Layout -->
    <div class="flex flex-col md:flex-row items-stretch gap-8">
      
      <!-- LEFT (70%) -->
      <div class="w-full md:w-[70%] flex flex-col gap-6">
        
        <!-- Header -->
        <div class="flex items-center gap-4">
          <div class="w-20 h-20 rounded-full border flex items-center justify-center text-sm font-semibold">
            conscient
          </div>

          <div>
            <h2 class="text-2xl font-semibold">
              {{ specificProjectDetails?.builderName }}
            </h2>
            <p class="text-gray-500 flex items-center gap-2">
              <i class="pi pi-map-marker"></i>
              Gurugram, Haryana
            </p>
          </div>
        </div>

        <!-- Description -->
        <div>
          <h3 class="font-semibold mb-2">Description</h3>
          <p class="text-gray-700 leading-relaxed">
            {{ specificProjectDetails?.description }}
          </p>

          <span class="text-blue-600 cursor-pointer text-sm">
            Read more
          </span>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 mt-4">
          <button class="bg-black text-white px-6 py-3 rounded-lg w-1/2">
            Builder Details
          </button>
          <button class="border px-6 py-3 rounded-lg w-1/2">
            Contact Builder
          </button>
        </div>

      </div>

      <!-- RIGHT (30%) -->
      <div class="w-full md:w-[30%]">
        <div class="bg-gray-100 h-full rounded-2xl p-2 grid grid-cols-2 gap-2">
          
          <div
            v-for="(item, i) in stats"
            :key="i"
            class="bg-white rounded-xl p-4 shadow-sm"
          >
            <p class="text-gray-500 text-sm">{{ item.label }}</p>
            <p class="font-semibold text-lg">{{ item.value }}</p>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>