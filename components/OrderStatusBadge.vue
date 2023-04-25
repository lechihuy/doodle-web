<script lang="ts" setup>
const props = defineProps({
  status: { type: String, required: true }
})
</script>

<template>
  <span
    class="inline-block font-semibold text-xs px-2 py-1 rounded-full bg-default-100"
    :class="{
      '!bg-success-100 !text-success-900': status === 'accepted',
      '!bg-primary-100 !text-primary-900': status === 'preparing',
      '!bg-primary-500 !text-white': status === 'prepared',
      '!bg-warning-100 !text-warning-900': status === 'delivering',
      '!bg-danger-100 !text-danger-900': status === 'canceled',
      '!bg-success-500 !text-white': status === 'completed',
    }"
  >
    {{ ORDER_STATUS.find((item) => item.value === status)?.label  }}
  </span>
</template>