<script lang="ts" setup>
definePageMeta({
  layout: "default",
  middleware: ["optional-auth"],
});

const filter = ref<ProductFilter>({
  keyword: "",
  page: 1,
  per_page: 20,
});

const sorter = ref<ProductSorter>({
  created_at: "desc",
  sale_price: null,
});

const { data: products } = useAsyncData(
  "products",
  async () =>
    (await useIndexProductsApi(filter.value, sorter.value)).data,
)

watch([filter, sorter], () => {
  refreshNuxtData('products')
}, { deep: true })
</script>

<template>
  <NuxtLayout name="product-collection">
    <div class="px-3 lg:px-7 p-7">
      <h1 class="text-3xl flex items-center font-bold text-default-700">Tất cả sản phẩm
        <div class="ml-auto -mr-3 lg:-mr-7">
          <ProductSorter v-model="sorter" />
        </div>
      </h1>
    </div>

    <div
      class="grid items-strech grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
    >
      <ProductVerticalItem
        v-for="product in products.data"
        class="flex-none p-7 border border-default-100 -ml-px -mt-px hover:bg-primary-50"
        :key="product.id"
        :id="product.id"
        :slug="product.slug"
        :thumbnail="product.thumbnail?.url"
        :name="product.name"
        :sale-price="product.sale_price"
        thumbnail-style="bg-transparent"
        :can-add-to-cart="true"
      />
    </div>

    <div class="p-7 flex items-center text-sm">
      <div class="text-default-700">
        {{ products.meta.from }}-{{ products.meta.to }} trên tổng
        {{ products.meta.total }} sản phẩm.
      </div>
      <Paginator
        class="ml-auto"
        :meta="products.meta"
        :filter="filter"
      />
    </div>
  </NuxtLayout>
</template>