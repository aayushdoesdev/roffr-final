<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const headerRef = ref(null);
const cardsRef = ref([]);

onMounted(() => {
  const ctx = gsap.context(() => {
    // Header Animation
    gsap.fromTo(headerRef.value,
      { opacity: 0, y: 25 },
      { 
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.value, start: 'top 85%', once: true }
      }
    );

    // Cards Stagger
    gsap.fromTo(cardsRef.value,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true }
      }
    );
  }, sectionRef.value);

  return () => ctx.revert();
});
</script>

<template>
  <section ref="sectionRef" class="strategic-portals-section">
    <div class="inner-container">
      
      <!-- Header -->
      <div ref="headerRef" class="header-block">
        <h2 class="main-title">Strategic Buyer Portals</h2>
      </div>

      <!-- Cards Grid -->
      <div class="cards-grid">
        
        <!-- Strategy Card 1: Corporate Buyer -->
        <div :ref="el => { if (el) cardsRef[0] = el }" class="strategy-card">
          <div class="icon-wrap icon-dark">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
              <line x1="9" y1="22" x2="9" y2="2"></line>
              <line x1="14" y1="6" x2="14" y2="6"></line>
              <line x1="14" y1="10" x2="14" y2="10"></line>
              <line x1="14" y1="14" x2="14" y2="14"></line>
              <line x1="14" y1="18" x2="14" y2="18"></line>
            </svg>
          </div>
          
          <h3 class="card-title">Corporate Buyer</h3>
          
          <p class="card-desc">
            Dedicated portals for employee housing allocations, staff quarters, and corporate guest houses with seamless bulk processing.
          </p>

          <ul class="feature-list">
            <li>
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
              <span>Employee Benefit Schemes</span>
            </li>
            <li>
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
              <span>Tax-Optimized Allocations</span>
            </li>
            <li>
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
              <span>Direct Payroll Integration</span>
            </li>
          </ul>
        </div>

        <!-- Strategy Card 2: Buyer Communities -->
        <div :ref="el => { if (el) cardsRef[1] = el }" class="strategy-card">
          <div class="icon-wrap icon-gray">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          
          <h3 class="card-title">Buyer Communities</h3>
          
          <p class="card-desc">
            Associations, clubs, and affinity groups pooling resources to unlock wholesale developer pricing and custom amenities.
          </p>

          <ul class="feature-list">
            <li>
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
              <span>Collective Price Negotiation</span>
            </li>
            <li>
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
              <span>Shared Amenity Customization</span>
            </li>
            <li>
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
              <span>Legal Group Compliance</span>
            </li>
          </ul>
        </div>

        <!-- Strategy Card 3: Institutional Investors -->
        <div :ref="el => { if (el) cardsRef[2] = el }" class="strategy-card">
          <div class="icon-wrap icon-purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#251390" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 2 7 22 7 12 2"></polygon>
              <line x1="2" y1="22" x2="22" y2="22"></line>
              <line x1="6" y1="18" x2="6" y2="7"></line>
              <line x1="10" y1="18" x2="10" y2="7"></line>
              <line x1="14" y1="18" x2="14" y2="7"></line>
              <line x1="18" y1="18" x2="18" y2="7"></line>
            </svg>
          </div>
          
          <h3 class="card-title">Institutional Investors</h3>
          
          <p class="card-desc">
            Large-scale asset acquisition for REITs, family offices, and hedge funds with comprehensive yield forecasting.
          </p>

          <ul class="feature-list">
            <li>
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
              <span>Full Asset Block Purchase</span>
            </li>
            <li>
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
              <span>Rental Yield Engineering</span>
            </li>
            <li>
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="9 12 11 14 15 10"></polyline>
              </svg>
              <span>Exit Strategy Modeling</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Main Layout ── */
.strategic-portals-section {
  background-color: #F8F9FA; /* Off-white base matching screenshot */
  padding: 8rem 1.5rem;
  font-family: 'Outfit', sans-serif;
  overflow: hidden;
}

.inner-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Header ── */
.header-block {
  margin-bottom: 4rem;
  will-change: transform, opacity;
}

.main-title {
  font-family: 'Urbanist', sans-serif;
  font-size: clamp(2rem, 3.5vw, 2.5rem);
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
  margin: 0;
  position: relative;
  display: inline-block;
  padding-bottom: 1rem;
}

/* Thick short underline accent */
.main-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 4px;
  background-color: #111827;
}

/* ── Cards Grid ── */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

/* ── Strategy Card ── */
.strategy-card {
  background-color: #ffffff;
  padding: 3rem 2.5rem;
  border-radius: 6px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform, opacity;
}

.strategy-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);
}

/* Colored Icon Wrappers */
.icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.icon-dark {
  background-color: #1A1D20;
}

.icon-gray {
  background-color: #F3F4F6;
}

.icon-purple {
  background-color: #F0EDFB;
}

/* Text Content */
.card-title {
  font-family: 'Urbanist', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1.25rem 0;
  line-height: 1.35;
}

.card-desc {
  font-size: 0.95rem;
  color: #6B7280;
  line-height: 1.7;
  margin: 0 0 2.5rem 0;
  flex-grow: 1; /* Pushes list to the bottom evenly */
}

/* Features List */
.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: #374151; /* Darker clean gray for lists */
  font-weight: 400;
}

.check-icon {
  width: 16px;
  height: 16px;
  color: #111827;
  flex-shrink: 0;
}

/* Responsive Overrides */
@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
  
  .strategy-card {
    padding: 2.5rem 2rem;
  }
}
</style>
