<script lang="ts" setup>
import MainHeader from '~/layouts/partials/MainHeader.vue'

const route = useRoute()

const { data: productGroups } = useAsyncData<any>('product-groups',
  async () => (await useIndexProductGroupsApi(
    { per_page: 0 },
    { created_at: 'asc' }
  )).data.data
)
</script>

<template>
  <MainHeader />

  <div class="relative">
    <div class="flex flex-col lg:flex-row container mx-auto min-h-[calc(100vh_-_theme(space.16))] lg:divide-x divide-default-100">
      <div class="w-full lg:w-72 flex-none pt-3 lg:pt-7 px-3 flex flex-col gap-5">
        <h3 class="font-bold tracking-wide">Danh mục sản phẩm</h3>
        <nav class="flex flex-col divide-y divide-dashed divide-default-500/10">
          <div class="py-2 block">
            <NuxtLink :to="{ name: 'products' }" exact-active-class="active-nav">
              Tất cả
            </NuxtLink>
          </div>
          <div v-for="productGroup in productGroups" :key="productGroup.id" class="py-2 block">
            <NuxtLink 
              :to="{ name: 'product-groups-productGroup', params: { productGroup: productGroup.slug } }"
              exact-active-class="active-nav"  
            >
              {{ productGroup.name }}
            </NuxtLink>
          </div>
        </nav>
      </div>
      <div class="bg-white grow sm:mx-0">
        <slot />        
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.active-nav {
  @apply font-bold text-primary-500
}
</style>