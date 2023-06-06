<script lang="ts" setup>
const { data: productGroups } = useAsyncData<any>('product-groups',
  async () => (await useIndexProductGroupsApi(
    { per_page: 0 },
    { created_at: 'asc' }
  )).data.data
)
</script>

<template>
  <div class="relative">
    <div class="flex flex-col lg:flex-row container mx-auto min-h-[calc(100vh_-_theme(space.16))] lg:divide-x divide-default-100">
      <div class="w-full lg:w-72 flex-none pt-3 lg:pt-7 px-3 flex flex-col gap-5">
        <div class="block lg:hidden">
          <HeadlessMenu
            as="div"
            class="relative lg:hidden"
          >
            <HeadlessMenuButton
              class="btn btn-transparent"
            >
              <Icon name="heroicons:bars-3" class="w-5 h-5" /> Danh mục sản phẩm
            </HeadlessMenuButton>

            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <HeadlessMenuItems
                class="absolute divide-y divide-default-100 left-0 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                :style="{ zIndex: zIndex.dropdown }"
              >
                <div class="py-1 divide-y divide-dashed divide-default-500/10">
                  <HeadlessMenuItem v-slot="{ active }">
                    <NuxtLink
                      :to="{ name: 'products' }"
                      :class="[
                        active ? 'bg-default-100' : '',
                        'group flex w-full items-center px-2 py-2 gap-2',
                      ]"
                      exact-active-class="active-nav"
                    >
                      Tất cả
                    </NuxtLink>
                  </HeadlessMenuItem>

                  <HeadlessMenuItem v-for="productGroup in productGroups" :key="productGroup.id" v-slot="{ active }">
                    <NuxtLink
                    :to="{ name: 'product-groups-productGroup', params: { productGroup: productGroup.slug } }"
                      exact-active-class="active-nav"
                      :class="[
                        active ? 'bg-default-100' : '',
                        'group flex w-full items-center px-2 py-2 gap-2',
                      ]"
                    >
                    {{ productGroup.name }}
                    </NuxtLink>
                  </HeadlessMenuItem>

                </div>
              </HeadlessMenuItems>
            </transition>
          </HeadlessMenu>
        </div>

        <nav class="hidden sticky top-24 bg-default-50 p-5 rounded-lg lg:flex flex-col divide-y divide-dashed divide-default-500/10">
          <h3 class="font-bold tracking-wide mb-5">Danh mục sản phẩm</h3>

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

  <MainFooter />
</template>

<style lang="scss" scoped>
.active-nav {
  @apply font-bold text-primary-500
}
</style>