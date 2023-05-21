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
  <section class="container mx-auto px-3 py-20 flex flex-col gap-6">
    
    <h3 class="font-extrabold text-3xl text-default-700 flex items-center gap-2 relative">
      <Icon name="heroicons:fire-solid" class="w-10 h-10 text-danger-500 tracking-wider" />
      <span>Sản phẩm bán chạy</span>
    </h3>

    <Carousel :items-to-show="1.5" snap-align="start" :items-to-scroll="1.5" class="block md:hidden">
      <Slide v-for="product in bestSellingProducts" :key="product.id"
        class="border-t border-b border-l last:border-r border-default-100"
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

    <Carousel :items-to-show="2.5" snap-align="start" :items-to-scroll="2.5" class="hidden md:block lg:hidden">
      <Slide v-for="product in bestSellingProducts" :key="product.id"
        class="border-t border-b border-l last:border-r border-default-100"
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

    <Carousel :items-to-show="3.5" snap-align="start" :items-to-scroll="1.5" class="hidden lg:block xl:hidden">
      <Slide v-for="product in bestSellingProducts" :key="product.id"
        class="border-t border-b border-l last:border-r border-default-100"
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

    <Carousel :items-to-show="5" snap-align="start" :touch-drag="false" :mouse-drag="false" class="hidden xl:block">
      <Slide v-for="product in bestSellingProducts" :key="product.id"
        class="border-t border-b border-l last:border-r border-default-100"
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
</template>