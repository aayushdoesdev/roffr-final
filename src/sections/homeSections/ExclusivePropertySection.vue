<script setup>
import AnimatedTitle from "@/components/AnimatedTitle.vue";
</script>

<template>
    <section class="bg-[#FFEEE9] py-10 mt-10 px-4 xl:px-0">
        <div class="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
            <div class="w-full md:w-1/2">
                <div class="w-[70%] mx-auto">
                    <img src="/images/HomePage/exclusiveSection/exclusive-img.png" alt="">
                </div>
            </div>
            <div class="w-full md:w-1/2">
                <AnimatedTitle text="Top Exclusive Properties" customClass="font-marcellus text-[25px]" />
                <p class="font-inter mt-4">Book a Visit now and get the Biggest offer on Exclusive Properties.</p>

                <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="flex items-center gap-1">
                        <i class="pi pi-check bg-white p-2 rounded-full text-[12px]"></i>
                        <p>100% Secure</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <i class="pi pi-check bg-white p-2 rounded-full text-[12px]"></i>
                        <p>Wide Range of Properties</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <i class="pi pi-check bg-white p-2 rounded-full text-[12px]"></i>
                        <p>Buy or Rent Homes</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <i class="pi pi-check bg-white p-2 rounded-full text-[12px]"></i>
                        <p>Trusted by Thousands</p>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

