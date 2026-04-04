<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';

const sectionRef = ref(null);
const leftContentRef = ref(null);
const rightImageRef = ref(null);
const floatingCardRef = ref(null);

onMounted(() => {
  const ctx = gsap.context(() => {
    // 1. Left side content stagger animation
    gsap.fromTo(leftContentRef.value.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.1 }
    );
    
    // 2. Main Right Image fade and scale in
    gsap.fromTo(rightImageRef.value,
      { opacity: 0, scale: 0.96, x: 20 },
      { opacity: 1, scale: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.3 }
    );

    // 3. Floating progress card pop up over the image
    gsap.fromTo(floatingCardRef.value,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.4)", delay: 0.8 }
    );
  }, sectionRef.value);

  return () => ctx.revert();
});
</script>

<template>
  <section ref="sectionRef" class="hero-section">
    <div class="inner-container">
      
      <!-- Left Column: Content -->
      <div ref="leftContentRef" class="left-col">
        <div class="tag-wrapper">
          <span class="tag">INSTITUTIONAL GRADE STRATEGY</span>
        </div>
        
        <h1 class="main-heading">
          <span class="block">GROUP BUYING:</span>
          <span class="block mt-1">The Smarter Way</span>
          <span class="block mt-1">to Buy Your Home</span>
        </h1>
        
        <p class="subtitle mt-5">
          Join elite buyer cohorts to bypass retail margins. We leverage 
          institutional-scale negotiation to unlock pricing previously reserved 
          for major developers.
        </p>
        
        <!-- Stats Row -->
        <div class="stats-container">
          <div class="stat-item">
            <h3 class="stat-value">12-18%</h3>
            <p class="stat-label">AVERAGE SAVINGS</p>
          </div>
          
          <div class="stat-divider"></div>
          
          <div class="stat-item">
            <h3 class="stat-value">400+</h3>
            <p class="stat-label">ACTIVE INVESTORS</p>
          </div>
          
          <div class="stat-divider"></div>
          
          <div class="stat-item">
            <h3 class="stat-value">$1.2B</h3>
            <p class="stat-label">ASSET PORTFOLIO</p>
          </div>
        </div>
        
        <!-- Buttons Row -->
        <div class="btns-container">
          <button class="btn btn-dark">Explore Active Pools</button>
          <button class="btn btn-light">View Case Studies</button>
        </div>
      </div>

      <!-- Right Column: Visual -->
      <div class="right-col">
        <div ref="rightImageRef" class="image-wrapper">
          <!-- Premium modern architecture photo matching the design tone -->
          <img 
            src="/images/GroupBuy/hero.webp" 
            alt="Modern architectural building looking up at the sky" 
            class="hero-img"
          />
          
          <!-- Floating Progress Card -->
          <div ref="floatingCardRef" class="floating-card">
            <div class="fc-header">
              <h4 class="fc-title">Pool #812 - Midtown</h4>
              <span class="fc-percent">92% Full</span>
            </div>
            <!-- Progress Bar -->
            <div class="progress-track">
              <div class="progress-fill"></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Main Layout ── */
.hero-section {
  background-color: #F8F9FA; /* Off-white / light gray matching screenshot */
  padding: 8rem 1.5rem 6rem 1.5rem;
  font-family: 'Outfit', sans-serif;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .hero-section {
    padding: 10rem 1.5rem 8rem 1.5rem;
  }
}

.inner-container {
  max-width: 1150px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .inner-container {
    grid-template-columns: 1.1fr 0.9fr; /* Left slightly wider */
    gap: 6rem;
  }
}

/* ── Left Column Elements ── */
.left-col {
  display: flex;
  flex-direction: column;
}

.tag-wrapper {
  margin-bottom: 1.5rem;
}

.tag {
  display: inline-block;
  background-color: #E2E1FB; /* Very light purple block */
  color: #6C55FF; /* Vibrant purple text */
  font-family: 'Urbanist', sans-serif;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.4rem 0.6rem;
  text-transform: uppercase;
  border-radius: 2px;
}

.main-heading {
  font-family: 'Urbanist', sans-serif;
  font-size: clamp(2.5rem, 4.5vw, 4rem);
  line-height: 1.05;
  color: #111827;
  letter-spacing: -0.02em;
  margin: 0;
}

.block {
  display: block;
}

.mt-1 {
  margin-top: 0.25rem;
}

.mt-5 {
  margin-top: 1.25rem;
}

.subtitle {
  font-size: clamp(1rem, 1.5vw, 1.1rem);
  color: #6B7280; /* Soft gray for high legibility */
  line-height: 1.6;
  max-width: 480px;
  margin-bottom: 0;
}

/* ── Stats Row ── */
.stats-container {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-family: 'Urbanist', sans-serif;
  font-size: clamp(1.5rem, 2vw, 2rem);
  font-weight: 800;
  color: #111827;
  line-height: 1.1;
  margin: 0 0 0.25rem 0;
}

.stat-label {
  font-family: 'Urbanist', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  color: #9CA3AF;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0;
}

.stat-divider {
  width: 1px;
  height: 35px;
  background-color: #E5E7EB; /* Subtle vertical line divider */
}

/* ── Buttons ── */
.btns-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  font-family: 'Urbanist', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 1.1rem 1.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
}

.btn-dark {
  background-color: #1A1D20;
  color: #ffffff;
}

.btn-dark:hover {
  background-color: #2D3339;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.btn-light {
  background-color: #E8EAEF;
  color: #111827;
}

.btn-light:hover {
  background-color: #D1D5DB;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

/* ── Right Column / Hero Image ── */
.right-col {
  position: relative;
  display: flex;
  justify-content: center;
}

.image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 2px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15); /* Strong premium drop shadow */
  background-color: #e5e7eb;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
}

/* ── Floating Card overlaying the image ── */
.floating-card {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  right: 2rem;
  background-color: rgba(245, 245, 248, 0.95); /* Off-white slightly blurred glass effect */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1.25rem 1.5rem;
  border-radius: 4px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.fc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.65rem;
}

.fc-title {
  font-family: 'Urbanist', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.fc-percent {
  font-family: 'Urbanist', sans-serif;
  font-size: 0.9rem;
  font-weight: 800;
  color: #111827;
  margin: 0;
}

.progress-track {
  width: 100%;
  height: 6px;
  background-color: #D1D5DB;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  width: 92%; /* 92% Full */
  background-color: #111827;
  border-radius: 3px;
}

/* Responsive Overrides */
@media (max-width: 768px) {
  .stats-container {
    flex-wrap: wrap;
    gap: 1.5rem;
  }
  
  .stat-divider {
    display: none; /* remove dividers on mobile wrapping */
  }

  .floating-card {
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
  }

  .btns-container {
    width: 100%;
    flex-direction: column;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>
