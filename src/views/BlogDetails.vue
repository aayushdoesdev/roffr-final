<script setup>
import { onMounted } from 'vue';
import { useBlogStore } from '@/stores/blogsStore';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const blogStore = useBlogStore()

const route = useRoute();
const blogId = route.params.id;

const {specificBlogData} = storeToRefs(blogStore)

onMounted(async () => {
  await blogStore.getBlogsByid(blogId);
});
</script>

<template>
    <main class="max-w-5xl mx-auto px-4 xl:px-0 py-20">
        <div class="">
            <h1 class="title-text text-center">{{ specificBlogData.title }}</h1>
            <div class="flex items-center justify-between gap-4 mt-8">
                <div class="flex items-center gap-2 px-4">
                    <i class="pi pi-heart"></i>
                    <p>{{ specificBlogData?.likes }} Likes</p>
                </div>
                <div class="flex items-center gap-2 px-4">
                    <i class="pi pi-eye"></i>
                    <p>{{ specificBlogData?.views }} Views</p>
                </div>
            </div>
        </div>

        <div class="mt-4">
            <img :src="specificBlogData?.coverImage" alt="" class="rounded-xl">
        </div>

        <p v-html="specificBlogData?.content" class="mt-4"></p>
    </main>
</template>

