<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';

const sectionRef = ref(null);
const cardsRef = ref([]);

onMounted(() => {
  // Use Intersection Observer to trigger GSAP animation once it scrolls into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.fromTo(cardsRef.value, 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' }
        );
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});
</script>

<template>
  <section ref="sectionRef" class="bg-[#F8F9FB] py-16 md:py-24 px-4 lg:px-12 xl:px-24 2xl:px-0">
    <div class="max-w-7xl mx-auto w-full">
      
      <!-- Header row -->
      <div class="mb-14 flex flex-col md:flex-row md:items-end gap-6 relative">
        <div class="shrink-0 relative z-10 pr-6 bg-[#F8F9FB]">
          <h2 class="font-urbanist font-extrabold text-[#111111] text-[36px] md:text-[44px] leading-tight tracking-[-0.01em]">The ROFFR Edge</h2>
          <p class="font-outfit text-[#686868] text-sm md:text-base mt-1">Digital-first tools for the modern real estate titan.</p>
        </div>
        <!-- Decorative subtle line connecting to header text -->
        <div class="absolute left-[380px] right-0 bottom-4 h-[1px] bg-gray-200 hidden md:block"></div>
      </div>

      <!-- Bento Grid structure -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        
        <!-- Block 1: Verified Leads (Span 2) -->
        <div :ref="el => { if (el) cardsRef[0] = el }" class="lg:col-span-2 bg-white rounded-2xl p-8 pb-0 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] min-h-[350px] overflow-hidden relative opacity-0">
          <div class="z-10 relative pr-4">
            <div class="mb-5 text-[#111111]">
               <!-- Verified icon placeholder -->
               <i class="pi pi-verified text-2xl"></i>
            </div>
            <h3 class="font-urbanist font-bold text-xl md:text-[25px] text-[#111111] mb-4 leading-[1.2]">Verified Leads & Lifetime Tagging</h3>
            <p class="font-outfit text-[#595959] text-sm md:text-[15px] leading-[1.6] max-w-[360px]">Stop chasing cold contacts. Every lead is verified through our proprietary AI vetting process and tagged to your account for the lifetime of their journey.</p>
          </div>
          <!-- Dark chart visualization -->
          <div class="mt-8 mx-auto w-full max-w-[85%] relative flex border-t border-l border-r border-[#3A3C44] rounded-t-lg overflow-hidden translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
             <!-- Using an Unsplash chart image -->
             <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" class="w-full h-32 md:h-40 object-cover object-top opacity-90 saturate-50 contrast-125" alt="Analytics Chart" />
          </div>
        </div>

        <!-- Block 2: Sales & Marketing -->
        <div :ref="el => { if (el) cardsRef[1] = el }" class="bg-white rounded-2xl p-8 flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.02)] min-h-[350px] opacity-0">
          <div class="mb-5 text-[#111111]">
             <i class="pi pi-headphones text-2xl"></i>
          </div>
          <h3 class="font-urbanist font-bold text-xl md:text-[23px] text-[#111111] mb-4 leading-[1.2]">Sales & Marketing<br>Support</h3>
          <p class="font-outfit text-[#595959] text-sm md:text-[15px] leading-[1.6] mt-auto mb-4">Access premium collateral, white-labeled brochures, and 24/7 dedicated account managers to help you close larger mandates.</p>
        </div>

        <!-- Block 3: Smart Matching Tools (Dark) -->
        <div :ref="el => { if (el) cardsRef[2] = el }" class="bg-[#18191E] rounded-2xl p-8 flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.08)] min-h-[350px] opacity-0">
          <div class="mb-5 text-white">
             <i class="pi pi-share-alt text-2xl"></i>
          </div>
          <h3 class="font-urbanist font-bold text-xl md:text-[23px] text-white mb-4 leading-[1.2]">Smart Matching Tools</h3>
          <p class="font-outfit text-[#A0A0A0] text-sm md:text-[15px] leading-[1.6] mt-auto mb-4">Our neural network matches buyers to inventory based on over 150 architectural and financial parameters.</p>
        </div>

        <!-- Block 4: Transparent Commission -->
        <div :ref="el => { if (el) cardsRef[3] = el }" class="bg-white rounded-2xl p-8 flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.02)] min-h-[350px] opacity-0">
          <div class="mb-5 text-[#111111]">
             <i class="pi pi-wallet text-2xl"></i>
          </div>
          <h3 class="font-urbanist font-bold text-xl md:text-[23px] text-[#111111] mb-4 leading-[1.2]">Transparent<br>Commission</h3>
          <p class="font-outfit text-[#595959] text-sm md:text-[15px] leading-[1.6] mt-auto mb-4">No hidden fees. Real-time payout tracking through your partner dashboard with instant approval on milestones.</p>
        </div>

        <!-- Block 5: Digital Outreach (Span 3) -->
        <div :ref="el => { if (el) cardsRef[4] = el }" class="lg:col-span-3 bg-[#E4E6EB] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row shadow-[0_4px_24px_rgba(0,0,0,0.02)] min-h-[350px] overflow-hidden relative opacity-0">
          
          <div class="flex flex-col relative z-20 w-full md:w-1/2">
            <div class="mb-5 text-[#111111]">
               <i class="pi pi-sign-in text-2xl"></i>
            </div>
            <h3 class="font-urbanist font-bold text-[24px] md:text-[28px] text-[#111111] mb-4">Digital Outreach Tools</h3>
            <p class="font-outfit text-[#595959] text-sm md:text-[15px] leading-[1.6] max-w-[340px] mb-8">Automated CRM integrations and API-first marketing tools that put your brand at the center of the conversation across social and search platforms.</p>
            
            <a href="#" class="font-inter font-bold text-[#111111] text-[13px] tracking-wide flex items-center gap-2 hover:opacity-70 transition-opacity uppercase mt-auto w-fit group">
              Explore the Toolkit 
              <i class="pi pi-arrow-right text-xs bg-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>

          <!-- Tilted Image Frame on the right -->
          <div class="w-full md:w-1/2 relative mt-16 md:mt-0 flex justify-center md:block pointer-events-none z-10">
             <div class="w-[280px] h-[280px] md:w-[320px] md:h-[320px] bg-white rounded-xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] p-[10px] md:p-[14px] absolute right-auto md:right-[-40px] lg:right-4 top-[-20px] md:top-[-60px] lg:top-[-40px] rotate-[6deg]">
               <div class="w-full h-full bg-[#111111] rounded-lg overflow-hidden relative">
                 <!-- Using an Unsplash image of digital global network -->
                 <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" class="w-full h-full object-cover opacity-90 mix-blend-screen saturate-150" alt="Digital Network" />
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Optional specific overrides if needed, Tailwind handles most */
</style>
