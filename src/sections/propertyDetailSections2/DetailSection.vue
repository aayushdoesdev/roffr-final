<script setup></script>

<template>
  <section class="pb-10 max-w-7xl mx-auto px-4 2xl:px-0 flex flex-col gap-6">
    <div class="flex items-strech justify-between gap-6">
      <!-- LEFT SIDE (70%) -->
      <div class="w-[70%]">
        <!-- IMAGE + TABS (your existing) -->
        <div
          class="flex justify-between gap-6 border rounded-full p-1 w-full bg-gray-50"
        >
          <div
            class="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full"
          >
            <i class="pi pi-images"></i> Property Details
          </div>
          <div class="flex items-center gap-2 text-gray-600 px-4 py-1">
            <i class="pi pi-video"></i> Ameneties
          </div>
          <div class="flex items-center gap-2 text-gray-600 px-4 py-1">
            <i class="pi pi-star"></i> Project
          </div>
          <div class="flex items-center gap-2 text-gray-600 px-4 py-1">
            <i class="pi pi-th-large"></i> Locality
          </div>
        </div>

        <!-- PROPERTY DETAILS -->
        <div class="mt-4 border rounded-2xl p-6 bg-[#f8f6f3]">
          <!-- Grid -->
          <div class="grid grid-cols-3 gap-x-10 gap-y-8 text-sm">
            <div>
              <p class="text-gray-500">CITY</p>
              <p class="border-b mt-1 pb-1">Mumbai</p>
            </div>

            <div>
              <p class="text-gray-500">REGION</p>
              <p class="border-b mt-1 pb-1">Western Suburbs</p>
            </div>

            <div>
              <p class="text-gray-500">SUB REGION</p>
              <p class="border-b mt-1 pb-1">Andheri West</p>
            </div>

            <div>
              <p class="text-gray-500">LOCALITY</p>
              <p class="border-b mt-1 pb-1">Azad Nagar</p>
            </div>

            <div>
              <p class="text-gray-500">PROJECT TYPE</p>
              <p class="border-b mt-1 pb-1">Gated Amenities</p>
            </div>

            <div>
              <p class="text-gray-500">UNIT TYPE</p>
              <p class="border-b mt-1 pb-1">Apartment</p>
            </div>

            <div>
              <p class="text-gray-500">VASTU: ENTRY</p>
              <p class="border-b mt-1 pb-1">N</p>
            </div>

            <div>
              <p class="text-gray-500">VASTU: EXIT</p>
              <p class="border-b mt-1 pb-1">S</p>
            </div>

            <div>
              <p class="text-gray-500">VIEW</p>
              <p class="border-b mt-1 pb-1">
                building view / ground facing / road facing
              </p>
            </div>

            <div>
              <p class="text-gray-500">FLOORING</p>
              <p class="border-b mt-1 pb-1">Vitrified Tile</p>
            </div>

            <div>
              <p class="text-gray-500">BHK</p>
              <p class="border-b mt-1 pb-1">2.5 BHK</p>
            </div>

            <div>
              <p class="text-gray-500">NO. OF BALCONIES</p>
              <p class="border-b mt-1 pb-1">0</p>
            </div>

            <div>
              <p class="text-gray-500">NO. OF BATHROOMS</p>
              <p class="border-b mt-1 pb-1">3</p>
            </div>

            <div>
              <p class="text-gray-500">NO. OF PARKINGS</p>
              <p class="border-b mt-1 pb-1">1</p>
            </div>

            <div>
              <p class="text-gray-500">NO. OF LIFTS</p>
              <p class="border-b mt-1 pb-1">6</p>
            </div>

            <div>
              <p class="text-gray-500">USABLE AREA</p>
              <p class="border-b mt-1 pb-1">758 sq. ft.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT SIDE (30%) -->
      <div class="w-[30%] flex flex-col gap-6">
        <!-- PROPERTY CARD -->
        <div class="bg-white border rounded-2xl shadow-sm overflow-hidden">
          <!-- Image -->
          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600"
              class="w-full h-[200px] object-cover"
            />

            <!-- Icons -->
            <div class="absolute top-3 right-3 flex gap-2">
              <div class="bg-white rounded-full p-2 shadow cursor-pointer">
                <i class="pi pi-heart text-sm"></i>
              </div>
              <div class="bg-white rounded-full p-2 shadow cursor-pointer">
                <i class="pi pi-sliders-h text-sm"></i>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-4">
            <h3 class="font-semibold text-lg">Pearl Residency</h3>
            <p class="text-sm text-gray-500 mb-3">Azad Nagar, Andheri West</p>

            <!-- Stats -->
            <div class="flex gap-4 text-sm text-gray-600">
              <p>
                Available Rent <span class="text-blue-600 font-medium">0</span>
              </p>
              <p>
                Available Sale <span class="text-blue-600 font-medium">0</span>
              </p>
              <p>Price Range</p>
            </div>
          </div>
        </div>

        <!-- AGENT CARD -->
        <div class="bg-[#f8f6f3] border rounded-2xl p-5 shadow-sm">
          <!-- Agent Info -->
          <div class="flex items-center gap-3 mb-4">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 class="font-semibold">Ms. Andrea Quinny</h3>
              <p class="text-sm text-gray-500">Buildstone Realty</p>
            </div>
          </div>

          <!-- Form -->
          <div class="flex flex-col gap-4">
            <input
              type="text"
              placeholder="First Name"
              class="w-full border rounded-lg px-4 py-2 bg-white"
            />

            <input
              type="text"
              placeholder="Last Name"
              class="w-full border rounded-lg px-4 py-2 bg-white"
            />

            <!-- Phone -->
            <div class="flex border rounded-lg overflow-hidden bg-white">
              <div class="flex items-center gap-2 px-3 border-r">
                <img
                  src="https://flagcdn.com/w20/in.png"
                  class="w-5 h-3 object-cover"
                />
                <span class="text-sm">+91</span>
              </div>
              <input
                type="text"
                placeholder="Phone Number"
                class="flex-1 px-3 py-2 outline-none"
              />
            </div>

            <!-- Dropdown -->
            <select
              class="w-full border rounded-lg px-4 py-2 bg-white text-gray-500"
            >
              <option>Select</option>
              <option>Buy</option>
              <option>Rent</option>
            </select>

            <!-- Button -->
            <button class="bg-black text-white py-2 rounded-lg mt-2">
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
