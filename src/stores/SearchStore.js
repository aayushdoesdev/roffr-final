import { defineStore } from "pinia";
import { makeRequest } from "@/request/request";
import endpoints from "@/request/endpoints";
import { ref } from "vue";

export const useSearchStore = defineStore("search", () => {
  const searchData = ref([]);
  const searchSuggestionData = ref([])
  const selectedFilter = ref("all")
  const pageNumber = ref(1);
  const pageSize = ref(10);
  const type = ref("property");
  const term = ref("");

  // GET ALL PROJECTS
  const getSearchData = async () => {
    try {
      const params = {
        pageSize: pageSize.value,
        pageNumber: pageNumber.value,
        type: type.value,
      };
      const response = await makeRequest(
        endpoints.search,
        "GET",
        {},
        {},
        params,
        0
      );
      searchData.value = response.data?.results;
    } catch (error) {
      console.log("Error in fetching search", error);
    }
  };

const getSearchSuggestion = async () => {
  try {
    const params = {
      limit: pageSize.value,
      page: pageNumber.value,
      term: term.value,
    };
    const response = await makeRequest(
      endpoints.searchSuggestion,
      "GET",
      {},
      {},
      params,
      0
    );
    // Assign the inner data array, adjust if needed
    searchSuggestionData.value = response.data || [];
    // console.log(searchSuggestionData.value)
  } catch (error) {
    console.log("Error in fetching suggestion", error);
  }
};


  getSearchData();
  return {
    searchData,
    getSearchData,
    getSearchSuggestion,
    searchSuggestionData,
    selectedFilter,
    type,
    term
  };
});
