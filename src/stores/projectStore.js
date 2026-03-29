import { makeRequest } from "@/request/request";
import { defineStore } from "pinia";
import endpoints from "@/request/endpoints";
import { ref } from "vue";

export const useProjectStore = defineStore("project", () => {
  const projectAffordablityData = ref([]);
  const groupBuyingData = ref([]);
  const specificPropertyDetails = ref([]);
  const projectPropertyListData = ref([]);
  const uniqueCitiesData = ref([]);
  const wishlistData = ref([]);
  const isModalOpen = ref(false)
  const pageNumber = ref(1);
  const pageSize = ref(10);
  const totalpages = ref(0);

  const getProjectAffordiablityData = async (
    city = "mumbai",
    affordability = "affordable"
  ) => {
    try {
      const params = {
        city: city,
        affordability: affordability,
        pageSize: pageSize.value,
        pageNumber: pageNumber.value,
      };

      const response = await makeRequest(
        endpoints.byAffordability,
        "GET",
        {},
        {},
        params,
        0
      );

      projectAffordablityData.value = response?.data;
      totalpages.value = response?.data?.totalPages;
      pageSize.value = response?.data?.pageSize;
      pageNumber.value = response?.data?.pageNumber;
    } catch (error) {
      console.error("Error in fetching project affordability data", error);
    }
  };

  const getGroupBuyingData = async () => {
    try {
      const response = await makeRequest(
        endpoints.groupBuying,
        "GET",
        {},
        {},
        {},
        0
      );

      groupBuyingData.value = response?.data;
    } catch (error) {
      console.error("Error in fetching group project data", error);
    }
  };

  const getProjectById = async (id) => {
    try {
      const response = await makeRequest(
        endpoints.getProjectById,
        "GET",
        {},
        {},
        {},
        0,
        id
      );

      specificPropertyDetails.value = response?.data?.project;
    } catch (error) {
      console.error("Error in fetching specific project data", error);
    }
  };

  const getProjectPropertyList = async (
    type = "project",
    search = "",
    city = ""
  ) => {
    try {
      const params = {
        type: type,
        search: search,
        limit: pageSize.value,
        page: pageNumber.value,
      };

      if (city) {
        params.city = city;
      }
      const response = await makeRequest(
        endpoints.getProjectProperty,
        "GET",
        {},
        {},
        params,
        0
      );

      projectPropertyListData.value = response?.data?.results;
      totalpages.value = response?.data?.total;
      pageSize.value = response?.data?.limit;
      pageNumber.value = response?.data?.page;
    } catch (error) {
      console.error("Error in fetching specific project data", error);
    }
  };

  const getProjectCities = async () => {
    try {
      const response = await makeRequest(
        endpoints.projectCities,
        "GET",
        {},
        {},
        {},
        0
      );

      uniqueCitiesData.value = response?.data;
    } catch (error) {
      console.error("Error in fetching specific project data", error);
    }
  };


  const joinProjectGroup = async (projectId, customerId) => {
    try {
      const response = await makeRequest(
        `/projects/${projectId}/apply/${customerId}`,
        "POST",
        {},
        {},
        {},
        0
      );

      return response;
    } catch (error) {
      console.error("Error in joining the project group", error);
    }
  };


  const getWishlist = async (customerId) => {
    try {
      const response = await makeRequest(
        `/projects/wishlist/customer/${customerId}`,
        "GET",
        {},
        {},
        {},
        0
      );
      
      wishlistData.value = response?.data?.wishlist
    } catch (error) {
      console.error("Error in joining the project group", error);
    }
  };


  const addToWishlist = async (projectId, customerId) => {
    try {
      const response = await makeRequest(
        `/projects/wishlist/${projectId}/customer/${customerId}`,
        "POST",
        {},
        {},
        {},
        0
      );

      return response;
    } catch (error) {
      console.error("Error in joining the project group", error);
    }
  };


  const removeFromWishlist = async (projectId, customerId) => {
    try {
      const response = await makeRequest(
        `/projects/wishlist/${projectId}/customer/${customerId}`,
        "DELETE",
        {},
        {},
        {},
        0
      );

      return response;
    } catch (error) {
      console.error("Error in joining the project group", error);
    }
  };

  getProjectAffordiablityData();
  getGroupBuyingData();

  return {
    projectAffordablityData,
    getProjectAffordiablityData,
    groupBuyingData,
    getProjectById,
    specificPropertyDetails,
    getProjectPropertyList,
    projectPropertyListData,
    getProjectCities,
    uniqueCitiesData,
    joinProjectGroup,
    wishlistData,
    removeFromWishlist,
    getWishlist,
    addToWishlist,
    isModalOpen,
    totalpages,
    pageNumber,
    pageSize,
  };
});
