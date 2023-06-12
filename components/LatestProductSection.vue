<script lang="ts" setup>
const { data: latestProducts } = await useAsyncData<any>('latestProducts', 
  async () => (await useIndexProductsApi(
    { limit: 10 }, 
    { created_at: 'desc' }
  )).data.data
)
</script>

<template>
  <section class="relative py-14">
    <div class="container px-3 w-full mx-auto">
      <div class="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
        <Icon name="noto:comet" class="w-12 h-12 text-primary-500" />
        <h2 class="font-extrabold text-2xl xs:text-3xl leading-7 text-primary-500">
          Sản phẩm mới nhất
        </h2>
      </div>
        
      <div class="mt-7 gap-7 grid items-strech grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        <NuxtLink 
          v-for="(product, index) in latestProducts" :key="product.id" :to="{ name: 'products-product', params: { product: product.slug } }" 
          class="rounded-2xl flex flex-col gap-3"
          :class="{
            'hidden xl:flex': index > 7
          }"
        >
          <nuxt-img :src="product.thumbnail.url" class="w-full bg-default-100 aspect-square rounded-lg" />
          
          <div class="grid grid-cols-1 gap-1 grow content-between">
            <p class="text-primary-900 font-semibold line-clamp-2">
              {{ product.name }}
            </p>
            <p class="font-bold text-danger-500">{{ currency(product.sale_price) }}</p>
          </div>
        </NuxtLink>
      </div>

      <div class="flex items-center justify-center mt-7">
        <MagicButton>
          <NuxtLink :to="{ name: 'products' }" class="btn btn-transparent bg-white btn-large">Xem thêm <Icon name="heroicons:arrow-right" class="w-4 h-4" /></NuxtLink>
        </MagicButton>
      </div>
    </div>
  </section>
</template>