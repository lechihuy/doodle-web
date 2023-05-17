<script lang="ts" setup>
const { data: bestSellingProducts, error } = await useAsyncData<any>('bestSellingProducts', 
  async () => (await useIndexProductLensApi(PRODUCT_LENS.bestSeller)).data.data
)
</script>

<template>
  <section class="container mx-auto px-3 py-20 flex flex-col gap-6">
    
    <h3 class="font-extrabold text-3xl text-default-700 flex items-center gap-2 relative">
      <Icon name="heroicons:fire-solid" class="w-10 h-10 text-danger-500 tracking-wider" />
      <span>Sản phẩm bán chạy</span>
    </h3>

    <div class="flex justify-center">
      <div class="grid items-strech gap-7 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        <ProductVerticalItem
          v-for="product in bestSellingProducts"
          class=" flex-none"
          :key="product.id"
          :id="product.id"
          :slug="product.slug"
          :thumbnail="product.thumbnail?.url"
          :name="product.name"
          :sale-price="product.sale_price"
        />
      </div>
    </div>
  </section>
</template>