<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';

const heroSection = ref(null);
const badge = ref(null);
const titleLines = ref([]);
const description = ref(null);
const stats = ref([]);
const imageFrame = ref(null);

onMounted(() => {
  // Simple GSAP Reveal Animation
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo(badge.value, 
    { opacity: 0, y: 20 }, 
    { opacity: 1, y: 0, duration: 0.6 }
  )
  .fromTo(titleLines.value,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
    "-=0.4"
  )
  .fromTo(description.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6 },
    "-=0.6"
  )
  .fromTo(stats.value,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
    "-=0.4"
  )
  .fromTo(imageFrame.value,
    { opacity: 0, scale: 0.95, x: 20 },
    { opacity: 1, scale: 1, x: 0, duration: 1 },
    "-=0.8"
  );
});
</script>

<template>
  <section ref="heroSection" class="min-h-[85vh] bg-[#F8F9FB] flex items-center pt-28 pb-16 px-6 lg:px-12 xl:px-24 2xl:px-0 relative overflow-hidden">
    <div class="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-20 items-center">
      
      <!-- Left Content -->
      <div class="flex flex-col items-start z-10 pt-10 lg:pt-0">
        <!-- Badge -->
        <div ref="badge" class="bg-[#EDEDFF] text-[#695AF6] text-[11px] md:text-xs font-bold tracking-[0.1em] px-3 md:px-4 py-1.5 md:py-2 rounded-[4px] uppercase mb-8 font-inter">
          Channel Partner Ecosystem
        </div>
        
        <!-- Main Title -->
        <h1 class="font-urbanist font-extrabold text-[#111111] text-[48px] md:text-[64px] lg:text-[72px] leading-[1.1] tracking-[-0.02em] mb-6">
          <div :ref="el => { if (el) titleLines[0] = el }" class="overflow-hidden">
            Your Shortcut to
          </div>
          <div :ref="el => { if (el) titleLines[1] = el }" class="overflow-hidden">
            Smarter Real Estate
          </div>
          <div :ref="el => { if (el) titleLines[2] = el }" class="overflow-hidden">
            Sales.
          </div>
        </h1>
        
        <!-- Description -->
        <p ref="description" class="font-outfit text-[#595959] text-sm md:text-[17px] leading-[1.6] max-w-[500px] mb-12">
          Scale your brokerage with institutional-grade data, verified high-intent leads, and a digital infrastructure designed for architectural precision.
        </p>
        
        <!-- Stats -->
        <div class="flex flex-wrap items-center gap-10 md:gap-14">
          <div :ref="el => { if (el) stats[0] = el }" class="flex flex-col">
            <span class="font-urbanist font-bold text-[32px] md:text-[40px] text-[#111111] mb-1 leading-none">4.2B+</span>
            <span class="font-outfit text-[9px] md:text-[10px] text-[#A0A0A0] font-bold tracking-[0.15em] uppercase">Portfolio Managed</span>
          </div>
          <div :ref="el => { if (el) stats[1] = el }" class="flex flex-col">
            <span class="font-urbanist font-bold text-[32px] md:text-[40px] text-[#111111] mb-1 leading-none">12k+</span>
            <span class="font-outfit text-[9px] md:text-[10px] text-[#A0A0A0] font-bold tracking-[0.15em] uppercase">Verified Agents</span>
          </div>
          <div :ref="el => { if (el) stats[2] = el }" class="flex flex-col">
            <span class="font-urbanist font-bold text-[32px] md:text-[40px] text-[#111111] mb-1 leading-none">28%</span>
            <span class="font-outfit text-[9px] md:text-[10px] text-[#A0A0A0] font-bold tracking-[0.15em] uppercase">Avg. Growth Rate</span>
          </div>
        </div>
      </div>

      <!-- Right Content - Image Frame -->
      <div class="relative w-full flex justify-center lg:justify-end z-10" ref="imageFrame">
        <!-- White Frame with Drop Shadow -->
        <div class="bg-white p-[14px] md:p-[20px] rounded-[10px] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.12)] w-full max-w-[500px] aspect-square relative">
          <!-- Inner Image Container -->
          <div class="w-full h-full bg-[#111111] overflow-hidden rounded-[4px] relative flex items-center justify-center">
            <!-- Using a high quality Unsplash geometric abstract image as placeholder -->
            <img src="/images/ChannelPage/partner-hero.webp" 
                 alt="Abstract 3D Wireframe Structure" 
                 class="w-full h-full object-cover opacity-90 mix-blend-lighten" />
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>
