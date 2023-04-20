<script lang="ts" setup>
definePageMeta({
  layout: 'default',
  middleware: ['auth']
})

useHead({ title: 'Mở rộng thế giới mua sắm của bạn' })
</script>

<template>
  <Jumbotron />

  <BestSellingSection />

  <LatestProductSection />
</template>
