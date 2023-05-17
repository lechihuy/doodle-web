<script setup lang="ts">
const props = defineProps({
  images: { type: Array },
})

const focusing = ref(0)
function focus(index: number) {
  focusing.value = index
}
</script>

<template>
  <div class="flex flex-col 2xl:flex-row gap-3 w-full">
    <div class="aspect-square 2xl:order-1 border border-default-200 rounded-lg w-full">
      <nuxt-img :src="images[focusing]" class="aspect-square rounded-lg" />
    </div>
    <div class="flex 2xl:flex-col items-center gap-3">
      <div v-for="(image, index) in images" :key="index" class="border border-default-200 rounded-lg w-24 h-24 cursor-pointer" @click="focus(index)">
        <nuxt-img :src="image" class="w-full h-full rounded-lg" :class="{ 'border-2 border-primary-500': index === focusing }" />
      </div>
    </div>
</div>
</template>