<script setup>
import { onMounted, onBeforeUnmount, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const dev = [
  "Community buying power",
  "Verified property",
  "Verified expert",
  "Community investment benefits",
  "Upto 20% negtiotion discount ",
];

let tl = null;

onMounted(async () => {
  await nextTick();

  // intro lines animation
  gsap.set([".line-1-wrap", ".line-2-wrap", ".line-3-wrap"], {
    opacity: 0,
    y: 30,
  });

  tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

  tl
    .to(".line-1-wrap", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    })
    .to(".line-2-wrap", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.6,
    })
    .to(".line-3-wrap", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.6,
    })
    .to(
      [".line-1-wrap", ".line-2-wrap", ".line-3-wrap"],
      {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: "power2.in",
        delay: 0.8,
        onComplete: () => {
          gsap.set(
            [".line-1-wrap", ".line-2-wrap", ".line-3-wrap"],
            { y: 30 }
          );
        },
      }
    );

  // horizontal scroll + tilt
  const outer = document.querySelector(".marquee-outer");
  const inner = document.querySelector(".marquee-inner");

  if (!outer || !inner) return;

  const containerWidth = outer.offsetWidth;
  const contentWidth = inner.scrollWidth;
  const baseScrollDistance = contentWidth - containerWidth;
  const animationDistance = Math.max(baseScrollDistance, containerWidth * 0.4);

  // static tilt for the whole strip
  gsap.set(outer, {
    rotate: -3, // tweak angle as you like
    transformOrigin: "center center",
  });

  // scroll‑linked translation for inner content
  gsap.set(inner, {
    x: -animationDistance / 2,
  });

  gsap.to(inner, {
    x: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".marquee-outer",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
});

onBeforeUnmount(() => {
  if (tl) tl.kill();
});
</script>

<template>
  <section class="py-20 pt-28 overflow-hidden">
    <div
      class="max-w-7xl mx-auto px-4 2xl:px-0 text-center space-y-1 overflow-hidden"
    >
      <p class="title-text text-center line-1-wrap">
        One buyer. <span class="ml-2">No power.</span>
      </p>

      <p class="title-text text-center line-2-wrap">
        Ten buyers. <span class="ml-2">Some power.</span>
      </p>

      <p class="title-text text-center text-orange-600 line-3-wrap">
        One hundred buyers? <span class="ml-2">UNSTOPPABLE.</span>
      </p>
    </div>

    <!-- tilted horizontal strip -->
    <div class="bg-orange-600 py-4 mt-10 marquee-outer overflow-hidden">
      <Vue3Marquee :clone="true">
        <div class="flex marquee-inner items-center">
          <div
            v-for="item in dev"
            :key="item"
            class="text-white font-outfit font-semibold text-[24px] mr-6 flex items-center"
          >
            <p>{{ item }}</p>

            <!-- reserved space for future image -->
            <div
              class="inline-block w-[60px] ml-6"
            >
              <img src="/svg/Global/icon.svg" class="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </Vue3Marquee>
    </div>
  </section>
</template>
