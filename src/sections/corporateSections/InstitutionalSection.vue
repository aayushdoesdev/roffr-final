<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const headerContentRef = ref(null);
const cardsRef = ref([]);

onMounted(() => {
  const ctx = gsap.context(() => {
    // Header sequence
    gsap.fromTo(headerContentRef.value.children,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.value, start: 'top 85%', once: true }
      }
    );

    // Cards staggered cascade
    gsap.fromTo(cardsRef.value,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true }
      }
    );
  }, sectionRef.value);

  return () => ctx.revert();
});

const verificationPillars = [
  {
    title: 'Developer Background',
    desc: 'Track record, past project delivery timelines, and market reputation analysis.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h14"></path><path d="M10 22V5l-6 3v14"></path><path d="M10 12h4"></path><path d="M14 22V2l10 5v15"></path></svg>`
  },
  {
    title: 'Legal & RERA Compliance',
    desc: 'Full title search, encumbrance certificates, and RERA registration auditing.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 13l-4 4-4-4 4-4 4 4z"></path><path d="M14 13l6-6-3-3-6 6"></path><path d="M8 19l-2 2-2-2 2-2"></path></svg>`
  },
  {
    title: 'Future Projections',
    desc: 'Infrastructure impact studies and 10-year capital appreciation modeling.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><polyline points="8 11 10 9 13 12 17 8"></polyline></svg>`
  },
  {
    title: 'Construction Quality',
    desc: 'On-site structural audits and material grade certification checks.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"></path><path d="M8.5 8.5L3 21"></path><path d="M15.5 8.5L21 21"></path><circle cx="12" cy="5" r="3"></circle></svg>`
  },
  {
    title: 'Financial Strength',
    desc: 'Developer debt-to-equity ratios and project funding source verification.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>`
  },
  {
    title: 'Documentation',
    desc: 'Ensuring every agreement clause protects the buyer\'s collective interest.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`
  }
];
</script>

<template>
  <section ref="sectionRef" class="institutional-rigor-section">
    <div class="inner-container">
      
      <!-- Top Center Header -->
      <div ref="headerContentRef" class="header-content">
        <h2 class="main-title">Institutional Rigor: What We Verify</h2>
        <p class="subtitle">Every investment passes through our 6-pillar verification protocol.</p>
      </div>

      <!-- 6-Pillar Grid -->
      <div class="verification-grid">
        
        <div 
          v-for="(pillar, index) in verificationPillars" 
          :key="'pillar-' + index"
          :ref="el => { if (el) cardsRef[index] = el }"
          class="verification-card"
        >
          <!-- SVG Icon injected directly -->
          <div class="icon-wrap" v-html="pillar.icon"></div>
          
          <h3 class="card-title">{{ pillar.title }}</h3>
          <p class="card-desc">{{ pillar.desc }}</p>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Main Layout ── */
.institutional-rigor-section {
  background-color: #FAFAFB; /* Pure crisp white/light-gray background */
  padding: 8rem 1.5rem;
  font-family: 'Outfit', sans-serif;
  overflow: hidden;
}

.inner-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Centered Header ── */
.header-content {
  text-align: center;
  margin-bottom: 4.5rem;
}

.main-title {
  font-family: 'Urbanist', sans-serif;
  font-size: clamp(2.25rem, 3.5vw, 3rem);
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.02em;
  margin: 0 0 1rem 0;
  will-change: transform, opacity;
}

.subtitle {
  font-size: 1.05rem;
  color: #6B7280;
  margin: 0;
  will-change: transform, opacity;
}

/* ── Grid Layout ── */
.verification-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem; /* Gap matched to layout spacing */
}

/* Responsive Matrix */
@media (max-width: 1024px) {
  .verification-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .verification-grid {
    grid-template-columns: 1fr;
  }
}

/* ── Verification Cards ── */
.verification-card {
  background-color: #F4F5F7; /* Very light slate gray matching the screenshot boxes */
  padding: 2.5rem 2rem;
  border-radius: 6px; /* Crisply squared corner edges */
  box-shadow: none; /* The UI design is completely flat */
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, background-color 0.2s ease;
  will-change: transform, opacity;
  border: 1px solid rgba(0, 0, 0, 0.02); /* Almost invisible border to hold shape */
}

/* Optional simple hover effect for interactivity */
.verification-card:hover {
  background-color: #FFFFFF;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.04);
  transform: translateY(-3px);
}

.icon-wrap {
  width: 24px;
  height: 24px;
  margin-bottom: 1.5rem;
  color: #111827; /* Dark vector color */
}

.card-title {
  font-family: 'Urbanist', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1rem 0;
}

.card-desc {
  font-size: 0.95rem;
  color: #6B7280;
  line-height: 1.6;
  margin: 0;
}
</style>
