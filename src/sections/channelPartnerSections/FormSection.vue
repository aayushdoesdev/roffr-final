<script setup>
import { ref } from "vue";
import AnimatedTitle from "@/components/AnimatedTitle.vue";
// import { useInquiryStore } from "@/stores/InquiryStore";
// import Toast from "@/components/Toast.vue";
// import { useToastStore } from "@/stores/ToastStore";

// const inquiryStore = useInquiryStore();
// const toastStore = useToastStore();

// Reactive form fields
const companyName = ref("");
const mobileNumber = ref("");
const email = ref("");
const message = ref("");
const about = ref("");

// Method to send inquiry data
const submitInquiry = async () => {
  // Basic validation
  if (!companyName.value.trim()) {
    alert("Please enter a company name.");
    return;
  }
  if (!mobileNumber.value.trim()) {
    alert("Please enter a mobile number.");
    return;
  }
  if (!email.value.trim()) {
    alert("Please enter an email address.");
    return;
  }
  if (!message.value.trim()) {
    alert("Please enter an message.");
    return;
  }
  if (!about.value.trim()) {
    alert("Please enter an message.");
    return;
  }

  // Simple email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simple phone number validation: digits only, length check
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(mobileNumber.value)) {
    alert("Please enter a valid mobile number (10 digits).");
    return;
  }

  const inquiryData = {
    companyname: companyName.value.trim(),
    phone: mobileNumber.value.trim(),
    email: email.value.trim(),
    message: message.value.trim(),
    about: about.value.trim(),
  };

  try {
    const response = await inquiryStore.sendInquiry(inquiryData);
    if (response?.status == 201 || 200) {
      toastStore.showToast({
        title: "Successful",
        message: "Inquiry send successfully",
        variant: "success",
        duration: 3000,
      });
    }
    // Reset form
    companyName.value = "";
    mobileNumber.value = "";
    email.value = "";
  } catch (error) {
    toastStore.showToast({
      title: "Error",
      message: "Failed to send inquiry",
      variant: "error",
      duration: 3000,
    });
    // alert("Failed to submit inquiry. Please try again.");
    console.error(error);
  }
};
</script>

<template>
  <section class="max-w-7xl mx-auto font-lato py-10 px-4 xl:px-0">
    <AnimatedTitle text="Connect With Us" customClass="title-text text-center" />

    <div
      class="mt-16 flex flex-col items-center justify-between gap-10 w-full md:w-[80%] xl:w-[50%] mx-auto"
    >
      <div class="space-y-1 w-full">
        <p>Company Name</p>
        <input
          type="text"
          v-model="companyName"
          class="bg-black/5 rounded-full py-2 px-3 outline-none w-full"
        />
      </div>
      <div class="space-y-1 w-full">
        <p>Mobile Number</p>
        <input
          type="text"
          v-model="mobileNumber"
          class="bg-black/5 rounded-full py-2 px-3 outline-none w-full"
        />
      </div>
      <div class="space-y-1 w-full">
        <p>Email</p>
        <input
          type="text"
          v-model="email"
          class="bg-black/5 rounded-full py-2 px-3 outline-none w-full"
        />
      </div>
      <div class="space-y-1 w-full">
        <p>About</p>
        <input
          type="text"
          v-model="about"
          class="bg-black/5 rounded-full py-2 px-3 outline-none w-full"
        />
      </div>
      <div class="space-y-1 w-full">
        <p>Message</p>
        <textarea
          type="text"
          v-model="message"
          class="bg-black/5 rounded-full py-2 px-3 outline-none w-full"
        ></textarea>
      </div>
    </div>

    <div class="flex justify-center mt-6">
      <button class="base-btn" @click="submitInquiry">Submit</button>
    </div>
  </section>
  <!-- <Toast
    :title="toastStore.title"
    :message="toastStore.message"
    :type="toastStore.variant"
    :duration="toastStore.duration"
    v-if="toastStore.visible"
  /> -->
</template>
