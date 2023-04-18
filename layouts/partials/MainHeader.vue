<script lang="ts" setup>
const headerIsSticked = ref(false)

onMounted(() => {
  window.addEventListener('scroll', (e) => {
    headerIsSticked.value = window.scrollY > 0
  })
})
</script>

<template>
  <header 
    class="sticky backdrop-blur transition-colors duration-300 inset-0 h-16"
    :class="[
      headerIsSticked ? 'bg-white/95 supports-backdrop-blur:bg-white/95 border-b border-default-900/10': 'bg-transparent'
    ]" 
    :style="{ zIndex: zIndex.mainHeader }"
  >
    <div class="container mx-auto flex items-center h-full px-3">

      <div class="flex items-center gap-7">
        <NuxtLink :to="{ name: 'index' }" class="inline-flex items-center gap-2">
          <Logo />
          <span class="text-xl font-mono font-semibold text-default-700">Doodle</span>
        </NuxtLink>

        <!-- <div class="relative">
          <button type="button" class="btn py-2 btn-transparent text-default-500 gap-3">
            <Icon name="heroicons:magnifying-glass" class="w-5 h-5" /> Tìm kiếm sản phẩm...
            <Shortcut class="text-sm text-default-300" value="^ K" />
          </button>
        </div> -->
      </div>
    
      <div class="ml-auto flex items-center justify-end gap-7">
        <div class="flex items-center gap-5">
          
          
        </div>

        <div class="w-[1px] h-6 bg-default-300"></div>

        <div class="flex items-center gap-7">
          <NuxtLink
            class="cursor-pointer text-default-700 hover:text-primary-500"
          >
            <Icon name="heroicons:shopping-bag" class="w-6 h-6" />
          </NuxtLink>

          <NuxtLink
            class="cursor-pointer text-default-700 hover:text-primary-500"
          >
            <Icon name="heroicons:user-circle" class="w-7 h-7" />
          </NuxtLink>
        </div>
        
      </div>
    </div>
  </header>
</template>