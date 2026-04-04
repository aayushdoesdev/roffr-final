<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const contentRef = ref(null);

onMounted(() => {
  const ctx = gsap.context(() => {
    // Cascade load the contents upward
    gsap.fromTo(contentRef.value.children,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.value, start: 'top 85%', once: true }
      }
    );
  }, sectionRef.value);

  return () => ctx.revert();
});
</script>

<template>
  <section ref="sectionRef" class="cta-section">
    <div ref="contentRef" class="cta-content">
      <h2 class="cta-title">
        Ready to Unlock Wholesale<br class="hidden sm:block" />
        Real Estate Prices?
      </h2>
      
      <p class="cta-subtitle">
        Join 400+ investors who are already buying smarter. Your cohort is waiting.
      </p>
      
      <div class="cta-actions">
        <button class="btn btn-primary">Get Started Today</button>
        <button class="btn btn-secondary">Schedule a Consultation</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Main Layout ── */
.cta-section {
  background-color: #F8F9FA; /* Off-white base matching screenshot */
  padding: 10rem 1.5rem; /* Generous padding for breathing room */
  font-family: 'Outfit', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.cta-content {
  max-width: 800px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ── Typography ── */
.cta-title {
  font-family: 'Urbanist', sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800; /* Extra bold */
  color: #111827; /* Dark near-black */
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin: 0 0 1.5rem 0;
  will-change: transform, opacity;
}

.cta-subtitle {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(1rem, 2vw, 1.1rem);
  color: #6B7280; /* Soft gray */
  margin: 0 0 3.5rem 0;
  font-weight: 300;
  will-change: transform, opacity;
}

/* ── Actions / Buttons ── */
.cta-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  will-change: transform, opacity;
}

.btn {
  font-family: 'Urbanist', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 1.1rem 2rem;
  border-radius: 4px; /* Slight rounded corners */
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  min-width: 200px;
}

.btn-primary {
  background-color: #17181C; /* Sleek dark graphite */
  color: #ffffff;
  border: 1px solid #17181C;
  /* Notice the faint purple glow underneath the black button from the design */
  box-shadow: 0 15px 35px rgba(88, 71, 255, 0.15);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(88, 71, 255, 0.2);
  background-color: #0F1013;
}

.btn-secondary {
  background-color: #ffffff;
  color: #111827;
  border: 1px solid #E5E7EB; /* Subtle light gray border */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  border-color: #D1D5DB;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.05);
}

/* Responsive Overrides */
@media (max-width: 640px) {
  .cta-section {
    padding: 6rem 1.5rem;
  }
  
  .cta-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .btn {
    width: 100%;
    max-width: 320px; /* Constrain button width on mobile */
  }
}
</style>
