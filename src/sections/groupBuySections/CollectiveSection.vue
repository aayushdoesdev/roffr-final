<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const cardsRef = ref([]);
const rightContentRef = ref(null);

onMounted(() => {
  const ctx = gsap.context(() => {
    // 1. Staggered card entrance from the bottom
    gsap.fromTo(cardsRef.value,
      { opacity: 0, y: 60 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true }
      }
    );

    // 2. Right side text sequence
    gsap.fromTo(rightContentRef.value.children,
      { opacity: 0, x: 30 },
      { 
        opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.2,
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true }
      }
    );
  }, sectionRef.value);

  return () => ctx.revert();
});
</script>

<template>
  <section ref="sectionRef" class="community-section">
    <div class="inner-container">
      
      <!-- Left Column: Cards Grid -->
      <div class="cards-col">
        <!-- Card 1 (Offset downwards) -->
        <div :ref="el => { if (el) cardsRef[0] = el }" class="info-card card-offset">
          <div class="icon-wrap">
            <!-- Node/Network SVG -->
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <circle cx="5" cy="6" r="2"></circle>
              <circle cx="19" cy="6" r="2"></circle>
              <circle cx="5" cy="18" r="2"></circle>
              <circle cx="19" cy="18" r="2"></circle>
              <circle cx="12" cy="4" r="2"></circle>
              <path d="M12 7v2"></path>
              <path d="M6.5 7.5l3.5 2.5"></path>
              <path d="M17.5 7.5l-3.5 2.5"></path>
              <path d="M6.5 16.5l3.5-2.5"></path>
              <path d="M17.5 16.5l-3.5-2.5"></path>
            </svg>
          </div>
          <h3 class="card-title">Collective Power</h3>
          <p class="card-desc">
            By pooling individual buying power, we approach developers with significant leverage, securing terms impossible for single buyers.
          </p>
        </div>

        <!-- Card 2 -->
        <div :ref="el => { if (el) cardsRef[1] = el }" class="info-card">
          <div class="icon-wrap">
            <!-- Money/Wholesale SVG -->
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="2"></rect>
              <circle cx="12" cy="12" r="2"></circle>
              <path d="M6 12h.01M18 12h.01"></path>
            </svg>
          </div>
          <h3 class="card-title">Wholesale Access</h3>
          <p class="card-desc">
            Direct-to-source acquisition removes middle-man commissions and retail markups, directly impacting your bottom line.
          </p>
        </div>
      </div>

      <!-- Right Column: Text & Checklist -->
      <div ref="rightContentRef" class="text-col">
        <h2 class="main-heading">
          Collective Power,<br/>Individually Owned.
        </h2>
        
        <div class="desc-text-wrapper">
          <p class="desc-text">
            Group buying isn't about shared ownership of one house. It's about a collective of individuals buying separate homes simultaneously to drive down the price for everyone.
          </p>
        </div>

        <ul class="checklist">
          <!-- Item 1 -->
          <li class="check-item">
            <span class="check-icon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6C55FF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <span class="check-text">Direct negotiation with Tier-1 Developers</span>
          </li>
          
          <!-- Item 2 -->
          <li class="check-item">
            <span class="check-icon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6C55FF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <span class="check-text">Strategic asset selection based on market data</span>
          </li>
          
          <!-- Item 3 -->
          <li class="check-item">
            <span class="check-icon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6C55FF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <span class="check-text">Standardized legal frameworks for speed</span>
          </li>
        </ul>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Main Layout ── */
.community-section {
  background-color: #F8F9FA; /* Off-white base matching screenshot */
  padding: 8rem 1.5rem;
  font-family: 'Outfit', sans-serif;
  overflow: hidden;
}

.inner-container {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .inner-container {
    grid-template-columns: 0.9fr 1.1fr; /* Right side gets slightly more room */
    gap: 6rem;
  }
}

/* ── Left Column (Cards) ── */
.cards-col {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
}

.info-card {
  background: #ffffff;
  padding: 2.5rem 2rem;
  border-radius: 6px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.04);
  max-width: 280px;
  display: flex;
  flex-direction: column;
  will-change: transform, opacity;
}

@media (min-width: 768px) {
  .card-offset {
    margin-top: 3.5rem; /* Offsets the first card downwards */
  }
}

.icon-wrap {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
}

.card-title {
  font-family: 'Urbanist', sans-serif;
  font-size: 1.15rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 1rem 0;
}

.card-desc {
  font-size: 0.85rem;
  color: #6B7280;
  line-height: 1.6;
  margin: 0;
}

/* ── Right Column (Text Content) ── */
.text-col {
  display: flex;
  flex-direction: column;
}

.main-heading {
  font-family: 'Urbanist', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.15;
  color: #111827;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 1.75rem 0;
  will-change: transform, opacity;
}

.desc-text-wrapper {
  margin-bottom: 2.5rem;
  will-change: transform, opacity;
}

.desc-text {
  font-size: 1rem;
  color: #4B5563; /* slightly darker gray for readability */
  line-height: 1.7;
  max-width: 500px;
  margin: 0;
}

/* ── Checklist ── */
.checklist {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  will-change: transform, opacity;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.check-icon {
  background-color: #EFEFFC; /* Soft light purple circle */
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.check-text {
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  color: #374151; /* Dark gray text */
  font-weight: 400;
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .cards-col {
    order: 2; /* Move cards below text on tablets/mobile */
  }
  .text-col {
    order: 1;
    text-align: left;
  }
}

@media (max-width: 640px) {
  .cards-col {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  
  .card-offset {
    margin-top: 0; /* flatten out offset on mobile */
  }
  
  .info-card {
    max-width: 100%;
    width: 100%;
  }
}
</style>
