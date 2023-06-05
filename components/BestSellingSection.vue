<script lang="ts" setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const { data: bestSellingProducts, error } = await useAsyncData<any>('bestSellingProducts', 
  async () => (await useIndexProductLensApi(PRODUCT_LENS.bestSeller, {
    range: 'month'
  })).data.data
)
</script>

<template>
  <div
    class="jumbotron relative bg-bottom bg-no-repeat bg-default-50"
  >
    <div
      class="absolute inset-0 bg-grid-default-900 bg-[bottom_1px_center]"
      style="
        mask-image: linear-gradient(to bottom, transparent, black);
        -webkit-mask-image: linear-gradient(to bottom, transparent, black);
      "
    ></div>
    <section class="container mx-auto px-3 py-20 flex flex-col gap-6">
    
      <h3 class="font-extrabold text-2xl xs:text-3xl text-default-700 justify-center flex items-center gap-2 leading-7 relative">
        <Icon name="noto:fire" class="w-10 h-10 text-danger-500 tracking-wider" />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-600 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0)]">Sản phẩm bán chạy</span>
      </h3>

      <Carousel :items-to-show="1.5" snap-align="start" :autoplay="2000" :pause-autoplay-on-hover="true" :wrap-around="true" :items-to-scroll="1.5" class="block rounded-xl overflow-hidden bg-white md:hidden shadow-xl">
        <Slide v-for="product in bestSellingProducts" :key="product.id"
          class="border-l last:border-r border-default-100"
        >
          <ProductVerticalItem
            class="p-7 hover:bg-primary-50"
            :key="product.id"
            :id="product.id"
            :slug="product.slug"
            :thumbnail="product.thumbnail?.url"
            :name="product.name"
            :sale-price="product.sale_price"
            thumbnail-style="bg-transparent"
            :can-add-to-cart="true"
          />
        </Slide>

        <template #addons="{ slidesCount }">
          <Navigation v-if="slidesCount > 1" />
        </template>
      </Carousel>

      <Carousel :items-to-show="2.5" snap-align="start" :autoplay="2000" :pause-autoplay-on-hover="true" :wrap-around="true" :items-to-scroll="2.5" class="hidden rounded-xl overflow-hidden md:block bg-white lg:hidden shadow-xl">
        <Slide v-for="product in bestSellingProducts" :key="product.id"
          class="border-l last:border-r border-default-100"
        >
          <ProductVerticalItem
            class="p-7 hover:bg-primary-50"
            :key="product.id"
            :id="product.id"
            :slug="product.slug"
            :thumbnail="product.thumbnail?.url"
            :name="product.name"
            :sale-price="product.sale_price"
            thumbnail-style="bg-transparent"
            :can-add-to-cart="true"
          />
        </Slide>

        <template #addons="{ slidesCount }">
          <Navigation v-if="slidesCount > 1" />
        </template>
      </Carousel>

      <Carousel :items-to-show="3.5" snap-align="start" :autoplay="2000" :pause-autoplay-on-hover="true" :wrap-around="true" :items-to-scroll="1.5" class="hidden rounded-xl overflow-hidden lg:block bg-white xl:hidden shadow-xl">
        <Slide v-for="product in bestSellingProducts" :key="product.id"
          class="border-l last:border-r border-default-100"
        >
          <ProductVerticalItem
            class="p-7 hover:bg-primary-50"
            :key="product.id"
            :id="product.id"
            :slug="product.slug"
            :thumbnail="product.thumbnail?.url"
            :name="product.name"
            :sale-price="product.sale_price"
            thumbnail-style="bg-transparent"
            :can-add-to-cart="true"
          />
        </Slide>

        <template #addons="{ slidesCount }">
          <Navigation v-if="slidesCount > 1" />
        </template>
      </Carousel>

      <Carousel :items-to-show="5" snap-align="start" :autoplay="2000" :pause-autoplay-on-hover="true" :wrap-around="true" class="hidden rounded-xl overflow-hidden bg-white xl:block shadow-xl">
        <Slide v-for="product in bestSellingProducts" :key="product.id"
          class="border-l last:border-r border-default-100"
        >
          <ProductVerticalItem
            class="p-7 hover:bg-primary-50"
            :key="product.id"
            :id="product.id"
            :slug="product.slug"
            :thumbnail="product.thumbnail?.url"
            :name="product.name"
            :sale-price="product.sale_price"
            thumbnail-style="bg-transparent"
            :can-add-to-cart="true"
          />
        </Slide>

        <template #addons="{ slidesCount }">
          <Navigation v-if="slidesCount > 1" />
        </template>
      </Carousel>
    </section>
  </div>
</template>


<style scoped>
.jumbotron {
  @apply bg-[url(https://tailwindcss.com/_next/static/media/hero@75.b2469a49.jpg)] 
    bg-[length:140rem]
}
</style>