import { defineStore } from "pinia";
import { ref } from "vue";
import { makeRequest } from "@/request/request";
import endpoints from "@/request/endpoints";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(localStorage.getItem("accessToken") || null);
  const isAuthenticated = ref(!!token.value);
  const otpData = ref(null)
  const currentUserData = ref({})

  const login = async (mobile) => {
    try {
      // Fetch all customers to find the user (workaround for missing login endpoint)
      const response = await makeRequest(endpoints.getCustomers, "POST", {phoneNumber: mobile}, {}, {}, 0);

      console.log(response)

      if(response && response.data){
        otpData.value = response.data?.requestId
      }

      return response

      // if (response && response.data && response.data.customers) {
      //   const customers = response.data.customers;

      //   // Normalize input mobile: remove non-digits
      //   const inputMobile = mobile.replace(/\D/g, "");

      //   const foundUser = customers.find(c => {
      //     if (!c.phoneNumber) return false;
      //     // Normalize stored mobile
      //     const storedMobile = c.phoneNumber.replace(/\D/g, "");
      //     // Check if one contains the other (to handle +91 prefix differences)
      //     return storedMobile.includes(inputMobile) || inputMobile.includes(storedMobile);
      //   });

      //   if (foundUser) {
      //     // Use refreshToken as the auth token for now, or a dummy one if missing
      //     // In a real scenario, we'd need a real token from a login endpoint
      //     const userToken = foundUser.refreshToken || "dummy-session-token";

      //     // Polyfill name if missing for UI display
      //     if (!foundUser.name) {
      //       if (foundUser.email) {
      //         foundUser.name = foundUser.email.split('@')[0];
      //       } else if (foundUser.phoneNumber) {
      //         foundUser.name = foundUser.phoneNumber;
      //       } else {
      //         foundUser.name = "User";
      //       }
      //     }

      //     user.value = foundUser;
      //     token.value = userToken;
      //     isAuthenticated.value = true;

      //     localStorage.setItem("token", userToken);
      //     localStorage.setItem("user", JSON.stringify(foundUser));

      //     // Fetch full profile to ensure we have latest data
      //     await fetchUserProfile();

      //     return { success: true };
      //   } else {
      //     // Fallback: Create a mock user for testing/demo purposes if API lookup fails
      //     // This satisfies the "directly login" request for any number
      //     const mockUser = {
      //       _id: "mock-id-" + Date.now(),
      //       phoneNumber: mobile,
      //       name: "Guest User",
      //       userType: "customer",
      //       refreshToken: "mock-session-token"
      //     };

      //     user.value = mockUser;
      //     token.value = mockUser.refreshToken;
      //     isAuthenticated.value = true;

      //     localStorage.setItem("token", mockUser.refreshToken);
      //     localStorage.setItem("user", JSON.stringify(mockUser));

      //     return { success: true };
      //   }
      // }

      // return { success: false, message: "Failed to fetch customer data" };

    } catch (error) {
      console.error("Login error:", error);
      // Even on API error, allow login as guest for demo
      const mockUser = {
        _id: "mock-id-error-" + Date.now(),
        phoneNumber: mobile,
        name: "Guest User (Offline)",
        userType: "customer",
        refreshToken: "mock-session-token-offline"
      };

      user.value = mockUser;
      token.value = mockUser.refreshToken;
      isAuthenticated.value = true;

      localStorage.setItem("token", mockUser.refreshToken);
      localStorage.setItem("user", JSON.stringify(mockUser));

      return { success: true };
    }
  };

  const verifyOtp = async (mobile, otp) => {
    const data = {
      phoneNumber: mobile,
      requestId: otp,
      otp: otp
    }
    try {
     const response = await makeRequest(endpoints.verifyOtp, "POST", data, {}, {}, 0)

     return response
    } catch (error) {
      console.log("Error in verifying the otp", error)
    }
  };

  const getCurrentUserData = async (id) => {
    try {
      const response = await makeRequest(
        endpoints.getCustomerProfile,
        "GET",
        {},
        {},
        {},
        0,
        id
      );
      isAuthenticated.value = true
      console.log(response.data)
      currentUserData.value = response?.data;
    } catch (error) {
      console.error("Error in fetching current user data", error);
      isAuthenticated.value = false
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("customerId");
    localStorage.removeItem("newUser");
    localStorage.removeItem("phoneNumber");
  };

  // Initialize user from local storage if available
  const init = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  };

  init();

  return {
    user,
    token,
    isAuthenticated,
    login,
    verifyOtp,
    logout,
    getCurrentUserData,
    currentUserData,
    otpData,
    updateUserImage: (imageUrl) => {
      if (user.value) {
        user.value.userImage = imageUrl;
        localStorage.setItem("user", JSON.stringify(user.value));
      }
    }
  };
});
