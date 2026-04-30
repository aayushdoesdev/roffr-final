// import { defineStore } from "pinia";
// import { makeRequest } from "@/request/request";
// import endpoints from "@/request/endpoints";
// import { ref } from "vue";

// export const useBlogStore = defineStore("blog", () => {
//   const blogData = ref([]);
//   const specificBlogData = ref([])
//   const selectedFilter = ref("all")
//   const pageNumber = ref(1);
//   const pageSize = ref(10);
//   const totalpages = ref(0);

//   // GET ALL Blogs
//   const getBlogData = async () => {
//     try {
//       const params = {
//         pageSize: pageSize.value,
//         pageNumber: pageNumber.value,
//       };
//       const response = await makeRequest(
//         endpoints.blog,
//         "GET",
//         {},
//         {},
//         params,
//         0
//       );
//       blogData.value = response?.data?.blogs;
//       totalpages.value = response?.data?.totalPages
//       pageSize.value = response?.data?.pageSize
//       pageNumber.value = response?.data?.pageNumber
//     } catch (error) {
//       console.log("Error in fetching blogs", error);
//     }
//   };


// //   Get Specific Blogs
// const getBlogsByid = async(id) => {
//     try {
//        const response = await makeRequest(endpoints.blog, "GET", {}, {}, {}, 0, id)
//        specificBlogData.value = response?.data
//     } catch (error) {
//         console.log("Error in fetching specific blogs", error);
//     }
// }


//   getBlogData();
//   return {
//     blogData,
//     specificBlogData,
//     getBlogsByid,
//     pageNumber,
//     getBlogData,
//     totalpages,
//     pageNumber,
//     pageSize
//   };
// });


import { defineStore } from "pinia";
import { blogs } from "@/data/blogs";

export const useBlogStore = defineStore("blogs", () => {
  
  const blogList = blogs;

  // 🔥 get by slug (BEST for blogs)
  const getBlogBySlug = (slug) => {
    return blogList.find((blog) => blog.slug === slug);
  };

  // optional
  const getBlogById = (id) => {
    return blogList.find((blog) => blog.blog_id === id);
  };

  return {
    blogList,
    getBlogBySlug,
    getBlogById,
  };
});