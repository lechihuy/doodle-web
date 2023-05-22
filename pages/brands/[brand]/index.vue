<script lang="ts" setup>
definePageMeta({
  layout: "default",
  middleware: ["optional-auth"],
});

const route = useRoute()
const slug = route.params.brand as string

const filter = ref<ProductFilter>({
  keyword: "",
  page: 1,
  per_page: 20,
  brand_id: null,
});

const loading = ref(true)

const sorter = ref<ProductSorter>({
  created_at: "desc",
  sale_price: null,
});

const { data: brand } = await useAsyncData(
  "brand",
  async () =>
    (await useDetailBrandApi(slug)).data.data,
)

filter.value.brand_id = brand.value.id

const { data: products } = await useAsyncData(
  "products",
  async () =>
    (await useIndexProductsApi(filter.value, sorter.value)).data,
)

loading.value = false

watch([filter, sorter], async () => {
  loading.value = true

  await refreshNuxtData('products')

  loading.value = false
}, { deep: true })
</script>

<template>
  <NuxtLayout name="product-collection">
    <div class="px-3 lg:px-7 p-7">
      <nuxt-img :src="brand.thumbnail?.url" class="w-32 h-32 rounded-lg border border-default-300 mb-5" />
      <h1 class="text-3xl flex gap-3 flex-col sm:flex-row sm:items-center font-bold text-default-700">{{ brand.name }}
        <div class="sm:ml-auto -mr-3 lg:-mr-7">
          <ProductSorter v-model="sorter" />
        </div>
      </h1>
    </div>

    <div
      v-if="!loading"
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

    <div class="p-7 flex flex-col gap-7 sm:flex-row justify-center items-center text-sm">
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