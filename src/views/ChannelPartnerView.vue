<script setup>
import GsapFade from '@/components/GsapFade.vue'

import HeroSection from '@/sections/channelPartnerSection2/HeroSection.vue';
import BestCrmSection from '@/sections/channelPartnerSection2/BestCrmSection.vue';
import ProcisionSection from '@/sections/channelPartnerSections/ProcisionSection.vue';
import BuldingSection from '@/sections/channelPartnerSections/buldingSection.vue';
import OfferingSection from '@/sections/channelPartnerSections/OfferingSection.vue';
</script>

<template>
  <main>
    <GsapFade direction="bottom" :duration="0.7" :triggerOffset="120">
      <HeroSection />
    </GsapFade>

    <GsapFade direction="bottom" :duration="0.7" :triggerOffset="120">
      <BestCrmSection />
    </GsapFade>

    <GsapFade direction="bottom" :duration="0.7" :triggerOffset="120">
      <ProcisionSection />
    </GsapFade>

    <GsapFade direction="bottom" :duration="0.7" :triggerOffset="120">
      <BuldingSection />
    </GsapFade>

    <GsapFade direction="bottom" :duration="0.7" :triggerOffset="120">
      <OfferingSection />
    </GsapFade>
  </main>
</template>
