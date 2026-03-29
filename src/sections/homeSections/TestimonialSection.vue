<script setup>
import AnimatedTitle from "@/components/AnimatedTitle.vue";

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    title: 'Excellent service',
    text:
      'Roffr has transformed my living experience. The staff is always attentive and the community is warm and welcoming.',
    image: 'https://plus.unsplash.com/premium_photo-1682098109069-0e49e3b42884?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGluZGlhbiUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600'
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    title: 'Great amenities',
    text:
      'The amenities here are top-notch. I especially love the gym and the rooftop garden. It feels like a true home.',
    image: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600'
  },
  {
    id: 3,
    name: 'Ananya Patel',
    title: 'Friendly neighbors',
    text:
      'The community events and friendly neighbors make Roffr a wonderful place to live. I feel safe and happy here.',
    image: 'https://plus.unsplash.com/premium_photo-1681483544221-e04d719060ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGluZGlhbiUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600'
  },
  {
    id: 4,
    name: 'Vikram Singh',
    title: 'Peaceful environment',
    text:
      'The peaceful environment and well-maintained facilities make Roffr a perfect choice for families.',
    image: 'https://images.unsplash.com/photo-1637589274892-9bc2d5200eab?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kaWFuJTIwcGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600'
  }
];


</script>

<template>
  <section class="max-w-7xl mx-auto font-lato py-10 px-4 xl:px-0">
    <div class="text-center">
      <AnimatedTitle text="What Our Customers Say" customClass="title-text" />
    </div>

    <Vue3Marquee :clone="true">
      <div class="mt-20 flex">
        <div
          v-for="item in testimonials"
          :key="item.id"
          class="border border-black/20 rounded-md p-4 max-w-[400px] mr-6"
        >
          <div class="flex items-start gap-2">
            <div class=" rounded-full">
              <img :src="item.image" alt="" class="object-cover h-[60px] w-[60px] rounded-full">
            </div>
            <div>
              <p class="font-semibold text-[20px]">{{ item.name }}</p>
            </div>
          </div>

          <div class="mt-4 space-y-1">
            <p class="font-semibold">{{ item.title }}</p>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
    </Vue3Marquee>


    <Vue3Marquee :direction="'reverse'" :clone="true">
      <div class="mt-10 flex">
        <div
          v-for="item in testimonials"
          :key="item.id"
          class="border border-black/20 rounded-md p-4 max-w-[400px] mr-6"
        >
          <div class="flex items-start gap-2">
            <div class=" rounded-full">
              <img :src="item.image" alt="" class="object-cover h-[60px] w-[60px] rounded-full">
            </div>
            <div>
              <p class="font-semibold text-[20px]">{{ item.name }}</p>
            </div>
          </div>

          <div class="mt-4 space-y-1">
            <p class="font-semibold">{{ item.title }}</p>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
    </Vue3Marquee>
  </section>
</template>
