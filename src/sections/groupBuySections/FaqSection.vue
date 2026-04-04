<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const titleRef = ref(null);
const listRef = ref([]);

// Default first item is open
const openIndex = ref(0);

const toggleFaq = (index) => {
  openIndex.value = openIndex.value === index ? -1 : index;
};

const faqs = [
  {
    q: 'Who actually owns the property?',
    a: 'You do. ARCHITECT facilitates the transaction and negotiation as a group, but the individual title and deed are issued in your name (or your company/trust).'
  },
  {
    q: 'What happens if someone in the group drops out?',
    a: 'We maintain an active waitlist for every cohort. If a buyer drops out, their spot is immediately offered to the next verified investor, ensuring the group\'s purchasing power remains intact.'
  },
  {
    q: 'Are there any upfront fees for joining?',
    a: 'No, joining the network is completely free. We only charge a transparent success fee upon the successful negotiation and signing of your property.'
  },
  {
    q: 'How are the developers selected?',
    a: 'We partner exclusively with Tier-1 developers who have a proven track record of delivering premium assets. Our due diligence covers financial stability, past performance, and construction quality before any project reaches you.'
  }
];

onMounted(() => {
  const ctx = gsap.context(() => {
    // Title animation
    gsap.fromTo(titleRef.value,
      { opacity: 0, y: 24 },
      { 
        opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.value, start: 'top 85%', once: true }
      }
    );

    // List items stagger animation
    gsap.fromTo(listRef.value,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true }
      }
    );
  }, sectionRef.value);

  return () => ctx.revert();
});
</script>

<template>
  <section ref="sectionRef" class="faq-section">
    <div class="inner-container">
      
      <!-- Title -->
      <h2 ref="titleRef" class="main-title">Frequently Asked Questions</h2>

      <!-- FAQ Accordion -->
      <div class="faq-list">
        <div 
          v-for="(faq, index) in faqs" 
          :key="'faq-' + index"
          :ref="el => { if (el) listRef[index] = el }"
          class="faq-card"
          @click="toggleFaq(index)"
        >
          <div class="faq-header">
            <h3 class="faq-question">{{ faq.q }}</h3>
            <!-- Plus / Minus Icon -->
            <span class="icon-toggle" :class="{ 'icon-open': openIndex === index }">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" class="vertical-line"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </span>
          </div>
          
          <div 
            class="faq-answer-wrapper" 
            :class="{ 'is-open': openIndex === index }"
          >
            <p class="faq-answer">{{ faq.a }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Main Layout ── */
.faq-section {
  background-color: #F8F9FA; /* Off-white base matching screenshot */
  padding: 8rem 1.5rem;
  font-family: 'Outfit', sans-serif;
  overflow: hidden;
}

.inner-container {
  max-width: 850px; /* Constrain width nicely for readability */
  margin: 0 auto;
}

/* ── Typography ── */
.main-title {
  font-family: 'Urbanist', sans-serif;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
  text-align: center;
  margin: 0 0 4rem 0;
  will-change: transform, opacity;
}

/* ── Accordion List ── */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.faq-card {
  background-color: #ffffff;
  padding: 1.75rem 2rem; /* Clean padding */
  border-radius: 4px; /* Crisp minimal corners */
  cursor: pointer;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.02); /* Very soft ambient shadow */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  will-change: transform, opacity;
}

.faq-card:hover {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.04);
}

.faq-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.faq-question {
  font-family: 'Urbanist', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

/* Toggle Icon */
.icon-toggle {
  color: #111827;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.icon-open {
  transform: rotate(45deg); /* Rotates the plus cleanly into an X */
  color: #6B7280; /* Dims slightly when open */
}

/* ── Accordion Reveal ── */
.faq-answer-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-answer-wrapper.is-open {
  grid-template-rows: 1fr;
}

.faq-answer {
  overflow: hidden;
  font-size: 0.95rem;
  color: #6B7280;
  line-height: 1.6;
  margin: 0;
  padding-top: 0;
  opacity: 0;
  transition: padding-top 0.35s ease, opacity 0.3s ease;
}

.faq-answer-wrapper.is-open .faq-answer {
  padding-top: 1.25rem; /* Spaces text from the question once open */
  opacity: 1;
  transition-delay: 0.1s; /* Slight delay to let it expand before full opacity */
}

/* Responsive Overrides */
@media (max-width: 640px) {
  .faq-card {
    padding: 1.5rem;
  }
}
</style>
