<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = ref([
  { number: 25, unit: "+", label: "Crore Saved" },
  { number: 150, unit: "+", label: "Buyer Empowered" },
  { number: 10, unit: "+", label: "Project Negotiated" },
  { number: 20, unit: "%", label: "Average Discount Unlocked" }
])

const countUp = (el, target) => {
  let start = 0
  const duration = 2
  const increment = target / (duration * 60)

  const updateCount = () => {
    start += increment
    if (start < target) {
      el.textContent = Math.floor(start)
      requestAnimationFrame(updateCount)
    } else {
      el.textContent = target
    }
  }
  updateCount()
}

let ctx = null

onMounted(() => {
  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: ".stats-section",
      start: "top 80%",
      onEnter: () => {
        gsap.fromTo(
          ".stats-item",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            onComplete: () => {
              document.querySelectorAll(".stat-number").forEach((el, i) => {
                setTimeout(() => countUp(el, stats.value[i].number), 200 + i * 100)
              })
            }
          }
        )
      }
    })
  })
})

onUnmounted(() => {
  if (ctx) ctx.kill()
})
</script>

<template>
  <section class="max-w-7xl mx-auto py-12 md:py-20 px-4 stats-section">
    <!-- Top text: column on mobile, row on md+ -->
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div class="w-full md:w-1/2">
        <h1 class="title-text w-full md:w-[70%] text-2xl sm:text-3xl lg:text-4xl">
          See the Power of Group Buying in Action
        </h1>
      </div>

      <div class="w-full md:w-1/2 font-outfit space-y-4 text-sm sm:text-base">
        <p>
          In India, one of the biggest regrets for homebuyers has always been
          finding out later that a neighbour or colleague bought the same house
          for less. For years, individuals paid inflated prices while bulk
          buyers and institutions enjoyed exclusive discounts.
        </p>
        <p>
          At Roffr, we're rewriting the story. By teaming up, buyers
          negotiate directly with developers, unlocking exclusive deals and
          pre-launch prices that were never available to individuals before.
        </p>
      </div>
    </div>

    <!-- Stats grid: 1 col on mobile, up to 4 on lg+ -->
    <div
      class="border-t border-black/10 mt-10 py-6
             grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center"
    >
      <div
        v-for="(stat, i) in stats"
        :key="i"
        class="stats-item text-center"
      >
        <p class="text-4xl sm:text-[40px] lg:text-[50px] font-semibold text-orange-600">
          <span class="stat-number">0</span>
          <span class="stat-unit">{{ stat.unit }}</span>
        </p>
        <p class="font-outfit text-sm sm:text-base">
          {{ stat.label }}
        </p>
      </div>
    </div>
  </section>
</template>
