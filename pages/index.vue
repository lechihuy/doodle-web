<script lang="ts" setup>
import MainFooter from '~/layouts/partials/MainFooter.vue'

definePageMeta({
  layout: 'default',
  middleware: ['optional-auth']
})

useHead({ title: 'Mở rộng thế giới mua sắm của bạn' })
</script>

<template>
  <Jumbotron />

  <BestSellingSection />

  <LatestProductSection />

  <BranchSection />
</template>
