<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NtpcSection from './NtpcSection.vue';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const titleRef = ref(null);
const listItemsRef = ref([]);
const rightImagesRef = ref(null);

onMounted(() => {
  const ctx = gsap.context(() => {
    // Title Animation
    gsap.fromTo(titleRef.value,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true }
      }
    );

    // Features Stagger Animation
    gsap.fromTo(listItemsRef.value,
      { opacity: 0, x: -20 },
      { 
        opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true }
      }
    );

    // Stagger right images scaling in
    gsap.fromTo(rightImagesRef.value.children,
      { opacity: 0, scale: 0.85, y: 40 },
      { 
        opacity: 1, scale: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.3,
        scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true }
      }
    );
  }, sectionRef.value);

  return () => ctx.revert();
});
</script>

<template>
  <section ref="sectionRef" class="high-value-section">
    <div class="inner-container">
      
      <!-- Left Content Column -->
      <div class="left-col">
        <h2 ref="titleRef" class="main-title">
          Secure High-Value Real Estate Investments with Collective Buying Power
        </h2>

        <div class="features-list">
          
          <!-- Feature 1 -->
          <div :ref="el => { if (el) listItemsRef[0] = el }" class="feature-item">
            <div class="icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <div class="feature-content">
              <h3 class="feature-title">Bulk Buying Advantage</h3>
              <p class="feature-desc">
                Unlock developer discounts up to 15-20% below market rate by committing to volume acquisitions.
              </p>
            </div>
          </div>

          <!-- Feature 2 -->
          <div :ref="el => { if (el) listItemsRef[1] = el }" class="feature-item">
            <div class="icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 13l-4 4-4-4 4-4 4 4z"></path>
                <path d="M14 13l6-6-3-3-6 6"></path>
                <path d="M8 19l-2 2-2-2 2-2"></path>
              </svg>
            </div>
            <div class="feature-content">
              <h3 class="feature-title">Transparent Tender Process</h3>
              <p class="feature-desc">
                Proprietary reverse-auction bidding ensures developers compete to provide you the best value terms.
              </p>
            </div>
          </div>

          <!-- Feature 3 -->
          <div :ref="el => { if (el) listItemsRef[2] = el }" class="feature-item">
            <div class="icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
            </div>
            <div class="feature-content">
              <h3 class="feature-title">Zero Brokerage</h3>
              <p class="feature-desc">
                Direct institutional procurement removes intermediary costs, saving millions in transaction fees.
              </p>
            </div>
          </div>

        </div>
      </div>

      <!-- Right Image Composition Column -->
      <div class="right-col">
        <div ref="rightImagesRef" class="image-composition">
          <!-- Top Left Floating Image -->
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" 
            alt="Dashboard Placeholder" 
            class="float-img img-dashboard" 
          />
          <!-- Bottom Right Blueprint Image -->
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
            alt="Asset Block Placeholder" 
            class="float-img img-blueprint" 
          />
        </div>
      </div>

    </div>
  </section>

  <!-- Nested NTPC Spotlight Block component -->
  <NtpcSection />
</template>

<style scoped>
/* ── Main Layout ── */
.high-value-section {
  background-color: #F8F9FA; /* Off-white base matching screenshot */
  padding: 8rem 1.5rem;
  font-family: 'Outfit', sans-serif;
  overflow: hidden;
}

.inner-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .inner-container {
    grid-template-columns: 1fr 1fr; /* Split down the middle */
    gap: 6rem;
  }
}

/* ── Left Column Content ── */
.left-col {
  display: flex;
  flex-direction: column;
}

.main-title {
  font-family: 'Urbanist', sans-serif;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 800; /* Extra bold */
  color: #111827;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin: 0 0 4rem 0;
  max-width: 550px;
  will-change: transform, opacity;
}

/* ── Features List ── */
.features-list {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  will-change: transform, opacity;
}

.icon-box {
  background-color: #F3F4F6; /* Extremely soft gray square */
  width: 52px;
  height: 52px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-title {
  font-family: 'Urbanist', sans-serif;
  font-size: 1.15rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 0.5rem 0;
}

.feature-desc {
  font-size: 0.95rem;
  color: #6B7280;
  line-height: 1.6;
  margin: 0;
  max-width: 450px;
}

/* ── Right Column Composition ── */
.right-col {
  display: flex;
  justify-content: flex-end; /* Align right */
  align-items: center;
}

.image-composition {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 500px; /* Force a canvas height for absolutely positioned elements */
}

/* Base styling for the layered UI mockups */
.float-img {
  position: absolute;
  border-radius: 12px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15), 0 10px 15px rgba(0, 0, 0, 0.05); /* Premium drop shadow */
  background-color: #111827; /* Dark background loading backup */
  will-change: transform, opacity;
}

/* Left floating blue dashboard chart */
.img-dashboard {
  top: 10%;
  left: 0;
  width: 60%;
  aspect-ratio: 4/3;
  object-fit: cover;
  z-index: 10;
  /* Optional: Tilted rotation just like the mockups often use */
  transform-origin: center right;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Right architectural blueprint overlay */
.img-blueprint {
  bottom: 0;
  right: 0;
  width: 65%;
  aspect-ratio: 4/5;
  object-fit: cover;
  z-index: 20;
  border: 4px solid #111827; /* Dark frame matching screenshot aesthetic */
}

/* Responsive Overrides */
@media (max-width: 1024px) {
  .right-col {
    justify-content: center;
  }
  
  .image-composition {
    height: 400px; /* Compress the frame slightly manually based on mobile aspect ratio */
  }
  
  .img-dashboard {
    top: 5%;
  }
}

@media (max-width: 640px) {
  .feature-item {
    gap: 1.25rem;
  }
  
  .image-composition {
    height: 320px;
  }
}
</style>
