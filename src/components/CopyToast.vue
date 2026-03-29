<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
    >
      <i class="pi pi-check-circle"></i>
      <span class="font-medium">Link copied to clipboard!</span>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
