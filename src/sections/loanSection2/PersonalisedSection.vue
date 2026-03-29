<script setup>
const deals = [
  {
    id: 1,
    title: "Private Employees",
    desc: "Discover home loan offers for private employees with attractive rates and quick approval.",
    img: "https://img.freepik.com/free-photo/hispanic-male-executive-gesturing-copy-space-while-making-eye-contact-studio_662251-786.jpg"
  },
  {
    id: 2,
    title: "Government Employees",
    desc: "Build your dream home with an easy and affordable home loan for government employees.",
    img: "https://img.freepik.com/free-photo/medium-shot-young-pastor-preaching_23-2149366611.jpg"
  },
  {
    id: 3,
    title: "Cash income With Irregular ITR",
    desc: "Don't let your irregular cash income stop you from owning a home. Check out your home loan options now.",
    img: "https://img.freepik.com/free-photo/young-adult-organizing-documents_23-2149396630.jpg"
  },
  {
    id: 4,
    title: "Self-Employed With ITR",
    desc: "Unlock your perfect home with an attractive loan offer that is personalized for your needs.",
    img: "https://img.freepik.com/free-photo/portrait-indian-man-selling-fabrics_23-2150913262.jpg"
  }
]
</script>

<template>
  <section class="max-w-7xl mx-auto py-10 px-4 2xl:px-0">
    <div class="text-center mb-8">
      <h1 class="title-text">Personalized deals for everyone</h1>
      <p class="font-outfit">
        Explore the home loan options that best match your requirements
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div
        v-for="deal in deals"
        :key="deal.id"
        class="font-outfit"
      >
        <!-- Fixed-size image wrapper -->
        <div class="w-full aspect-video rounded-xl overflow-hidden">
          <img
            :src="deal.img"
            :alt="deal.title"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="mt-4">
          <p class="font-semibold mb-1">
            {{ deal.title }}
          </p>
          <p class="text-sm text-black/70">
            {{ deal.desc }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
