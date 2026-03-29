import { defineStore } from "pinia";
import { makeRequest } from "@/request/request";
import endpoints from "@/request/endpoints";
import { ref } from "vue";

export const useAmenityStore = defineStore("amenity", () => {
  const amenityData = ref([]);
  const pageNumber = ref(1);
  const pageSize = ref(10);
  const totalpages = ref(0);

  // GET ALL Blogs
  const getAmenityData = async () => {
    try {
      const response = await makeRequest(
        endpoints.amenity,
        "GET",
        {},
        {},
        {},
        0
      );
      amenityData.value = response?.data;
      totalpages.value = response?.data?.totalPages
      pageSize.value = response?.data?.pageSize
      pageNumber.value = response?.data?.pageNumber
    } catch (error) {
      console.log("Error in fetching blogs", error);
    }
  };


  getAmenityData();
  return {
    amenityData,
    getAmenityData,
    pageNumber,
    totalpages,
    pageNumber,
    pageSize
  };
});
