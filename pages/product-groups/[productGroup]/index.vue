<script lang="ts" setup>
definePageMeta({
  layout: "product-collection",
  middleware: ["optional-auth"],
});

const route = useRoute()
const slug = route.params.productGroup as string

const filter = ref<ProductFilter>({
  keyword: "",
  page: 1,
  per_page: 20,
  product_group_ids: [],
});

const loading = ref(true)

const sorter = ref<ProductSorter>({
  created_at: "desc",
  sale_price: null,
});

const { data: productGroup } = await useAsyncData(
  "product-group",
  async () =>
    (await useDetailProductGroupApi(slug)).data.data,
)

filter.value.product_group_ids.push(productGroup.value.id)

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
  <div class="px-3 lg:px-7 p-7">
    <h1 class="text-3xl flex items-center font-bold text-default-700">
      {{ productGroup.name }}

      <div class="ml-auto -mr-3 lg:-mr-7">
        <ProductSorter v-model="sorter" />
      </div>
    </h1>

    <div class="flex items-center whitespace-nowrap mt-7 gap-5">
      <NuxtLink 
        v-for="brand in productGroup.brands" 
        :key="brand.id" 
        class="border border-default-300 rounded-lg hover:ring-2 hover:ring-primary-500/50 hover:ring-offset-1"
        :to="{ name: 'brands-brand', params: { brand: brand.slug } }"
      >
        <Tooltip :value="brand.name">
          <nuxt-img :src="brand.thumbnail?.url" class="w-20 h-20 rounded-md" />
        </Tooltip>
      </NuxtLink>
    </div>
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
</template>