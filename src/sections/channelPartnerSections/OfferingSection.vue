<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const titleRef = ref(null);
const subtitleRef = ref(null);
const buttonsRef = ref(null);

onMounted(() => {
  const ctx = gsap.context(() => {
    // Reveal timeline for content
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        once: true
      }
    });

    tl.fromTo(titleRef.value,
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.55' // overlap with title
    )
    .fromTo(buttonsRef.value.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
      '-=0.45' // overlap with subtitle
    );

  }, sectionRef.value);

  return () => ctx.revert();
});
</script>

<template>
  <section ref="sectionRef" class="cta-section">
    <!-- Dark Architectural Background -->
    <div class="bg-wrapper">
      <div class="overlay"></div>
      <!-- Architectural interior image matching the dark structural theme -->
      <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop" alt="Architectural Background" class="bg-img" />
    </div>

    <!-- Main Content -->
    <div class="content">
      <h2 ref="titleRef" class="title">Ready to redesign your trajectory?</h2>
      <p ref="subtitleRef" class="subtitle">
        Join the world's most sophisticated real estate network. Precision starts with the first click.
      </p>
      
      <!-- CTA Buttons -->
      <div ref="buttonsRef" class="btn-group">
        <button class="btn btn-primary">APPLY FOR PARTNERSHIP</button>
        <button class="btn btn-secondary">SPEAK TO A MANAGER</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Main Section ── */
.cta-section {
  position: relative;
  min-height: 550px;
  padding: 8rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #0A0A0C; /* Base dark color fallback */
}

/* ── Background & Overlay ── */
.bg-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: grayscale(70%) contrast(1.1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Dark rich gradient mimicking the screenshot overlay */
  background: radial-gradient(circle at center, rgba(15, 15, 18, 0.75) 0%, rgba(10, 10, 12, 0.95) 100%);
  z-index: 2;
}

/* ── Content ── */
.content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 850px;
  width: 100%;
}

.title {
  font-family: 'Urbanist', sans-serif;
  font-size: clamp(2.25rem, 5vw, 4rem);
  font-weight: 800; /* Bold chunky text matching UI */
  color: #ffffff;
  letter-spacing: -0.03em;
  margin-bottom: 1.25rem;
  line-height: 1.1;
  will-change: transform, opacity;
}

.subtitle {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(1.05rem, 2vw, 1.25rem);
  color: #D1D5DB; /* Muted light gray */
  margin-bottom: 3.5rem;
  line-height: 1.6;
  font-weight: 300;
  will-change: transform, opacity;
}

/* ── Buttons ── */
.btn-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  will-change: transform, opacity;
}

.btn {
  font-family: 'Urbanist', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 1.25rem 2.5rem;
  border-radius: 8px; /* Smooth rounded corners */
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
}

.btn-primary {
  background-color: #ffffff;
  color: #111827; /* Dark black text */
  border: 1px solid #ffffff;
}

.btn-primary:hover {
  background-color: #f3f4f6;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.15);
}

.btn-secondary {
  background-color: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.05); /* Slight fill on hover */
  border-color: rgba(255, 255, 255, 0.6);
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

/* ── Responsive Mobile ── */
@media (max-width: 640px) {
  .btn-group {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 0 1.5rem;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
