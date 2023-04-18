<script lang="ts" setup>
const props = defineProps({
  value: String,
})

const value = useIsMac() ? props.value?.replace('^', '⌘') : props.value
</script>

<template>
  <kbd class="font-sans">{{ value }}</kbd>
</template>