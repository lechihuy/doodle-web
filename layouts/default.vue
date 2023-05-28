<script setup lang="ts">
import MainHeader from '~/layouts/partials/MainHeader.vue'
import MainFooter from '~/layouts/partials/MainFooter.vue'
</script>
<template>
  <MainHeader />

  <div class="min-h-screen">
    <slot />
  </div>

  <MainFooter />
</template>