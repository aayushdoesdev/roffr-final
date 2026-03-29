<script setup>
import { ref } from "vue";
import AnimatedTitle from "@/components/AnimatedTitle.vue";

const categories = [
  { id: "about", label: "About Roffr" },
  { id: "joining", label: "Joining a Group & Key Benefits" },
  { id: "membership", label: "Membership & Subscription Fees" },
  { id: "clients", label: "Our Clients & Success Stories" },
];

const faqs = {
  about: [
    {
      question: "What is Roffr?",
      answer:
        "Roffr is a group buying platform that helps multiple buyers come together to purchase real estate at better prices with transparent processes.",
    },
    {
      question: "How does Roffr work?",
      answer:
        "Buyers with similar requirements are grouped, projects are shortlisted, and negotiations are done on behalf of the group to secure better terms from developers.",
    },
    {
      question:
        "Why should I choose Roffr over brokers or traditional channels?",
      answer:
        "You get collective negotiation power, curated projects, and a structured, tech-driven buying journey instead of fragmented broker-led discovery.",
    },
    {
      question: "Is Roffr available in all cities?",
      answer:
        "The service is currently active in selected major cities and is being expanded to new locations in phases.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach the support team through the help centre on the website, email, or the dedicated WhatsApp/phone support number.",
    },
  ],

  // ------------ JOINING A GROUP --------------
  joining: [
    {
      question: "How do I join a buyer group?",
      answer:
        "You simply sign up on Roffr, choose your preferred project, and join any group that matches your needs.",
    },
    {
      question: "What are the benefits of joining a group?",
      answer:
        "You get lower prices, better deals, priority access, and increased negotiation power as part of a group.",
    },
    {
      question: "What if my group is too small or doesn't fill up?",
      answer:
        "If a group doesn't reach the required size, Roffr helps merge or reassign members so you still get access to the offer.",
    },
    {
      question: "Can I choose my own group members?",
      answer:
        "Yes. You can join public groups or create private groups where you invite your own friends or family.",
    },
    {
      question: "Will I get early access to new projects and launches?",
      answer:
        "Yes, Roffr members often get early access and exclusive pre-launch offers.",
    },
  ],

  // ------------ MEMBERSHIP & FEES --------------
  membership: [
    {
      question: "Do I need to pay to join Roffr?",
      answer:
        "You can browse and explore projects for free. Payments are only required for premium features or group confirmations.",
    },
    {
      question: "How much does the subscription cost?",
      answer:
        "Roffr offers simple and affordable subscription options based on the services you use.",
    },
    {
      question: "Are there any hidden charges?",
      answer:
        "No. Roffr follows a fully transparent pricing structure with no hidden fees.",
    },
    {
      question: "Do I need to pay developers through Roffr?",
      answer:
        "No. All payments for your property are made directly to the developer. Roffr only facilitates the group buying process.",
    },
    {
      question: "Is my subscription refundable?",
      answer:
        "Subscriptions are generally non-refundable except in special cases mentioned in Roffr's refund policy.",
    },
  ],

  // ------------ CLIENTS & SUCCESS STORIES --------------
  clients: [
    {
      question: "Who typically uses Roffr?",
      answer:
        "Homebuyers, families, and investors looking for better real estate deals through group buying.",
    },
    {
      question: "Do developers really agree to group discounts?",
      answer:
        "Yes. Developers prefer group bookings because they can sell multiple units quickly, so they offer special discounts.",
    },
    {
      question: "What kind of discounts can I expect?",
      answer:
        "Depending on the project, buyers can expect savings ranging from 2% to 10% or even more.",
    },
    {
      question: "How much can I actually save?",
      answer:
        "Many buyers save between ₹2 lakhs to ₹10 lakhs or more through Roffr group deals.",
    },
    {
      question: "Can you share a success story from a past buyer?",
      answer:
        "Yes. Recently, a Roffr group of 12 buyers secured an average savings of ₹6 lakhs each on a major residential project.",
    },
  ],
};

const activeCategory = ref("about");
const openQuestion = ref(faqs.about[0]?.question || "");

const selectCategory = (id) => {
  activeCategory.value = id;
  const first = faqs[id][0];
  openQuestion.value = first ? first.question : "";
};

const toggleQuestion = (q) => {
  openQuestion.value = openQuestion.value === q ? "" : q;
};
</script>

<template>
  <section class="max-w-7xl mx-auto py-10 px-4 2xl:px-0">
    <div class="text-center mb-8">
      <AnimatedTitle text="You have Questions. We have Answers." customClass="title-text" />
    </div>

    <div
      class="bg-[#DB4A2B33] p-4 sm:p-6 rounded-2xl flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1
          class="font-urbanist font-bold text-[#DB4A2B] text-2xl sm:text-[30px]"
        >
          FAQS
        </h1>
      </div>
      <p class="font-inter text-sm sm:text-base sm:max-w-md">
        Get answers to some commonly asked questions about the Roffr platform
        and our services.
      </p>
    </div>

    <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-8 lg:mt-10">
      <!-- Left Side -->
      <aside
        class="w-full lg:w-64 bg-[#faf7f5] border border-[#f3e6de] rounded-2xl p-4 space-y-2 text-sm"
      >
        <p class="text-xs font-semibold text-gray-500 mb-2">Category</p>
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="selectCategory(cat.id)"
          class="w-full text-left px-3 py-2 rounded-xl transition text-xs sm:text-sm"
          :class="
            activeCategory === cat.id
              ? 'bg-[#ffefe6] text-[#e35a2d] font-semibold'
              : 'text-gray-700 hover:bg-white'
          "
        >
          {{ cat.label }}
        </button>
      </aside>

      <!-- Right Side -->
      <div class="flex-1">
        <h2 class="text-lg sm:text-xl font-semibold mb-4">
          {{ categories.find((c) => c.id === activeCategory)?.label }}
        </h2>

        <div class="space-y-3">
          <div
            v-for="item in faqs[activeCategory]"
            :key="item.question"
            class="rounded-2xl border border-[#f3e6de] bg-white overflow-hidden"
          >
            <button
              class="w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 text-left"
              @click="toggleQuestion(item.question)"
            >
              <div class="flex items-center gap-3">
                <span
                  class="flex h-6 w-6 items-center justify-center rounded-full border border-[#ffb29a] text-[#e35a2d] text-xs"
                >
                  ?
                </span>
                <span
                  class="text-sm font-medium"
                  :class="
                    openQuestion === item.question
                      ? 'text-[#e35a2d]'
                      : 'text-gray-800'
                  "
                >
                  {{ item.question }}
                </span>
              </div>
              <span
                class="h-6 w-6 flex items-center justify-center rounded-full bg-[#fff4ee] text-[#e35a2d] text-lg"
              >
                {{ openQuestion === item.question ? "−" : "+" }}
              </span>
            </button>

            <transition name="fade">
              <div
                v-if="openQuestion === item.question"
                class="px-8 sm:px-12 pb-4 text-xs sm:text-sm text-gray-600"
              >
                {{ item.answer }}
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
