import { defineStore } from "pinia";
import { makeRequest } from "@/request/request";
import endpoints from "@/request/endpoints";
import { ref } from "vue";

export const usePlanStore = defineStore("plan", () => {
  const planData = ref([]);
  const pageNumber = ref(1);
  const pageSize = ref(10);
  const totalpages = ref(0);

  // GET ALL Blogs
  const getPlanData = async () => {
    try {
      const response = await makeRequest(
        endpoints.plans,
        "GET",
        {},
        {},
        {},
        0
      );
      planData.value = response?.data?.plans;
      totalpages.value = response?.data?.totalPages
      pageSize.value = response?.data?.pageSize
      pageNumber.value = response?.data?.pageNumber
    } catch (error) {
      console.log("Error in fetching plans", error);
    }
  };


  getPlanData();
  return {
    planData,
    getPlanData,
    pageNumber,
    totalpages,
    pageNumber,
    pageSize
  };
});
