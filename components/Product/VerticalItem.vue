<script lang="ts" setup>
const props = defineProps({
  id: { type: Number, required: true },
  slug: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  name: { type: String, },
  salePrice: { type: [String, Number], required: true },
  thumbnailStyle: { type: String, default: '' },
  canAddToCart: { type: Boolean, default: false, },
})

function detail() {
  navigateTo({ name: 'products-product', params: { product: props.slug } })
}
</script>

<template>
  <div @click.self="detail" class="flex cursor-pointer flex-col gap-3">
    <nuxt-img @click.self="detail" :src="thumbnail" :alt="name" class="bg-default-50 rounded-md" :class="thumbnailStyle" />
    <div @click="detail" class="text-default-700 grid grid-cols-1 gap-1 grow content-between">
      <p class="line-clamp-2 font-semibold text-primary-900">
        {{ name  }}
      </p>
      <p class="font-bold text-danger-500">{{ currency(salePrice) }}</p>
    </div>
    <AddToCartButton v-if="canAddToCart" :product-id="id" />
  </div>
</template>