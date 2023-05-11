<script setup lang="ts">
const props = defineProps({
  value: String,
})
</script>

<template>
  <div class="group cursor-pointer relative z-[1]">
      <slot></slot>
      <div v-if="value" class="opacity-0 bg-black left-1/2 select-none shadow -translate-x-1/2 whitespace-nowrap text-white text-center text-xs rounded-md absolute z-[1] group-hover:opacity-100 mb-1 bottom-full px-1.5 py-1 pointer-events-none">
        {{ value }}
        <svg class="absolute text-black h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255" xml:space="preserve"><polygon class="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
      </div>
    </div>
</template>