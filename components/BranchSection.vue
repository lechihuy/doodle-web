<script lang="ts" setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const filter = ref();

const { data: branches } = useAsyncData(
  "branches",
  async () => (await useIndexBranchsApi({
    limit: 5
  })).data.data,
);
</script>

<template>
  <section class="bg-primary-50 py-20">
    <div class="container mx-auto px-3 flex flex-col lg:flex-row gap-20 lg:items-center">
      <div class="flex flex-col gap-3 w-96 max-w-full flex-none">
        <h3 class="text-3xl font-extrabold text-primary-500">Cửa hàng Doodle</h3>
        <p class="text-base md:text-xl font-light text-default-700">Cửa hàng Doodle trải dài trên khắp toàn quốc để luôn sẵn sàng hỗ trợ quý khách.</p>
        <div class="mt-5">
          <MagicButton class="inline-block">
            <NuxtLink class="btn btn-transparent btn-large" :to="{ name: 'branches' }">
              Xem tất cả cửa hàng <Icon name="heroicons:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </MagicButton>
        </div>
      </div>

      <div class="relative">
        <Carousel class="w-full aspect-[2/1] absolute rounded-lg overflow-hidden shadow-xl" :pauseAutoplayOnHover="true" :autoplay="2000" :wrap-around="true" :mouse-drag="false" :touch-drag="false">
          <Slide v-for="branch in branches" :key="branch.id">
            <nuxt-img :src="branch.thumbnail.url" class="h-full object-contain" />
          </Slide>
          <template #addons="{ slidesCount }">
            <Pagination />
            <Navigation v-if="slidesCount > 1" />
          </template>
        </Carousel>
      </div>
    </div>
  </section>
</template>