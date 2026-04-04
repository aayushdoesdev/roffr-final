<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BookingSection from './InstitutionalSection.vue';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const topBadgeRef = ref(null);
const leftCardRef = ref(null);
const rightCardsRef = ref([]);
const bottomGlassCardRef = ref(null);

onMounted(() => {
  const ctx = gsap.context(() => {
    // 1. Badge & Line Reveal
    gsap.fromTo(topBadgeRef.value,
      { opacity: 0, x: -30 },
      { 
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.value, start: 'top 85%', once: true }
      }
    );

    // 2. Left Static Card
    gsap.fromTo(leftCardRef.value,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true }
      }
    );

    // 3. Right Inner Cards (Steering & Best Value)
    gsap.fromTo(rightCardsRef.value,
      { opacity: 0, y: 30, scale: 0.95 },
      { 
        opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.3,
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true }
      }
    );

    // 4. Bottom Glass Timeline Card
    gsap.fromTo(bottomGlassCardRef.value,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6,
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true }
      }
    );

  }, sectionRef.value);

  return () => ctx.revert();
});

const avatars = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/46.jpg'
];
</script>

<template>
  <section ref="sectionRef" class="ntpc-spotlight-section">
    <!-- Background building graphic overlay -->
    <div class="bg-architectural"></div>
    
    <div class="inner-container relative z-10">
      
      <!-- Top Spotlight Label -->
      <div ref="topBadgeRef" class="tag-header">
        <span class="spotlight-badge">INSTITUTIONAL SPOTLIGHT</span>
        <div class="header-line"></div>
      </div>

      <div class="content-grid">
        
        <!-- Left Column (NTPC Details) -->
        <div ref="leftCardRef" class="left-col">
          <div class="info-card">
            <h2 class="card-title">NTPC Group</h2>
            <p class="card-subtitle">Noida Institutional Hub</p>

            <div class="data-pills">
              <!-- Pill 1 -->
              <div class="data-pill">
                <span class="pill-label">Project Type</span>
                <span class="pill-value text-white font-bold">Staff Quarters</span>
              </div>
              
              <!-- Pill 2 -->
              <div class="data-pill">
                <span class="pill-label">Total Units</span>
                <span class="pill-value text-white font-bold">450+ Units</span>
              </div>

              <!-- Pill 3 -->
              <div class="data-pill">
                <span class="pill-label">Procurement</span>
                <span class="pill-value text-purple font-bold">Released Tender</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column (Stats & Timeline) -->
        <div class="right-col">
          
          <div class="stats-row">
            <!-- Steering Committee Card -->
            <div :ref="el => { if (el) rightCardsRef[0] = el }" class="glass-glow-card">
              <div class="card-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <polyline points="9 12 11 14 15 10"></polyline>
                </svg>
                <h3 class="glow-title">Steering Committee</h3>
              </div>
              
              <p class="glow-desc">
                A specialized 5-member committee chaired by institutional leads to oversee technical and financial viability.
              </p>

              <!-- Avatar Group -->
              <div class="avatar-group">
                <img v-for="(src, idx) in avatars" :key="idx" :src="src" class="avatar-img" />
                <div class="avatar-more">+2</div>
              </div>
            </div>

            <!-- Best Value Offer Card -->
            <div :ref="el => { if (el) rightCardsRef[1] = el }" class="glass-glow-card bg-highlight">
              <div class="card-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </svg>
                <h3 class="glow-title">Best Value Offer</h3>
              </div>
              
              <div class="massive-value">₹142 Cr</div>
              
              <p class="glow-desc">
                Realized value through IndigoEstate tender process, saving ₹18 Cr against market estimates.
              </p>
            </div>
          </div>

          <!-- Timeline Glass Card -->
          <div ref="bottomGlassCardRef" class="timeline-glass-card">
            <h3 class="timeline-title">Tender Milestones</h3>
            
            <div class="timeline-track">
              <!-- Background generic line -->
              <div class="track-line"></div>
              
              <!-- Milestone 1 -->
              <div class="milestone">
                <div class="mile-value">Sept 23</div>
                <div class="mile-label">FLOAT DATE</div>
              </div>
              
              <!-- Milestone 2 -->
              <div class="milestone">
                <div class="mile-value">12 Bids</div>
                <div class="mile-label">TECHNO-COMMERCIAL</div>
              </div>

              <!-- Milestone 3 -->
              <div class="milestone">
                <div class="mile-value">Oct 23</div>
                <div class="mile-label">FINAL SELECTION</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>

  <!-- Nested Verification Block -->
  <BookingSection />
</template>

<style scoped>
/* ── Main Canvas Layout ── */
.ntpc-spotlight-section {
  background-color: #0B101E; /* Deep midnight blue */
  padding: 8rem 1.5rem;
  font-family: 'Outfit', sans-serif;
  overflow: hidden;
  position: relative;
}

/* Hard light architect building background via unsplash */
.bg-architectural {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 60%;
  background-image: url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000');
  background-size: cover;
  background-position: right center;
  opacity: 0.15; /* Soften into the darkness */
  mask-image: linear-gradient(to right, transparent, black 40%);
  -webkit-mask-image: linear-gradient(to right, transparent, black 40%);
  z-index: 1;
}

.inner-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Top Header Tag ── */
.tag-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.spotlight-badge {
  font-family: 'Urbanist', sans-serif;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #ffffff;
  background-color: #5E4DFF; /* Spotlight purple */
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.header-line {
  height: 1px;
  background-color: rgba(255, 255, 255, 0.15);
  flex-grow: 1;
  max-width: 400px; /* Constrains line length */
}

/* ── Layout Grid ── */
.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: 320px 1fr; /* Left rigid card, right expands */
    gap: 3rem;
  }
}

/* ── Left NTPC Static Card ── */
.left-col {
  display: flex;
  flex-direction: column;
}

.info-card {
  background-color: #171C28; /* Solid matte dark blue/gray */
  border-radius: 12px;
  padding: 2.5rem 2rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
}

.card-title {
  font-family: 'Urbanist', sans-serif;
  font-size: clamp(2rem, 3vw, 2.25rem);
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
}

.card-subtitle {
  color: #8B94B6;
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 2.5rem 0;
}

.data-pills {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.data-pill {
  background-color: #0F131E; /* Inset dark background */
  border-radius: 8px;
  padding: 1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.pill-label {
  font-size: 0.85rem;
  color: #6B7280;
}

.pill-value {
  font-size: 0.95rem;
  font-family: 'Urbanist', sans-serif;
  letter-spacing: 0.02em;
}

.text-purple {
  color: #8B7AFF;
}

/* ── Right Column: Glow Cards ── */
.stats-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .stats-row {
    grid-template-columns: 1fr 1.3fr; /* Best Value gets slightly more room */
    gap: 2rem;
  }
}

.glass-glow-card {
  background: rgba(30, 36, 68, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(94, 77, 255, 0.2); /* Faint purple border glow */
  box-shadow: inset 0 0 40px rgba(94, 77, 255, 0.05); /* Soft inner purple glow */
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

/* Intensify the highlight on the main card */
.bg-highlight {
  border: 1px solid rgba(94, 77, 255, 0.4);
  box-shadow: inset 0 0 80px rgba(94, 77, 255, 0.15), 0 20px 40px rgba(0, 0, 0, 0.5);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.glow-title {
  font-family: 'Urbanist', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.glow-desc {
  font-size: 0.95rem;
  color: #A3ADC2;
  line-height: 1.6;
  margin: 0 0 2rem 0;
  flex-grow: 1;
}

/* Avatar Group inside Steering */
.avatar-group {
  display: flex;
  align-items: center;
}

.avatar-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #1E2444; /* Matches card bg to overlap */
  margin-left: -10px;
  object-fit: cover;
}

.avatar-group .avatar-img:first-child {
  margin-left: 0;
}

.avatar-more {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #5E4DFF;
  border: 2px solid #1E2444;
  margin-left: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
  font-weight: bold;
  color: #fff;
}

/* Best Value Font override */
.massive-value {
  font-family: 'Urbanist', sans-serif;
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 800;
  color: #A49BFF; /* Radiant bright purple */
  margin-bottom: 1rem;
  line-height: 1;
}

/* ── Timeline Bottom Card ── */
.timeline-glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem 2.5rem;
}

.timeline-title {
  font-family: 'Urbanist', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 2rem 0;
}

.timeline-track {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  text-align: center;
}

.track-line {
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.15);
  z-index: 0;
}

.milestone {
  position: relative;
  z-index: 10;
  background-color: transparent;
  padding: 0 0.5rem; /* Breaks the line slightly */
}

.mile-value {
  font-family: 'Urbanist', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.25rem;
  text-shadow: 0 5px 15px rgba(0,0,0,0.5);
}

.mile-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #8B94B6;
  text-transform: uppercase;
}

/* Responsive Overrides */
@media (max-width: 640px) {
  .timeline-track {
    flex-direction: column;
    gap: 2rem;
  }
  
  .track-line {
    top: 0;
    bottom: 0;
    left: 50%;
    width: 1px;
    height: 100%;
  }
  
  .milestone {
    background-color: #121827; /* Fallback for mask */
    padding: 0.5rem 0;
  }
}
</style>
