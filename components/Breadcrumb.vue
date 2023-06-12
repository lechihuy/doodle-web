<script setup lang="ts">
const props = defineProps({
  items: Array<any>
})
</script>

<template>
  <div class="flex items-center gap-2 font-semibold flex-wrap">
    <NuxtLink :to="{ name: 'index' }" class="text-primary-500 mb-1 hover:text-primary-900">
      <Icon name="heroicons:home-solid" class="w-4 h-4" />
    </NuxtLink>
    <template v-for="(item, index) in items" :key="index">
      <span class="text-sm text-default-300">/</span>
      <NuxtLink :to="item.to" class="text-primary-500 hover:text-primary-900">
        {{ item.label }}
      </NuxtLink>
    </template>
  </div>
</template>