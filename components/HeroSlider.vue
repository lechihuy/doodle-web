<script lang="ts" setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const { $axios } = useNuxtApp()

const { data: meta } = await useAsyncData<any>(
  "meta",
  async () => (await $axios.get(`public/meta`)).data.data
);

const currentCustomer = useCurrentCustomer();
</script>

<template>
  <Carousel class="w-full overflow-hidden aspect-[16/4]" :autoplay="5000" :wrap-around="true" :mouse-drag="false" :touch-drag="false">
    <Slide v-for="voucher in meta.available_vouchers" :key="voucher.id">
      <NuxtLink :to="{ name: 'products' }" class="block">
        <nuxt-img :src="voucher.thumbnail.url" class="object-contain" />
      </NuxtLink>
    </Slide>
    <template #addons="{ slidesCount }">
      <Pagination />
      <Navigation v-if="slidesCount > 1" />
    </template>
  </Carousel>
</template>