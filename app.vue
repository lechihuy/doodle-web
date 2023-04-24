<script lang="ts" setup>
onBeforeMount(() => {
  useIsMac().value = navigator.platform.indexOf('Mac') === 0
})

useHead({
  bodyAttrs: {
  },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/images/doodle.ico' },
    { rel: 'apple-touch-icon', href: '/images/doodle.ico', sizes: '512x512' }
  ]
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage :key="$route.fullPath" />
  </NuxtLayout>

  <Toast />
  <ActionConfirmationModal />
</template>
