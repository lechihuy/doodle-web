<script lang="ts" setup>
const { data: latestProducts } = await useAsyncData<any>('latestProducts', 
  async () => (await useIndexProductsApi(
    { limit: 8 }, 
    { created_at: 'desc' }
  )).data.data
)
</script>

<template>
  <section class="mx-auto px-3 py-20 relative border-t border-slate-900/[0.07] mt-10">
    <div class="absolute inset-0 text-slate-900/[0.07] [mask-image:linear-gradient(to_bottom,white,transparent)]">
      <svg class="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid-bg"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
            x="100%"
            patternTransform="translate(0 -1)"
          >
            <path d="M0 32V.5H32" fill="none" stroke="currentColor"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-bg)"></rect>
      </svg>
    </div>

    <div class="container px-3 mx-auto flex flex-col lg:flex-row gap-10 items-start">

      <div class="w-full flex-none relative translate -translate-y-[calc(theme(space.32)_-_theme(space.2))] bg-[radial-gradient(164.75%_100%_at_50%_0%,#334155_0%,#0F172A_48.73%)] p-5 sm:p-10 shadow-lg rounded-3xl">
       
        <div class="flex items-center">
          <div class="rounded-full w-14 h-14 flex-none flex items-center justify-center border-2 border-primary-500">
            <Icon name="heroicons:beaker" class="w-8 h-8 text-primary-500" />
          </div>
          <div class="ml-4">
            <h2 class="text-3xl font-bold leading-7 text-white">
              Sản phẩm mới nhất
            </h2>
            <p class="text-lg text-slate-400">
              Luôn được cập nhật liên tục theo thị trường
            </p>
          </div>
        </div>
        
        <div class="mt-7 gap-3 grid items-strech grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            <NuxtLink  v-for="product in latestProducts" :key="product.id" :to="{ name: 'products-product', params: { product: product.slug } }" class="bg-default-700/25 hover:bg-default-700/50 ring-1 ring-slate-700/50 rounded-2xl flex flex-col">
              <nuxt-img :src="product.thumbnail.url" class="w-full aspect-square rounded-lg" />
              
              <div class="flex flex-col gap-3 p-5">
                <p class="text-white font-semibold text-xl line-clamp-2">
                  {{ product.name }}
                </p>
                <p class="font-bold text-primary-500 text-xl">{{ currency(product.sale_price) }}</p>
              </div>
            </NuxtLink>
        </div>

        <div class="flex items-center justify-center mt-5">
          <MagicButton>
            <NuxtLink :to="{ name: 'products' }" class="btn btn-transparent bg-white btn-large">Xem thêm <Icon name="heroicons:arrow-right" class="w-4 h-4" /></NuxtLink>
          </MagicButton>
        </div>
      </div>
    </div>
  </section>
</template>