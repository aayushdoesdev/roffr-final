<script setup>
import GsapFade from '@/components/GsapFade.vue'

import HeroSection from '@/sections/aboutSection2/HeroSection.vue'
import PowerSection from '@/sections/aboutSection2/PowerSection.vue'
import WhyChooseSection from '@/sections/aboutSection2/WhyChooseSection.vue'
import UnbeatableDealsSection from '@/sections/homeSections/UnbeatableDealsSection.vue';
import WorkSection from '@/sections/homeSections/WorkSection.vue';
</script>

<template>
  <main>
    <GsapFade direction="bottom" :duration="0.7" :triggerOffset="120">
      <HeroSection />
    </GsapFade>

    <GsapFade direction="bottom" :duration="0.7" :triggerOffset="120">
      <PowerSection />
    </GsapFade>

    <GsapFade direction="bottom" :duration="0.7" :triggerOffset="120">
      <WhyChooseSection />
    </GsapFade>

    <GsapFade direction="bottom" :duration="0.7" :triggerOffset="120">
      <UnbeatableDealsSection />
    </GsapFade>

    <GsapFade direction="bottom" :duration="0.7" :triggerOffset="120">
      <WorkSection />
    </GsapFade>
  </main>
</template>
