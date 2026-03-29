<script setup>
import { computed } from "vue";
import { useProjectStore } from "@/stores/projectStore";
import { storeToRefs } from "pinia";

const projectStore = useProjectStore();
const { projectPropertyListData } = storeToRefs(projectStore);

// Normalize list to always be an array
const projects = computed(() =>
  Array.isArray(projectPropertyListData.value)
    ? projectPropertyListData.value
    : []
);
</script>

<template>
  <section class="w-full bg-black text-white">
    <Vue3Marquee
      class="py-3"
      :speed="60"
      :pause-on-hover="true"
      :gradient="false"
    >
      <!-- Repeat items to create long stripe -->
      <template v-for="(project, idx) in projects" :key="idx">
        <div class="flex items-center gap-6 px-8">
          <div class="flex flex-col">
            <span class="font-outfit text-[18px]">
              {{ project.title }}
            </span>
            <span class="font-outfit text-[14px] text-orange-400">
              {{ project.projectGroupCount }} People Joined
            </span>
          </div>

          <!-- Divider like "/" in your image -->
          <span class="text-2xl text-white/70">/</span>
        </div>
      </template>
    </Vue3Marquee>
  </section>
</template>
