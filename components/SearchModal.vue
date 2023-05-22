<script setup lang="ts">
const props = defineProps({
  shown: { type: Boolean, default: false }
})
const emit = defineEmits(['update:shown'])

const shown = computed({
  get: () => props.shown,
  set: (val) => emit('update:shown', val)
})

const { $lodash } = useNuxtApp()
const keyword = ref('')
const route = useRoute()
const searchLoading = ref(false)

function close() {
  shown.value = false
}

const brands = ref([])
const products = ref([])

const search = async () => {
  if (keyword.value != '') {
    searchLoading.value = true
  }

  await $lodash.debounce(async () => {
    if (keyword.value == '') {
      brands.value = []
      products.value = []
      searchLoading.value = false
      return
    }

    brands.value = (await useIndexBrandsApi({ keyword: keyword.value, limit: 5 })).data.data
    products.value = (await useIndexProductsApi({ keyword: keyword.value, limit: 5 })).data.data
    
    setTimeout(() => searchLoading.value = false, 200)
  }, 300)()
}

watch(route, () => {
  close()
}, { deep: true })
</script>

<template>
  <HeadlessTransitionRoot appear :show="shown" as="template">
    <HeadlessDialog as="div" @close="close" class="relative" :style="{ zIndex: zIndex.modal }">
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-70" />
      </HeadlessTransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full py-20 items-start justify-center p-4 text-center"
        >
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel
              class="w-full max-w-xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all"
            >
              <div class="relative">
                <input type="text" spellcheck="false" v-model="keyword" @keyup="search" class="form-input pl-11 px-5 py-3 rounded-t-lg rounded-b-none border-none" placeholder="Tìm kiếm sản phẩm, thương hiệu...">
                <Icon name="heroicons:magnifying-glass" class="w-5 h-5 absolute left-3 top-3.5" /> 
              </div>

              <div v-if="searchLoading" class="flex justify-center py-10 bg-white gap-2 items-center border-t border-default-100 text-default-500">
                <IconLoading class="w-6 h-6" /> Đang tải...
              </div>
              <div v-else-if="brands.length == 0 && products.length == 0 && keyword != '' && !searchLoading">
                <div class="flex justify-center p-7 bg-white gap-2 items-center text-default-500 border-t border-default-100 rounded-b-lg">
                  <div class="flex flex-col items-center gap-2">
                    <div class="w-14 h-14 rounded-full bg-default-50 flex items-center justify-center">
                      <Icon name="ic:outline-search-off" class="w-8 h-8 text-default-400" />
                    </div>
                    <p class="font-semibold">Không tìm thấy kết quả nào.</p>
                  </div>
                </div>
              </div>
              <div v-else-if="(brands.length > 0 || products.length > 0) && !searchLoading">
                <div v-if="brands.length > 0">
                  <div class="bg-default-50 tracking-wider uppercase text-xs font-semibold px-5 py-1 border-t border-b border-default-100">Thương hiệu</div>
                  <div class="grid grid-cols-5 sm:grid-cols-7 gap-3 px-5 py-3">
                    <NuxtLink 
                      v-for="brand in brands" 
                      :key="brand.id" 
                      class="border border-default-300 rounded-lg hover:ring-2 hover:ring-primary-500/50 hover:ring-offset-1"
                      :to="{ name: 'brands-brand', params: { brand: brand.slug } }"
                    >
                      <Tooltip :value="brand.name">
                        <nuxt-img :src="brand.thumbnail?.url" class="w-full aspect-square rounded-md" />
                      </Tooltip>
                    </NuxtLink>
                  </div>
                </div>

                <div v-if="products.length > 0">
                  <div class="bg-default-50 tracking-wider uppercase text-xs font-semibold px-5 py-1 border-t border-b border-default-100">Sản phẩm</div>
                  <div class="flex flex-col divide-y divide-default-100">
                    <NuxtLink :to="{ name: 'products-product', params: { product: product.slug } }" v-for="product in products" :key="product.id" class="flex items-center px-5 py-1.5 hover:bg-primary-50">
                      <nuxt-img :src="product.thumbnail.url" class="w-20 h-20 bg-default-100 rounded-md" />
                      
                      <div class="flex flex-col gap-1 px-7">
                        <p class="text-default-700 line-clamp-2">
                          {{ product.name }}
                        </p>
                        <p class="font-bold text-primary-500">{{ currency(product.sale_price) }}</p>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
              
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>