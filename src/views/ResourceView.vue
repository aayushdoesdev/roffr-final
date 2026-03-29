<script setup>
import { computed, watch, onMounted } from "vue";
import { useBlogStore } from "@/stores/blogsStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const blogStore = useBlogStore();
const { blogData, pageNumber, totalpages, pageSize } = storeToRefs(blogStore);
const router = useRouter();

const fetchBlogs = async () => {
  await blogStore.getBlogData();
};

onMounted(fetchBlogs);

// refetch when page or page size changes
watch([pageNumber, pageSize], fetchBlogs);

const redirect = (id) => {
  router.push(`/blog-details/${id}`);
};

const canPrev = computed(() => pageNumber.value > 1);
const canNext = computed(() => pageNumber.value < totalpages.value);

const prevPage = () => {
  if (canPrev.value) pageNumber.value -= 1;
};

const nextPage = () => {
  if (canNext.value) pageNumber.value += 1;
};
</script>

<template>
  <main class="py-20 max-w-7xl mx-auto px-4 2xl:px-0">
    <div class="text-center mb-10">
      <h1 class="title-text">Blogs</h1>
      <p class="font-outfit">
        Stay updated with the latest real estate insights and trends
      </p>
    </div>

    <div class="grid gap-5 md:grid-cols-2">
      <article
        v-for="blog in blogData"
        :key="blog._id"
        class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex cursor-pointer hover:shadow-md transition-shadow"
        @click="redirect(blog._id)"
      >
        <div class="w-32 sm:w-40 md:w-44 h-28 sm:h-32 md:h-36 flex-shrink-0">
          <img
            :src="blog.coverImage"
            :alt="blog.title"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="flex-1 p-3 sm:p-4 flex flex-col justify-between">
          <div>
            <h2
              class="font-outfit font-semibold text-sm sm:text-base md:text-lg line-clamp-2"
            >
              {{ blog.title }}
            </h2>
            <p class="mt-1 text-[11px] sm:text-xs text-gray-500 line-clamp-2">
              {{ blog.description }}
            </p>
          </div>

          <div
            class="mt-3 flex items-center justify-between text-[11px] sm:text-xs text-gray-400"
          >
            <span>
              {{
                new Date(blog.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              }}
            </span>
            <button
              class="flex items-center gap-1 text-[#EB3131]"
              @click.stop="redirect(blog._id)"
            >
              <span class="hidden sm:inline">Read more</span>
              <i class="pi pi-arrow-right text-[10px]"></i>
            </button>
          </div>
        </div>
      </article>
    </div>

    <!-- Prev / Page X of Y / Next -->
    <div
      v-if="totalpages > 1"
      class="mt-8 flex items-center justify-center gap-4 text-sm font-outfit"
    >
      <button
        class="px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 disabled:opacity-40 flex items-center gap-1"
        :disabled="!canPrev"
        @click="prevPage"
      >
        <i class="pi pi-angle-left text-xs"></i>
        <span>Previous</span>
      </button>

      <span class="text-gray-700">
        Page
        <span class="font-semibold">{{ pageNumber }}</span>
        of
        <span class="font-semibold">{{ totalpages }}</span>
      </span>

      <button
        class="px-4 py-1.5 rounded-full border border-gray-300 text-gray-700 disabled:opacity-40 flex items-center gap-1"
        :disabled="!canNext"
        @click="nextPage"
      >
        <span>Next</span>
        <i class="pi pi-angle-right text-xs"></i>
      </button>
    </div>
    <!-- SUCCESS STORIES SECTION -->
  </main>
</template>
