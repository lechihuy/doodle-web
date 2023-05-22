<script lang="ts" setup>
onBeforeMount(() => {
  useIsMac().value = navigator.platform.indexOf('Mac') === 0
})

useHead({
  titleTemplate: (title) => `${title} | Doodle`,
  bodyAttrs: {
  },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/images/doodle.ico' },
    { rel: 'apple-touch-icon', href: '/images/doodle.ico', sizes: '512x512' }
  ]
})

const currentCustomer = useCurrentCustomer()
</script>

<template>
  <NuxtLayout>
    <NuxtPage :key="$route.fullPath" />

    <Toast />
    <ActionConfirmationModal />
    <MustBeLoginModal v-if="!currentCustomer" />
    <NotEnoughStockModal v-if="currentCustomer" />
  </NuxtLayout>
</template>
