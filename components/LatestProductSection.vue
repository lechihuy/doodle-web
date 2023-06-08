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
      <div class="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div class="rounded-full w-16 h-16 bg-primary-500 flex-none flex items-center justify-center border-2 border-primary-500">
          <Icon name="heroicons:beaker-solid" class="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 class="text-2xl xs:text-3xl font-bold leading-7 text-primary-500">
            Sản phẩm mới nhất
          </h2>
          <p class="text-base sm:text-lg text-primary-400">
            Luôn được cập nhật liên tục theo thị trường
          </p>
        </div>
      </div>
        
      <div class="mt-7 gap-7 grid items-strech grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        <NuxtLink 
          v-for="(product, index) in latestProducts" :key="product.id" :to="{ name: 'products-product', params: { product: product.slug } }" 
          class="rounded-2xl flex flex-col gap-3"
          :class="{
            'hidden xl:flex': index > 7
          }"
        >
          <nuxt-img :src="product.thumbnail.url" class="w-full bg-default-50 aspect-square rounded-lg" />
          
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