<script lang="ts" setup>
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

definePageMeta({
  layout: "default",
  middleware: ["optional-auth"],
});

const route = useRoute()
const slug = route.params.product as string

const { data: product, error } = await useAsyncData(
  "product",
  async () => (await useDetailProductApi(slug)).data.data,
)

useHead({
  title: product.value?.name
})

if (error.value) {
  showError(createError({ statusCode: 404 }))
}
</script>

<template>
  <NuxtLayout name="product-collection">
    <div class="mx-auto container px-3 lg:px-10 py-10 flex flex-col gap-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-7">
        <ProductThumbnailSlider :images="[
          product.thumbnail.url,
          ...product.detail_images.map((img) => img.url)
        ]" />
        <div class="flex flex-col gap-5">
          <h1 class="text-2xl font-bold text-default-700 xl:text-3xl leading-normal">{{ product.name }}</h1>
          <p class="text-2xl xl:text-3xl font-bold text-danger-500">{{ currency(product.sale_price)  }}</p>
          <AddToCartButton size="large" :product-id="product.id" />
          <div class="bg-default-50 border border-default-100 flex flex-col gap-3 p-5 rounded-lg">
            <div class="flex items-center gap-3">
              <Icon name="mdi:clock-fast" class="w-6 h-6 text-primary-500" />
              <span>Đặt online giao tận nhà SIÊU TỐC trong nội thành</span>
            </div>
            <div class="flex items-center gap-3">
              <Icon name="mdi:package" class="w-6 h-6 text-primary-500" />
              <span>Giao hàng tận tay dù chỉ là 1 sản phẩm</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <h3 class="font-bold text-xl text-default-700 mb-5">Thông tin sản phẩm</h3>
        <p>{{ product.description ?? '(Chưa có thông tin mô tả)'}}</p>
        <div class="flex flex-col mt-5 divide-y divide-default-100">
          <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 py-3">
            <div class="w-48 max-w-full flex-none font-bold text-default-500">
              Thương hiệu
            </div>
            <div class="grow">
              <NuxtLink :to="{ name: 'brands-brand', params: { brand: product.brand.slug } }" class="overflow-hidden divide-x divide-default-200 inline-flex border border-default-200 rounded-lg">
                <nuxt-img :src="product.brand.thumbnail?.url" class="w-14 h-14" /> 
                <p class="px-3 font-bold text-default-700 flex items-center">{{ product.brand.name }}</p>
              </NuxtLink>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 py-3">
            <div class="w-48 max-w-full flex-none font-bold text-default-500">
              Đơn vị bán
            </div>
            <div class="grow">
              {{ product.unit }}
            </div>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 py-3" v-for="parameter in product.parameters" :key="parameter.key">
            <div class="w-48 max-w-full flex-none font-bold text-default-500">
              {{ parameter.key }}
            </div>
            <div class="grow">
              {{ parameter.value }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col" v-if="product.variants.length > 0">
        <h3 class="font-bold text-xl text-default-700 mb-5">Sản phẩm liên quan</h3>

        <div class="-ml-px">
          <Carousel :items-to-show="2" snap-align="start" class="block md:hidden -mx-3 relative lg:-mx-10">
            <Slide v-for="variantProduct in product.variants" :key="variantProduct.id"
              class="border-t border-b border-l last:border-r border-default-100"
            >
              <ProductVerticalItem
                class="p-7 hover:bg-primary-50"
                :key="variantProduct.id"
                :id="variantProduct.id"
                :slug="variantProduct.slug"
                :thumbnail="variantProduct.thumbnail?.url"
                :name="variantProduct.name"
                :sale-price="variantProduct.sale_price"
                thumbnail-style="bg-transparent"
                :can-add-to-cart="true"
              />
            </Slide>

            <template #addons="{ slidesCount }">
              <Navigation v-if="slidesCount > 1" />
            </template>
          </Carousel>

          <Carousel :items-to-show="4" snap-align="start" class="hidden md:block -mx-3 relative lg:-mx-10">
            <Slide v-for="variantProduct in product.variants" :key="variantProduct.id"
              class="border-t border-b border-l last:border-r border-default-100"
            >
              <ProductVerticalItem
                class="p-7 hover:bg-primary-50"
                :key="variantProduct.id"
                :id="variantProduct.id"
                :slug="variantProduct.slug"
                :thumbnail="variantProduct.thumbnail?.url"
                :name="variantProduct.name"
                :sale-price="variantProduct.sale_price"
                thumbnail-style="bg-transparent"
                :can-add-to-cart="true"
              />
            </Slide>

            <template #addons="{ slidesCount }">
              <Navigation v-if="slidesCount > 1" />
            </template>
          </Carousel>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>