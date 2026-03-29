<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useProjectStore } from "@/stores/projectStore";
import { storeToRefs } from "pinia";
import Navbar from "@/components/Navbar.vue";

const router = useRouter();
const authStore = useAuthStore();
const { currentUserData } = storeToRefs(authStore);

const projectStore = useProjectStore();
const { wishlistData } = storeToRefs(projectStore);

const activeTab = ref("Dashboard");

const menuItems = [
  { name: "Dashboard", icon: "pi pi-th-large" },
  { name: "Profile", icon: "pi pi-user" },
  { name: "My project", icon: "pi pi-building" },
  { name: "Favorites", icon: "pi pi-heart" },
  { name: "My Visits", icon: "pi pi-map-marker" },
  { name: "Feedback", icon: "pi pi-thumbs-up" },
];

const handleLogout = () => {
  authStore.logout();
  router.push("/");
};

// Mock data for dashboard
const stats = {
  viewedProperties: 12,
  active: 2,
  siteVisits: 4,
};

const fileInput = ref(null);
const profileForm = ref({
  fullName: "",
  email: "",
  mobile: "",
  pincode: "",
  city: "",
  state: "",
});

const showAddPropertyForm = ref(false);
const propertyForm = ref({
  name: "",
  location: "",
  price: "",
  type: "",
  size: "",
});

const customerId = ref("")

onMounted(async () => {
  customerId.value = localStorage.getItem("customerId");
  await authStore.getCurrentUserData(customerId.value);
  projectStore.getWishlist(customerId.value);

  if (!authStore.isAuthenticated) {
    router.push("/login");
  } else {
    // Initialize profile form with user data
    profileForm.value = {
      fullName: currentUserData.value?.name || "",
      email: currentUserData.value?.email || "",
      mobile: currentUserData.value?.phoneNumber || "",
      pincode: currentUserData.value?.pincode || "",
      city: currentUserData.value?.city || "",
      state: currentUserData.value?.state || "",
    };
  }
});

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      authStore.updateUserImage(imageUrl);
    };
    reader.readAsDataURL(file);
  }
};

const saveProfile = () => {
  if (currentUserData.value) {
    currentUserData.value.name = profileForm.value.fullName;
    currentUserData.value.email = profileForm.value.email;
    currentUserData.value.pincode = profileForm.value.pincode;
    currentUserData.value.city = profileForm.value.city;
    currentUserData.value.state = profileForm.value.state;

    localStorage.setItem("user", JSON.stringify(user.value));
    alert("Profile updated successfully!");
  }
};

const addProperty = () => {
  // Placeholder for adding property logic
  console.log("Adding project:", propertyForm.value);
  alert("Project added successfully! (Mock)");
  showAddPropertyForm.value = false;
  propertyForm.value = {
    name: "",
    location: "",
    price: "",
    type: "",
    size: "",
  };
};

const goToProject = (id) => {
  router.push(`/project-details/${id}`);
};

const handleRemove = async(project, customer) => {
  await projectStore.removeFromWishlist(project, customer)
}

const feedbackTab = ref("Advisor");
const feedbackRating = ref(0);
const feedbackRemark = ref("");

const submitFeedback = () => {
  console.log("Submitting feedback:", {
    type: feedbackTab.value,
    rating: feedbackRating.value,
    remark: feedbackRemark.value,
  });
  alert("Thank you for your feedback!");
  // Reset form
  feedbackRating.value = 0;
  feedbackRemark.value = "";
};
</script>

<template>
  <div class="min-h-screen relative bg-[#1a1a1a] font-outfit">
    <Navbar />
    <!-- Background Image Overlay -->
    <div class="absolute inset-0 z-0 opacity-40">
      <img
        src="/images/heroSection/hero-bg.webp"
        alt="Background"
        class="w-full h-full object-cover"
      />
    </div>

    <div
      class="relative z-10 pt-32 pb-12 px-4 sm:px-6 lg:px-8 flex justify-center"
    >
      <!-- Main Card Container with Mask for Cutout -->
      <div class="w-full max-w-6xl relative mt-20">
        <!-- Profile Picture (Positioned in the cutout) -->
        <div
          class="absolute -top-20 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center"
        >
          <div class="relative">
            <div
              class="w-40 h-40 rounded-full bg-gray-500 border-[6px] border-white shadow-xl overflow-hidden relative z-20 cursor-pointer group"
              @click="triggerFileInput"
            >
              <img
                v-if="user?.userImage"
                :src="user.userImage"
                alt="Profile"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-gray-400 text-white text-5xl font-bold transition-colors duration-300 group-hover:bg-gray-500"
              >
                {{ currentUserData?.name?.charAt(0).toUpperCase() || "U" }}
              </div>

              <!-- Hover Overlay -->
              <div
                class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center"
              >
                <i
                  class="pi pi-camera text-white opacity-0 group-hover:opacity-100 text-3xl transition-opacity duration-300"
                ></i>
              </div>
            </div>
            <!-- Edit Icon -->
            <button
              @click="triggerFileInput"
              class="absolute bottom-2 right-0 bg-[#FFF3E0] p-2.5 rounded-full border-4 border-white shadow-md text-[#FF5722] hover:text-[#F4511E] transition-colors z-30 cursor-pointer"
            >
              <i class="pi pi-pencil text-lg"></i>
            </button>

            <!-- Hidden File Input -->
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              accept="image/*"
              @change="handleFileUpload"
            />
          </div>

          <div class="text-center mt-4">
            <h2 class="text-3xl font-marcellus font-bold text-gray-900">
              {{ currentUserData?.name || "Vishal B" }}
            </h2>
          </div>
        </div>

        <!-- White Card with Cutout Mask -->
        <div
          class="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] card-mask"
        >
          <!-- Sidebar -->
          <div
            class="w-full md:w-72 p-8 border-r border-gray-300 relative z-10"
          >
            <div class="space-y-2 mt-12">
              <button
                v-for="item in menuItems"
                :key="item.name"
                @click="
                  activeTab = item.name;
                  showAddPropertyForm = false;
                "
                class="w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 group"
                :class="
                  activeTab === item.name
                    ? 'text-[#FF5722]'
                    : 'text-gray-500 hover:bg-gray-50'
                "
              >
                <i :class="[item.icon, 'text-xl']"></i>
                <span class="font-medium text-lg">{{ item.name }}</span>
              </button>

              <button
                @click="handleLogout"
                class="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-gray-500 hover:bg-gray-50 transition-all duration-200 mt-8"
              >
                <i class="pi pi-sign-out text-xl"></i>
                <span class="font-medium text-lg">Logout</span>
              </button>
            </div>
          </div>

          <!-- Main Content -->
          <div class="flex-1 p-8 md:p-12 relative">
            <!-- Dashboard Content -->
            <div v-if="activeTab === 'Dashboard'" class="mt-32 md:mt-24">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <!-- Left Column: ID Card & Download -->
                <div
                  class="flex flex-col gap-3 mt-6 lg:border-r lg:border-orange-200 lg:pr-12"
                >
                  <div class="text-left">
                    <p class="text-gray-900 text-lg font-outfit">
                      Your virtual ID card for platform identification.
                    </p>
                  </div>

                  <!-- ID Card -->
                  <div
                    class="bg-gradient-to-br from-[#FF9800] to-[#F4511E] rounded-2xl py-6 px-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-between transition-all hover:scale-105 duration-300"
                  >
                    <div
                      class="flex justify-between items-center relative z-10"
                    >
                      <div>
                        <h3 class="text-3xl font-bold tracking-tight">
                          Roffr
                        </h3>
                        <p class="text-[10px] opacity-90 tracking-[0.2em] mt-1">
                          PLATINUM
                        </p>
                      </div>
                      <p class="text-[10px] opacity-90 tracking-wider">
                        MEMBER BENEFIT
                      </p>
                    </div>

                    <div class="flex items-center gap-4 relative z-10 my-4">
                      <div
                        class="bg-[#FFC107] text-black font-bold px-3 py-1 rounded text-lg shadow-sm"
                      >
                        8
                      </div>
                      <p
                        class="font-mono text-xl tracking-widest text-shadow-sm"
                      >
                        {{ currentUserData?.phoneNumber || "Adit72281" }}
                      </p>
                    </div>

                    <div class="flex justify-between items-end relative z-10">
                      <div>
                        <p class="text-[10px] opacity-80 mb-1 tracking-wider">
                          CARD HOLDER
                        </p>
                        <p
                          class="font-bold tracking-wide uppercase text-lg text-shadow-sm"
                        >
                          {{ user?.name || "ADITYA YELNURE" }}
                        </p>
                      </div>
                      <p class="font-bold italic opacity-90">Roffr SMART</p>
                    </div>
                  </div>

                  <!-- Download Button -->
                  <div class="mt-6">
                    <button
                      class="bg-[#FF5722] text-white font-outfit font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-[#F4511E] transition-all w-full transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      <i class="pi pi-download"></i>
                      Download ID Card
                    </button>
                  </div>
                </div>

                <!-- Right Column: Stats -->
                <div>
                  <h3 class="text-xl font-medium text-gray-900 mb-6 text-right">
                    My Roffr Journey
                  </h3>
                  <div class="grid grid-cols-2 gap-6">
                    <!-- Viewed Properties -->
                    <div
                      class="bg-white border border-orange-200 rounded-2xl p-5 relative shadow-sm hover:shadow-md transition-shadow"
                    >
                      <p class="text-xs font-semibold text-gray-500 mb-3">
                        Viewed Properties
                      </p>
                      <div class="flex justify-between items-end">
                        <span class="text-4xl font-bold text-[#FF5722]">{{
                          stats.viewedProperties
                        }}</span>
                        <i class="pi pi-eye text-[#FF5722] text-2xl"></i>
                      </div>
                    </div>

                    <!-- Active -->
                    <div
                      class="bg-white border border-orange-200 rounded-2xl p-5 relative shadow-sm hover:shadow-md transition-shadow"
                    >
                      <p class="text-xs font-semibold text-gray-500 mb-3">
                        Active
                      </p>
                      <div class="flex justify-between items-end">
                        <span class="text-4xl font-bold text-[#FF5722]">{{
                          stats.active
                        }}</span>
                        <i
                          class="pi pi-check-circle text-[#FF5722] text-2xl"
                        ></i>
                      </div>
                    </div>

                    <!-- Site Visits -->
                    <div
                      class="bg-white border border-orange-200 rounded-2xl p-5 relative col-span-2 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <p class="text-xs font-semibold text-gray-500 mb-3">
                        Site Visits Properties
                      </p>
                      <div class="flex justify-between items-end">
                        <span class="text-4xl font-bold text-[#FF5722]">{{
                          stats.siteVisits
                        }}</span>
                        <i class="pi pi-map-marker text-[#FF5722] text-2xl"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Profile Content -->
            <div v-if="activeTab === 'Profile'" class="mt-32 md:mt-24">
              <div class="max-w-3xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <!-- Full Name -->
                  <div class="space-y-2">
                    <label class="text-gray-400 text-sm font-medium"
                      >Full Name<span class="text-red-500">*</span></label
                    >
                    <input
                      v-model="profileForm.fullName"
                      type="text"
                      class="w-full bg-transparent border-b border-gray-200 py-2 text-gray-900 focus:outline-none focus:border-[#FF5722] transition-colors"
                      placeholder="Enter full name"
                    />
                  </div>

                  <!-- Email Address -->
                  <div class="space-y-2">
                    <label class="text-gray-400 text-sm font-medium"
                      >Email Address<span class="text-red-500">*</span></label
                    >
                    <input
                      v-model="profileForm.email"
                      type="email"
                      class="w-full bg-transparent border-b border-gray-200 py-2 text-gray-900 focus:outline-none focus:border-[#FF5722] transition-colors"
                      placeholder="Enter email address"
                    />
                  </div>

                  <!-- Mobile Number -->
                  <div class="space-y-2">
                    <label class="text-gray-400 text-sm font-medium"
                      >Mobile Number<span class="text-red-500">*</span></label
                    >
                    <input
                      v-model="profileForm.mobile"
                      type="tel"
                      class="w-full bg-transparent border-b border-gray-200 py-2 text-gray-900 focus:outline-none focus:border-[#FF5722] transition-colors"
                      placeholder="Enter mobile number"
                    />
                  </div>

                  <!-- Pincode -->
                  <div class="space-y-2">
                    <label class="text-gray-400 text-sm font-medium"
                      >Pincode<span class="text-red-500">*</span></label
                    >
                    <input
                      v-model="profileForm.pincode"
                      type="text"
                      class="w-full bg-transparent border-b border-gray-200 py-2 text-gray-900 focus:outline-none focus:border-[#FF5722] transition-colors"
                      placeholder="Enter pincode"
                    />
                  </div>

                  <!-- City -->
                  <div class="space-y-2">
                    <label class="text-gray-400 text-sm font-medium"
                      >City<span class="text-red-500">*</span></label
                    >
                    <input
                      v-model="profileForm.city"
                      type="text"
                      class="w-full bg-transparent border-b border-gray-200 py-2 text-gray-900 focus:outline-none focus:border-[#FF5722] transition-colors"
                      placeholder="Enter city"
                    />
                  </div>

                  <!-- State / Country -->
                  <div class="space-y-2">
                    <label class="text-gray-400 text-sm font-medium"
                      >State / Country<span class="text-red-500">*</span></label
                    >
                    <input
                      v-model="profileForm.state"
                      type="text"
                      class="w-full bg-transparent border-b border-gray-200 py-2 text-gray-900 focus:outline-none focus:border-[#FF5722] transition-colors"
                      placeholder="Enter state / country"
                    />
                  </div>
                </div>

                <div class="mt-12 flex justify-center">
                  <button
                    @click="saveProfile"
                    class="bg-[#FF5722] text-white font-bold py-3 px-12 rounded-lg shadow-lg hover:bg-[#F4511E] transition-all transform hover:-translate-y-0.5"
                  >
                    Save Details
                  </button>
                </div>
              </div>
            </div>

            <!-- My Project Content -->
            <div v-if="activeTab === 'My project'" class="relative h-full">
              <!-- Empty State -->
              <div
                v-if="!showAddPropertyForm"
                class="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
              >
                <div class="mb-6">
                  <img
                    src="/images/dashboard/empty-property.png"
                    alt="No Property"
                    class="w-28 h-28 opacity-90"
                  />
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2 font-outfit">
                  No Projects Yet
                </h3>
                <p class="text-gray-500 mb-8 font-outfit text-base">
                  You do not have any projects posted yet
                </p>

                <button
                  @click="showAddPropertyForm = true"
                  class="bg-[#FF5722] text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-[#F4511E] transition-all transform hover:-translate-y-0.5 font-outfit text-sm tracking-wide"
                >
                  Add your first project
                </button>
              </div>

              <!-- Add Project Form -->
              <div v-else class="mt-32 md:mt-24">
                <div class="max-w-3xl mx-auto">
                  <div class="flex justify-between items-center mb-8">
                    <h3 class="text-2xl font-bold text-gray-900">
                      Add New Project
                    </h3>
                    <button
                      @click="showAddPropertyForm = false"
                      class="text-gray-500 hover:text-gray-700"
                    >
                      <i class="pi pi-times text-xl"></i>
                    </button>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Project Name -->
                    <div class="space-y-2">
                      <label class="text-gray-400 text-sm font-medium"
                        >Project Name<span class="text-red-500">*</span></label
                      >
                      <input
                        v-model="propertyForm.name"
                        type="text"
                        class="w-full bg-transparent border-b border-gray-200 py-2 text-gray-900 focus:outline-none focus:border-[#FF5722] transition-colors"
                        placeholder="Enter project name"
                      />
                    </div>

                    <!-- Location -->
                    <div class="space-y-2">
                      <label class="text-gray-400 text-sm font-medium"
                        >Location<span class="text-red-500">*</span></label
                      >
                      <input
                        v-model="propertyForm.location"
                        type="text"
                        class="w-full bg-transparent border-b border-gray-200 py-2 text-gray-900 focus:outline-none focus:border-[#FF5722] transition-colors"
                        placeholder="Enter location"
                      />
                    </div>

                    <!-- Price -->
                    <div class="space-y-2">
                      <label class="text-gray-400 text-sm font-medium"
                        >Price<span class="text-red-500">*</span></label
                      >
                      <input
                        v-model="propertyForm.price"
                        type="text"
                        class="w-full bg-transparent border-b border-gray-200 py-2 text-gray-900 focus:outline-none focus:border-[#FF5722] transition-colors"
                        placeholder="Enter price"
                      />
                    </div>

                    <!-- Type -->
                    <div class="space-y-2">
                      <label class="text-gray-400 text-sm font-medium"
                        >Project Type<span class="text-red-500">*</span></label
                      >
                      <select
                        v-model="propertyForm.type"
                        class="w-full bg-transparent border-b border-gray-200 py-2 text-gray-900 focus:outline-none focus:border-[#FF5722] transition-colors"
                      >
                        <option value="" disabled selected>Select type</option>
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Plot">Plot</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                    </div>

                    <!-- Size -->
                    <div class="space-y-2">
                      <label class="text-gray-400 text-sm font-medium"
                        >Size (Sq. ft)<span class="text-red-500">*</span></label
                      >
                      <input
                        v-model="propertyForm.size"
                        type="text"
                        class="w-full bg-transparent border-b border-gray-200 py-2 text-gray-900 focus:outline-none focus:border-[#FF5722] transition-colors"
                        placeholder="Enter size"
                      />
                    </div>
                  </div>

                  <div class="mt-12 flex justify-center">
                    <button
                      @click="addProperty"
                      class="bg-[#FF5722] text-white font-bold py-3 px-12 rounded-lg shadow-lg hover:bg-[#F4511E] transition-all transform hover:-translate-y-0.5"
                    >
                      Submit Project
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Favorites Content -->
            <div v-if="activeTab === 'Favorites'" class="h-full">
              <div
                v-if="!wishlistData.length"
                class="flex flex-col items-center justify-center text-center px-8 mt-28"
              >
                <div class="mb-6">
                  <img
                    src="/images/dashboard/empty-property.png"
                    alt="No Favorites"
                    class="w-28 h-28 opacity-90"
                  />
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2 font-outfit">
                  No Favorites Yet
                </h3>
                <p class="text-gray-500 mb-8 font-outfit text-base">
                  You have not added any properties to favorites
                </p>

                <button
                  @click="router.push('/project')"
                  class="bg-[#FF5722] text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-[#F4511E] transition-all transform hover:-translate-y-0.5 font-outfit text-sm tracking-wide"
                >
                  Explore Properties
                </button>
              </div>

              <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-28">
                <div
                  v-for="item in wishlistData"
                  :key="item._id"
                  class="rounded-2xl border shadow-sm overflow-hidden bg-white flex flex-col"
                >
                  <!-- Image with fixed size -->
                  <div class="w-full h-44 overflow-hidden">
                    <img
                      :src="item.thumbnail"
                      :alt="item.projectName"
                      class="w-full h-full object-cover"
                    />
                  </div>

                  <!-- Content -->
                  <div class="p-3 flex flex-col gap-1 flex-1">
                    <p class="text-xs text-gray-500 uppercase">
                      {{ item.region }}, {{ item.city }}
                    </p>
                    <h3 class="text-sm font-semibold line-clamp-2">
                      {{ item.projectName }}
                    </h3>
                    <p class="text-xs text-gray-500">
                      {{ item.projectStatus }} • Possession
                      {{ item.readyToPossessDate }}
                    </p>
                    <p class="text-sm font-semibold mt-1">
                      ₹ {{ Number(item.priceMin || 0).toLocaleString("en-IN") }}
                      <span class="text-xs text-gray-400 font-normal">
                        – ₹
                        {{ Number(item.priceMax || 0).toLocaleString("en-IN") }}
                      </span>
                    </p>

                    <!-- Button -->
                    <div class="flex items-center gap-2">
                      <button
                        class="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 text-white text-xs px-4 py-2 w-full"
                        @click="goToProject(item._id || item.id)"
                      >
                        View Project
                        <i class="pi pi-arrow-right text-[10px]"></i>
                      </button>

                      <button @click="handleRemove(item._id, customerId)" class="pi pi-trash text-red-500 text-[20px] mt-2"></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- My Visits Content -->
            <div v-if="activeTab === 'My Visits'" class="relative h-full">
              <div
                class="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
              >
                <div class="mb-6">
                  <img
                    src="/images/dashboard/empty-property.png"
                    alt="No Visits"
                    class="w-28 h-28 opacity-90"
                  />
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2 font-outfit">
                  No Site Visits Yet
                </h3>
                <p class="text-gray-500 mb-8 font-outfit text-base">
                  You do not have visited Any property site yet
                </p>

                <button
                  @click="router.push('/project')"
                  class="bg-[#FF5722] text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#F4511E] transition-all transform hover:-translate-y-0.5 font-outfit text-sm tracking-wide"
                >
                  Book a Site Visit by Exploring Projects Now
                </button>
              </div>
            </div>

            <!-- Feedback Content -->
            <div
              v-if="activeTab === 'Feedback'"
              class="mt-32 md:mt-24 max-w-2xl mx-auto text-center"
            >
              <!-- Tabs -->
              <div
                class="flex justify-center gap-8 mb-12 border-b border-gray-200"
              >
                <button
                  @click="feedbackTab = 'Advisor'"
                  class="pb-2 text-lg font-medium transition-colors relative"
                  :class="
                    feedbackTab === 'Advisor'
                      ? 'text-[#FF5722]'
                      : 'text-gray-400 hover:text-gray-600'
                  "
                >
                  Roffr Advisor
                  <span
                    v-if="feedbackTab === 'Advisor'"
                    class="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF5722]"
                  ></span>
                </button>
                <button
                  @click="feedbackTab = 'Project'"
                  class="pb-2 text-lg font-medium transition-colors relative"
                  :class="
                    feedbackTab === 'Project'
                      ? 'text-[#FF5722]'
                      : 'text-gray-400 hover:text-gray-600'
                  "
                >
                  Project
                  <span
                    v-if="feedbackTab === 'Project'"
                    class="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF5722]"
                  ></span>
                </button>
              </div>

              <!-- Rate Us -->
              <div class="mb-8">
                <h3 class="text-lg font-bold text-gray-900 mb-4 text-left">
                  Rate Us
                </h3>
                <div class="flex gap-4">
                  <button
                    v-for="star in 5"
                    :key="star"
                    @click="
                      feedbackRating = feedbackRating === star ? star - 1 : star
                    "
                    class="focus:outline-none transition-transform hover:scale-110"
                  >
                    <i
                      class="pi pi-star-fill text-5xl"
                      :class="
                        star <= feedbackRating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      "
                    ></i>
                  </button>
                </div>
              </div>

              <!-- Remark -->
              <div class="mb-12">
                <textarea
                  v-model="feedbackRemark"
                  placeholder="Remark..."
                  class="w-full bg-gray-5 rounded-xl p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 resize-none h-32 border border-gray-100"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button
                @click="submitFeedback"
                class="bg-[#FF5722] text-white font-bold py-3.5 px-12 rounded-lg shadow-lg hover:bg-[#F4511E] transition-all transform hover:-translate-y-0.5 font-outfit w-full sm:w-auto"
              >
                Submit My Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-shadow-sm {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.card-mask {
  /* Create a circular cutout at the top center */
  mask-image: radial-gradient(
    circle at 50% 0,
    transparent 5.5rem,
    black 5.6rem
  );
  -webkit-mask-image: radial-gradient(
    circle at 50% 0,
    transparent 5.5rem,
    black 5.6rem
  );
}
</style>
