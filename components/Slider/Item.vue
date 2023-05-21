<script lang="ts" setup>
const props = defineProps({
  index: { type: [Number, String], required: true }
})

const currentIndex = inject('current-index')
</script>

<template>
  <div class="h-full w-full translation duration-1000" :class="{
    'inline-block': currentIndex == index,
    'hidden': currentIndex != index,
  }">
    <slot></slot>
  </div>
</template>