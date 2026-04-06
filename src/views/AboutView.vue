<script setup>
import GsapFade from '@/components/GsapFade.vue'

import HeroSection from '@/sections/aboutSection2/HeroSection.vue'
import PowerSection from '@/sections/aboutSection2/PowerSection.vue'
import CorePillars from '@/sections/aboutSection2/The Core Pillars.vue'
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
      <CorePillars />
    </GsapFade>

  </main>
</template>
