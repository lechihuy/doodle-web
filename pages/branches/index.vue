<script lang="ts" setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

definePageMeta({
  layout: "default",
  middleware: ["optional-auth"],
});

useHead({ title: "Danh sách cửa hàng" });
useMapHead()

const { data: count } = await useAsyncData(
  "branch_count",
  async () => (await useCountBranchMetricApi("count-by-province")).data.data
);
const filter = ref({
  keyword: Object.keys(count.value.values)[0],
  per_page: 0,
});
const searchInput = ref()

const { data: branches } = useAsyncData(
  "branches",
  async () => (await useIndexBranchsApi(filter.value)).data.data,
);

watch(filter, () => {
  if (filter.value.keyword === '') {
    filter.value.keyword = Object.keys(count.value.values)[0]
  }

  refreshNuxtData('branches')
}, { deep: true })

watch(searchInput, () => {
  filter.value.keyword = searchInput.value
})
</script>

<template>
  <div class="max-h-48 w-full relative overflow-hidden">
    <div class="flex items-center justify-center absolute inset-0 bg-black/60 px-3">
      <span class="text-white font-extrabold text-2xl sm:text-3xl">Hệ thống {{ count.total }} cửa hàng Doodle toàn quốc</span>
    </div>
    <nuxt-img
      src="/images/supermarket-branch-banner.jpeg"
      class="w-full h-full object-contain"
    />
  </div>
  <div class="container mx-auto px-3 p-10 flex flex-col lg:flex-row lg:divide-x divide-default-100 gap-10 lg:gap-0">
    <div class="w-72 flex-none">
      <p class="font-bold mb-7">Theo khu vực</p>
      <div class="flex flex-col gap-3">
        <a
          v-for="(countByProvince, province) in count.values"
          :key="province"
          class="font-semibold text-default-700 cursor-pointer"
          :class="{
            'text-primary-500': province.toString() === filter.keyword,
          }"
          @click="filter.keyword = province.toString()"
        >
          {{ province }} ({{ countByProvince }})
        </a>
      </div>
    </div>
    <div class="grow lg:pl-10">
      <div class="relative mb-10">
        <input type="text" class="form-input pl-11"  placeholder="Tìm kiếm cửa hàng theo địa chỉ..." v-model="searchInput" />
        <Icon name="heroicons:magnifying-glass" class="w-5 h-5 absolute top-2.5 left-3" />
      </div>

      <h3 class="text-xl font-bold mb-5" v-show="!searchInput">Khám phá {{ branches.length }} cửa hàng của chúng tôi ở {{ filter.keyword }}</h3>
      <h3 class="text-xl font-bold mb-5" v-show="searchInput">Có {{ branches.length }} cửa hàng được tìm thấy</h3>

      <div class="flex flex-col divide-y divide-default-200 divide-dashed">
        <div v-for="branch in branches" :key="branch.id" class="flex flex-col xl:flex-row py-5 xl:items-center gap-5 xl:gap-10">
          <Carousel class="h-64 w-full xl:max-w-lg rounded-lg ring-1 ring-default-100 overflow-hidden" :wrap-around="true" :mouse-drag="false" :touch-drag="false">
            <Slide :key="0">
              <nuxt-img :src="branch.thumbnail.url" class="h-full pointer-events-none object-contain" />
            </Slide>
            <Slide :key="1">
              <div class="relative w-full h-64 z-[1] rounded-lg overflow-hidden" v-if="branch.address.lat && branch.address.lng">
                <Map :coordinates="{
                  lat: branch.address.lat,
                  lng: branch.address.lng
                }" class="h-full" />
              </div>
            </Slide>
            <template #addons>
              <Pagination />
            </template>
          </Carousel>
         
          <div class="flex flex-col grow">
            <h3 class="mb-3 font-bold text-lg flex items-center gap-2">
              <Icon name="heroicons:map-pin-solid" class="w-6 h-6 text-danger-500" />
              {{ branch.name }}
            </h3>
            <p>{{ branch.address.full_address }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>