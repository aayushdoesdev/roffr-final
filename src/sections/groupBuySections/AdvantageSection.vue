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
    // Header Reveal
    gsap.fromTo(headerRef.value.children,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.value, start: 'top 85%', once: true }
      }
    );

    // Cards Grid Reveal
    gsap.fromTo(cardsRef.value,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: sectionRef.value, start: 'top 75%', once: true }
      }
    );
  }, sectionRef.value);

  return () => ctx.revert();
});

const advantages = [
  {
    title: 'Below Market Prices',
    desc: 'Access inventory at developer cost plus a small margin, cutting out commercial retail fat.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline><polyline points="16 17 22 17 22 11"></polyline></svg>`
  },
  {
    title: 'Expert Negotiation',
    desc: 'Our team of veterans handles the tough conversations, securing favorable clauses for the group.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 13l-4 4-4-4 4-4 4 4z"></path><path d="M14 13l6-6-3-3-6 6"></path><path d="M8 19l-2 2-2-2 2-2"></path></svg>`
  },
  {
    title: 'Reduced Risk',
    desc: 'Every project undergoes 50+ points of due diligence before being presented to our community.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>`
  },
  {
    title: 'Full Transparency',
    desc: 'Real-time dashboards show every step of the negotiation and legal documentation process.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`
  },
  {
    title: 'Curated Community',
    desc: 'Network with high-net-worth peers and professional investors in every cohort.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`
  },
  {
    title: 'Early Access',
    desc: 'Get notified before projects reach the public market or general real estate portals.',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`
  }
];
</script>

<template>
  <section ref="sectionRef" class="advantages-section">
    <div class="inner-container">

      <!-- Header Area -->
      <div ref="headerRef" class="header-row">
        <div class="header-left">
          <h2 class="main-title">Strategic Advantages</h2>
          <p class="subtitle">Why elite investors choose the ARCHITECT methodology.</p>
        </div>
        
        <div class="header-right">
          <a href="#" class="learn-more">
            LEARN MORE
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid-layout">
        <div 
          v-for="(item, index) in advantages" 
          :key="'adv-' + index"
          :ref="el => { if (el) cardsRef[index] = el }"
          class="adv-card"
        >
          <div class="icon-box" v-html="item.icon"></div>
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-desc">{{ item.desc }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Main Layout ── */
.advantages-section {
  background-color: #ffffff; /* Crisp white background */
  padding: 8rem 1.5rem;
  font-family: 'Outfit', sans-serif;
  overflow: hidden;
}

.inner-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Header Row ── */
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4rem;
  flex-wrap: wrap;
  gap: 2rem;
}

.header-left {
  display: flex;
  flex-direction: column;
}

.main-title {
  font-family: 'Urbanist', sans-serif;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 800; /* Extra bold */
  color: #111827; /* Near black */
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 0.75rem 0;
  will-change: transform, opacity;
}

.subtitle {
  font-size: 1rem;
  color: #6B7280; /* Soft gray */
  margin: 0;
  will-change: transform, opacity;
}

.header-right {
  display: flex;
  will-change: transform, opacity;
}

.learn-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Urbanist', sans-serif;
  font-size: 0.85rem;
  font-weight: 800;
  color: #111827;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.learn-more:hover {
  opacity: 0.7;
  transform: translateX(4px);
}

/* ── Cards Grid ── */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* ── Individual Card ── */
.adv-card {
  background-color: #F4F5F7; /* Very light cool gray matching UI */
  padding: 2.5rem 2rem;
  border-radius: 4px; /* Slightly sharp corners */
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, background-color 0.3s ease;
  will-change: transform, opacity;
}

.adv-card:hover {
  transform: translateY(-4px);
  background-color: #EAECEF; /* Subtle shade change on hover for interactivity */
}

.icon-box {
  background-color: #ffffff; /* White inset contrast box */
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: #111827; /* Dark icon */
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02); /* Faint shadow to pop it off the gray */
}

.card-title {
  font-family: 'Urbanist', sans-serif;
  font-size: 1.15rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 1rem 0;
}

.card-desc {
  font-family: 'Outfit', sans-serif;
  font-size: 0.9rem;
  color: #6B7280;
  line-height: 1.6;
  margin: 0;
}

/* Responsive Overrides */
@media (max-width: 1024px) {
  .grid-layout {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .header-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
  
  .grid-layout {
    grid-template-columns: 1fr;
  }
  
  .adv-card {
    padding: 2rem 1.5rem;
  }
}
</style>
