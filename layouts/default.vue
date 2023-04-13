<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-default-100'
  },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/images/doodle.ico' }
  ]
})

</script>
<template>
  <slot  />
</template>