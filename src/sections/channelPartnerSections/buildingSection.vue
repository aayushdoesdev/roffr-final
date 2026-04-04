<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const leftContentRef = ref(null);
const quoteCardRef = ref(null);
const rightItemsRef = ref([]);

onMounted(() => {
  const ctx = gsap.context(() => {
    // Left side fade/slide in
    gsap.fromTo(leftContentRef.value,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true }
      }
    );

    // Quote card fade/scale
    gsap.fromTo(quoteCardRef.value,
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', delay: 0.3,
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true }
      }
    );

    // Right grid stagger
    gsap.fromTo(rightItemsRef.value,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.15, delay: 0.2,
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true }
      }
    );
  }, sectionRef.value);

  return () => ctx.revert();
});
</script>

<template>
  <section ref="sectionRef" class="building-section">
    <div class="inner-container">
      
      <!-- Left Column -->
      <div class="left-col">
        <div ref="leftContentRef">
          <p class="tagline">PARTNER SUCCESS</p>
          <h2 class="heading">
            Building Empires, One<br/>Block at a Time.
          </h2>
        </div>

        <!-- Quote Card -->
        <div ref="quoteCardRef" class="quote-card">
          <div class="quote-icon">
            <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <p class="quote-text">
            "Apex Realty doubled their quarterly volume in 6 months using Roffr's Smart Matching. The transparency in lead origin and payout timing is unprecedented in the market."
          </p>
          <div class="author-info">
            <!-- Professional portrait replacement -->
            <img class="author-img" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" alt="Maràus Thorne" />
            <div class="author-text">
              <p class="author-name">Maràus Thorne</p>
              <p class="author-title">CEO, Apex Realty Group</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column (Masonry-like grid view) -->
      <div class="right-col">
        
        <!-- Left Sub-column -->
        <div class="grid-sub-col">
          <!-- 114% Card -->
          <div class="stat-card" :ref="el => { if (el) rightItemsRef[0] = el }">
            <h3 class="stat-value text-indigo-accent">114%</h3>
            <p class="stat-label">REVENUE GROWTH</p>
          </div>
          
          <!-- Interior Image -->
          <div class="img-wrapper" :ref="el => { if (el) rightItemsRef[1] = el }">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" alt="Modern interior office" class="grid-img h-interior" />
          </div>
        </div>

        <!-- Right Sub-column -->
        <div class="grid-sub-col top-offset">
          <!-- Skyscraper Image -->
          <div class="img-wrapper" :ref="el => { if (el) rightItemsRef[2] = el }">
            <img src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=800&auto=format&fit=crop" alt="Modern architectural building looking up" class="grid-img h-skyscraper" />
          </div>
          
          <!-- 4.8/5 Rating Text (No background) -->
          <div class="rating-block" :ref="el => { if (el) rightItemsRef[3] = el }">
            <h3 class="stat-value text-white">4.8/5</h3>
            <p class="stat-label">PARTNER RATING</p>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Main Section ── */
.building-section {
  background-color: #1A1B1E; /* Very dark charcoal to match screenshot */
  padding: 8rem 1.5rem;
  font-family: 'Outfit', sans-serif;
  color: #ffffff;
}

.inner-container {
  max-width: 1150px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
}

@media (min-width: 1024px) {
  .inner-container {
    grid-template-columns: 1.15fr 1fr; /* Exact proportion for left-heavy balance */
    gap: 6rem;
    align-items: center;
  }
}

/* ── Typography & Left Column ── */
.left-col {
  display: flex;
  flex-direction: column;
}

.tagline {
  font-family: 'Urbanist', sans-serif;
  color: #A5B4FC; /* Beautiful soft purple/indigo */
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.heading {
  font-family: 'Urbanist', sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 3.5rem;
  color: #ffffff;
}

/* ── Quote Card ── */
.quote-card {
  background-color: #212226; /* Darker elevation for card */
  border: 1px solid #32353B; /* Subtle border */
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

@media (min-width: 1024px) {
  .quote-card {
    padding: 3.25rem 3.5rem;
  }
}

.quote-icon {
  color: #ffffff;
  margin-bottom: 1.5rem;
}

.quote-text {
  font-size: clamp(1.2rem, 2vw, 1.35rem);
  color: #E2E4E9;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  font-weight: 400;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.author-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-family: 'Urbanist', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: #ffffff;
  margin: 0 0 0.15rem 0;
}

.author-title {
  font-size: 0.85rem;
  color: #8C92A0; /* Muted gray for title */
  margin: 0;
}

/* ── Right Column Grid Layout ── */
.right-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: start;
}

.grid-sub-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Stagger right sub-column down slightly on desktop for true masonry effect */
@media (min-width: 1024px) {
  .top-offset {
    margin-top: 1rem;
  }
}

/* ── Grid Elements ── */
.stat-card {
  background-color: #212226;
  border: 1px solid #32353B;
  border-radius: 8px;
  padding: 2.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.rating-block {
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-value {
  font-family: 'Urbanist', sans-serif;
  font-size: clamp(2rem, 3vw, 2.75rem);
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  line-height: 1;
}

.text-indigo-accent {
  color: #C4B5FD; /* Soft purple from screenshot */
}

.text-white {
  color: #ffffff;
}

.stat-label {
  font-family: 'Urbanist', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: #9CA3AF; /* Muted uppercase text */
  letter-spacing: 0.1em;
  margin: 0;
}

/* ── Images ── */
.img-wrapper {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.grid-img {
  width: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
}

.img-wrapper:hover .grid-img {
  transform: scale(1.05); /* Smooth modern hover scale */
}

/* Fixed aspect ratios for masonry */
.h-interior {
  height: 280px;
}

.h-skyscraper {
  height: 400px;
}

@media (max-width: 640px) {
  .h-interior { height: 200px; }
  .h-skyscraper { height: 260px; }
}
</style>
