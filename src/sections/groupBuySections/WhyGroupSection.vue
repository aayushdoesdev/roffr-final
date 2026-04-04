<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const headerRef = ref(null);
const cardLeftRef = ref(null);
const cardRightRef = ref(null);

onMounted(() => {
  const ctx = gsap.context(() => {
    // Header animation
    gsap.fromTo(headerRef.value.children,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true }
      }
    );

    // Cards animation
    gsap.fromTo([cardLeftRef.value, cardRightRef.value],
      { opacity: 0, y: 50 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, delay: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true }
      }
    );
  }, sectionRef.value);

  return () => ctx.revert();
});
</script>

<template>
  <section ref="sectionRef" class="comparison-section">
    <div class="inner-container">
      
      <!-- Header -->
      <div ref="headerRef" class="header">
        <h2 class="title">The Future of Acquisition</h2>
        <p class="subtitle">
          Comparison of traditional methods vs. the ARCHITECT group buying ecosystem.
        </p>
      </div>

      <!-- Cards Grid -->
      <div class="cards-grid">
        
        <!-- Left Card (Traditional) -->
        <div ref="cardLeftRef" class="card card-light">
          <div class="card-header">
            <h3 class="card-title text-dark">Traditional Buying</h3>
            <span class="badge badge-light">RETAIL</span>
          </div>

          <ul class="features-list">
            <li>
              <div class="icon-wrap icon-red">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <div class="feature-content text-dark">
                <h4 class="feature-title">Full Market Premiums</h4>
                <p class="feature-desc">You pay the retail list price set by developers and agents.</p>
              </div>
            </li>
            
            <li>
              <div class="icon-wrap icon-red">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <div class="feature-content text-dark">
                <h4 class="feature-title">Zero Negotiation Leverage</h4>
                <p class="feature-desc">Single buyers have minimal impact on final price or terms.</p>
              </div>
            </li>

            <li>
              <div class="icon-wrap icon-red">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <div class="feature-content text-dark">
                <h4 class="feature-title">Fragmented Research</h4>
                <p class="feature-desc">Relying on scattered data points and biased sales pitch.</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Right Card (Group Buy) -->
        <div ref="cardRightRef" class="card card-dark">
          <div class="card-header">
            <h3 class="card-title text-white">Community Group Buy</h3>
            <span class="badge badge-dark">WHOLESALE</span>
          </div>

          <ul class="features-list">
            <li>
              <div class="icon-wrap icon-purple">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="9 12 11 14 15 10"></polyline>
                </svg>
              </div>
              <div class="feature-content text-white">
                <h4 class="feature-title">12-18% Instant Equity</h4>
                <p class="feature-desc text-gray">Secure pricing below current market appraisal values.</p>
              </div>
            </li>
            
            <li>
              <div class="icon-wrap icon-purple">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="9 12 11 14 15 10"></polyline>
                </svg>
              </div>
              <div class="feature-content text-white">
                <h4 class="feature-title">Institutional Terms</h4>
                <p class="feature-desc text-gray">We negotiate upgrades, deferred payments, and lower deposits.</p>
              </div>
            </li>

            <li>
              <div class="icon-wrap icon-purple">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="9 12 11 14 15 10"></polyline>
                </svg>
              </div>
              <div class="feature-content text-white">
                <h4 class="feature-title">Curated Assets</h4>
                <p class="feature-desc text-gray">Expert analysis identifies projects with highest growth potential.</p>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Main Layout ── */
.comparison-section {
  background-color: #F8F9FA; /* Off-white base matching screenshot */
  padding: 8rem 1.5rem;
  font-family: 'Outfit', sans-serif;
  overflow: hidden;
}

.inner-container {
  max-width: 1000px; /* Slightly tighter width for the cards */
  margin: 0 auto;
}

/* ── Header ── */
.header {
  text-align: center;
  margin-bottom: 5rem;
}

.title {
  font-family: 'Urbanist', sans-serif;
  font-size: clamp(2.25rem, 4vw, 3rem);
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
  margin: 0 0 1rem 0;
  will-change: transform, opacity;
}

.subtitle {
  font-size: 1rem;
  color: #6B7280;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  will-change: transform, opacity;
}

/* ── Cards Grid ── */
.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}

/* ── Card Base ── */
.card {
  padding: 3rem 2.5rem;
  border-radius: 6px; /* Soft small radius */
  display: flex;
  flex-direction: column;
  will-change: transform, opacity;
}

.card-light {
  background-color: #F3F4F6; /* Slightly darker than section background */
}

.card-dark {
  background-color: #17181C; /* Deep sleek dark gray */
  box-shadow: 0 25px 50px rgba(71, 55, 235, 0.08); /* Faint ambient shadow often used on dark premium cards */
}

/* Header inside card */
.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.card-title {
  font-family: 'Urbanist', sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0;
}

.text-dark {
  color: #111827;
}

.text-white {
  color: #ffffff;
}

.text-gray {
  color: #9CA3AF;
}

/* Badges */
.badge {
  font-family: 'Urbanist', sans-serif;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.35rem 0.6rem;
  border-radius: 3px;
  text-transform: uppercase;
}

.badge-light {
  background-color: #E5E7EB;
  color: #6B7280;
}

.badge-dark {
  background-color: #374151; /* Dark gray */
  color: #D1D5DB; /* Light gray text */
}

/* ── List Features ── */
.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.features-list li {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
}

.icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.icon-red {
  color: #DC2626; /* Deep red for the X */
}

.icon-purple {
  color: #E0E7FF; /* Slightly purple-white, matching the dark theme */
}

.feature-title {
  font-family: 'Urbanist', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 0.3rem 0;
}

.feature-desc {
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0;
}

div.card-light .feature-desc {
  color: #6B7280; /* Gray for light card */
}

div.card-dark .feature-desc {
  color: #9CA3AF; /* Light gray for dark card */
}

/* Mobile specific paddings */
@media (max-width: 640px) {
  .card {
    padding: 2rem 1.5rem;
  }
}
</style>
