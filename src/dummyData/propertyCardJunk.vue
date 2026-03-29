<template>
    <!-- PROPERTY CARD -->
      <article
        v-for="property in filteredProjects"
        :key="property._id"
        class="relative md:min-w-[400px] md:max-w-[400px] overflow-hidden rounded-3xl bg-black text-white cursor-pointer"
        @click="redirect(property._id, 'property')"
      >
        <div class="relative h-80">
          <img
            :src="
              property.thumbnail || property.images?.[0] || property.imageUrl
            "
            :alt="
              property.propertyTitle || property.address || property.location
            "
            class="h-full w-full object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
          ></div>

          <!-- <div class="absolute top-4 left-4 flex flex-col gap-1">
            <span
              class="px-3 py-1 rounded-full text-[11px] font-medium bg-orange-100 text-orange-700"
            >
              {{ property.propertyType }} •
              {{ property.bhkConfiguration?.toUpperCase() }}
            </span>
            <span
              v-if="property.propertyStatus"
              class="px-3 py-1 rounded-full text-[11px] font-medium bg-green-100 text-green-700"
            >
              {{ property.propertyStatus }}
            </span>
          </div> -->

          <div class="absolute bottom-6 left-6">
            <h2 class="text-xl font-semibold line-clamp-1">
              {{ property.propertyTitle || "Residential property" }}
            </h2>
            <p class="text-sm text-gray-200 line-clamp-1">
              {{ property.address || property.location }}
            </p>
          </div>
        </div>

        <div class="px-6 pb-5 pt-4 bg-black">
          <div class="flex items-end justify-between mb-3">
            <div>
              <p class="text-xs text-gray-300">Asking Price</p>
              <div class="flex items-baseline gap-1">
                <span class="text-xl font-semibold">
                  {{ property.price }}
                </span>
              </div>
              <p
                v-if="property.pricePerUnit"
                class="text-xs text-gray-400 mt-1"
              >
                {{
                  "₹ " + Number(property.pricePerUnit).toLocaleString("en-IN")
                }}
                / sq.ft
              </p>
            </div>

            <button
              class="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-lg flex items-center gap-2"
              @click.stop="redirect(property._id, 'property')"
            >
              View Details
              <i class="pi pi-arrow-right text-xs"></i>
            </button>
          </div>

          <div class="space-y-1 text-xs">
            <p
              v-if="property.carpetArea || property.totalArea"
              class="text-green-400"
            >
              ●
              <span v-if="property.carpetArea">
                {{ property.carpetArea }} sq.ft carpet
              </span>
              <span v-if="property.carpetArea && property.totalArea"> • </span>
              <span v-if="property.totalArea">
                {{ property.totalArea }} sq.ft super built-up
              </span>
            </p>
            <!-- <p class="text-gray-200">
              Floor {{ property.floorNumber }} of {{ property.totalFloors }}
              <span v-if="property.facingDirection">
                • {{ property.facingDirection }} facing
              </span>
            </p> -->
            <p class="text-gray-400">
              {{ property.bedCount }} Bed • {{ property.bathroomCount }} Bath •
              {{ property.parkingCount }} Parking
            </p>
          </div>
        </div>
      </article>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>