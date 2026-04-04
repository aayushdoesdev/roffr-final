<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef   = ref(null);
const headerRef    = ref(null);
const titleRef     = ref(null);
const subtitleRef  = ref(null);
const cardRef      = ref(null);
const dividerRef   = ref(null);
const tradHeaderRef = ref(null);
const roffrHeaderRef = ref(null);
const traditionalItems = ref([]);
const roffrItems       = ref([]);

onMounted(() => {
  const ctx = gsap.context(() => {

    /* ── 1. Header timeline ── */
    const headerTl = gsap.timeline({
      scrollTrigger: { trigger: headerRef.value, start: 'top 88%', once: true }
    });
    headerTl
      .fromTo(titleRef.value,
        { opacity: 0, y: 24, skewY: 1.5 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.75, ease: 'power3.out' }
      )
      .fromTo(subtitleRef.value,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.45'
      );

    /* ── 2. Card entrance ── */
    gsap.fromTo(cardRef.value,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1.05, ease: 'expo.out',
        scrollTrigger: { trigger: cardRef.value, start: 'top 82%', once: true }
      }
    );

    /* ── 3. Divider draw ── */
    gsap.fromTo(dividerRef.value,
      { scaleY: 0, transformOrigin: 'top center' },
      {
        scaleY: 1, duration: 0.9, ease: 'power3.inOut', delay: 0.2,
        scrollTrigger: { trigger: cardRef.value, start: 'top 80%', once: true }
      }
    );

    /* ── 4. Column headers pop ── */
    gsap.fromTo([tradHeaderRef.value, roffrHeaderRef.value],
      { opacity: 0, y: 10 },
      {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.15,
        scrollTrigger: { trigger: cardRef.value, start: 'top 78%', once: true }
      }
    );

    /* ── 5. Traditional items ── */
    traditionalItems.value.forEach((el, i) => {
      const icon  = el.querySelector('.x-mark');
      const text  = el.querySelector('.item-text');

      gsap.fromTo(el,
        { opacity: 0, x: -10 },
        {
          opacity: 1, x: 0, duration: 0.55, ease: 'power2.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: cardRef.value, start: 'top 76%', once: true }
        }
      );
      gsap.fromTo(icon,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)',
          delay: i * 0.1 + 0.1,
          scrollTrigger: { trigger: cardRef.value, start: 'top 76%', once: true }
        }
      );
      gsap.fromTo(text,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.35, ease: 'power1.out',
          delay: i * 0.1 + 0.15,
          scrollTrigger: { trigger: cardRef.value, start: 'top 76%', once: true }
        }
      );
    });

    /* ── 6. Roffr items ── */
    roffrItems.value.forEach((el, i) => {
      const icon = el.querySelector('.check-mark');
      const text = el.querySelector('.item-text');

      gsap.fromTo(el,
        { opacity: 0, x: 10 },
        {
          opacity: 1, x: 0, duration: 0.55, ease: 'power2.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: cardRef.value, start: 'top 76%', once: true }
        }
      );
      gsap.fromTo(icon,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)',
          delay: i * 0.1 + 0.1,
          scrollTrigger: { trigger: cardRef.value, start: 'top 76%', once: true }
        }
      );
      gsap.fromTo(text,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.35, ease: 'power1.out',
          delay: i * 0.1 + 0.15,
          scrollTrigger: { trigger: cardRef.value, start: 'top 76%', once: true }
        }
      );
    });

  }, sectionRef.value);

  return () => ctx.revert();
});

const traditional = [
  { title: 'Manual Prospecting',       desc: 'Hours spent cold calling and chasing unverified lists.' },
  { title: 'Static Excel Tracking',    desc: 'Fragmented data and lost leads in outdated spreadsheets.' },
  { title: '90-120 Day Wait Times',    desc: 'Opaque payout cycles that hinder your cash flow.' },
  { title: 'Experience Based Guesswork', desc: 'Strategies based on intuition rather than real-time data.' }
];

const roffr = [
  { title: 'Verified High-Intent Leads', desc: 'Data-enriched leads ready for architectural consultation.' },
  { title: 'AI Matching & CRM',          desc: 'Unified digital infrastructure for 100% visibility.' },
  { title: 'Instant Approval',           desc: 'Blockchain-verified payouts with zero friction.' },
  { title: 'Data-Backed Strategy',       desc: 'Algorithms that predict market shifts before they happen.' }
];
</script>

<template>
  <section ref="sectionRef" class="precision-section">
    <div class="inner">

      <!-- Header -->
      <div ref="headerRef" class="header">
        <h2 ref="titleRef" class="title">Precision vs. Tradition</h2>
        <p ref="subtitleRef" class="subtitle">
          Why elite channel partners are migrating to Roffr's architectural sales framework.
        </p>
      </div>

      <!-- Comparison Card -->
      <div ref="cardRef" class="comparison-card">

        <!-- Left — Traditional Brokerage -->
        <div class="col col-traditional">
          <div ref="tradHeaderRef" class="col-header">
            <span class="col-icon traditional-icon">
              <!-- History SVG -->
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
                <path d="M12 7v5l4 2"/>
              </svg>
            </span>
            <span class="col-label">TRADITIONAL BROKERAGE</span>
          </div>

          <ul class="items-list">
            <li
              v-for="(item, i) in traditional"
              :key="'trad-' + i"
              :ref="el => { if (el) traditionalItems[i] = el }"
              class="item"
            >
              <span class="x-mark">
                <!-- Simple Red X -->
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
              <div class="item-text">
                <p class="item-title-trad">{{ item.title }}</p>
                <p class="item-desc-trad">{{ item.desc }}</p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Divider -->
        <div ref="dividerRef" class="divider"></div>

        <!-- Right — The Roffr Advantage -->
        <div class="col col-roffr">
          <!-- The light purple square top right -->
          <div class="purple-block"></div>
          
          <div ref="roffrHeaderRef" class="col-header relative z-10">
            <span class="col-icon roffr-icon">
              <!-- Rocket SVG -->
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
              </svg>
            </span>
            <span class="col-label roffr-label">THE ROFFR ADVANTAGE</span>
          </div>

          <ul class="items-list relative z-10">
            <li
              v-for="(item, i) in roffr"
              :key="'roffr-' + i"
              :ref="el => { if (el) roffrItems[i] = el }"
              class="item"
            >
              <span class="check-mark">
                <!-- Check icon -->
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <div class="item-text">
                <p class="item-title-roffr">{{ item.title }}</p>
                <p class="item-desc-roffr">{{ item.desc }}</p>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Section ── */
.precision-section {
  background: #F8F9FA; /* Off-white slightly gray bg matching screenshot */
  padding: 6rem 1.5rem;
  font-family: 'Outfit', sans-serif;
}

.inner {
  max-width: 960px;
  margin: 0 auto;
}

/* ── Header ── */
.header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.title {
  font-family: 'Urbanist', sans-serif;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700; /* Bold, but not too black */
  color: #111827; /* very dark gray/black */
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
  will-change: transform, opacity;
}

.subtitle {
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  color: #6B7280;
  max-width: 550px;
  margin: 0 auto;
  line-height: 1.6;
  will-change: transform, opacity;
}

/* ── Comparison Card ── */
.comparison-card {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  background: #ffffff;
  border-radius: 8px; /* Slightly squarer radius from screenshot */
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05); /* Soft, diffused shadow */
  will-change: transform, opacity;
}

.divider {
  background: #F3F4F6; /* light subtle gray */
  width: 1px;
  will-change: transform;
}

/* ── Columns ── */
.col {
  padding: 3rem 3rem;
}

.col-traditional {
  background: #ffffff;
  border-radius: 8px 0 0 8px;
}

.col-roffr {
  background: #ffffff;
  position: relative;
  overflow: hidden; /* To clip the top right purple block */
  border-radius: 0 8px 8px 0;
}

/* Purple block top-right */
.purple-block {
  position: absolute;
  top: 0;
  right: 0;
  width: 130px;
  height: 95px;
  background-color: #EFEFFC; /* Soft lilac/purple from outline */
  border-bottom-left-radius: 4px;
}

/* ── Column Headers ── */
.col-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
  will-change: transform, opacity;
}

.col-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.traditional-icon {
  color: #6B7280;
}

.roffr-icon {
  color: #111827;
}

.col-label {
  font-family: 'Urbanist', sans-serif;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.traditional-icon + .col-label {
  color: #8C929D;
}

.roffr-icon + .col-label {
  color: #111827; 
}

/* ── Items ── */
.items-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.item {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
}

/* X mark */
.x-mark {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
  color: #EF4444; /* sharp red */
}

/* Check mark */
.check-mark {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #111827; /* almost black */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}

/* Typography styles based on screenshot */
.item-text {
  flex: 1;
}

.item-title-trad, .item-title-roffr {
  font-family: 'Urbanist', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}

.item-title-trad {
  color: #9CA3AF; /* muted gray */
}

.item-title-roffr {
  color: #111827; /* dark text */
}

.item-desc-trad, .item-desc-roffr {
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  line-height: 1.5;
  margin: 0;
}

.item-desc-trad {
  color: #C1C6CF; /* very light gray text */
}

.item-desc-roffr {
  color: #6B7280; /* normal gray text */
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .comparison-card {
    grid-template-columns: 1fr;
  }

  .divider {
    width: 100%;
    height: 1px;
  }
  
  .col-traditional {
    border-radius: 8px 8px 0 0;
  }
  
  .col-roffr {
    border-radius: 0 0 8px 8px;
  }

  .col {
    padding: 2.5rem 1.5rem;
  }
}
</style>
