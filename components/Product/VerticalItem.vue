<script lang="ts" setup>
const props = defineProps({
  id: { type: [String, Number] },
  thumbnail: { type: String, default: '' },
  name: { type: String, },
  salePrice: { type: [String, Number], required: true }
})
</script>

<template>
  <div class="flex flex-col overflow-hidden gap-3">
    <nuxt-img  :src="thumbnail" :alt="name" class="bg-default-50 rounded-md" />
    <div class="text-default-700 grid grid-cols-1 gap-1 grow content-between">
      <NuxtLink class="line-clamp-2">
        {{ name  }}
      </NuxtLink>
      <p class="font-bold">{{ currency(salePrice) }}</p>
    </div>
  </div>
</template>