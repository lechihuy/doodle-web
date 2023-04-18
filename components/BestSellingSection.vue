<script lang="ts" setup>
const { data: bestSellingProducts } = await useAsyncData<any>('bestSellingProducts', 
  async () => (await useIndexProductLensApi(PRODUCT_LENS.bestSeller)).data.data
)
</script>

<template>
  <section class="container mx-auto px-3 py-20 flex flex-col gap-6">
    
    <h3 class="font-extrabold text-3xl text-default-700 flex items-center gap-2 relative">
      <Icon name="heroicons:fire-solid" class="w-8 h-8 text-danger-500 tracking-wider" />
      <span>Sản phẩm bán chạy</span>
    </h3>

    <p class="max-w-3xl space-y-6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor aliquid molestias animi fugiat unde suscipit in officiis veritatis? Modi culpa at animi sint aspernatur sequi voluptas architecto amet cumque vitae!</p>

    <div class="flex justify-center">
      <div class="grid items-strech gap-7 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        <ProductVerticalItem
          v-for="product in bestSellingProducts"
          class=" flex-none"
          :key="product.id"
          :id="product.id"
          :thumbnail="product.thumbnail?.url"
          :name="product.name"
          :sale-price="product.sale_price"
        />
      </div>
    </div>
  </section>
</template>