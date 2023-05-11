<script lang="ts" setup>
const props = defineProps({
  voucher: { type: Object, required: true },
})

async function apply() {
  if (!props.voucher.applicable) return

  await useApplyVoucherApi(props.voucher.id)
    .then(async () => {
      await useCart().fetch()
    })
    .finally(() => {
      useVoucherModal().close()
    })
}
</script>

<template>
  <div class="overflow-hidden flex rounded-lg "
    :class="[voucher.applicable ? 'group hover:bg-primary-50 cursor-pointer' : 'cursor-not-allowed grayscale bg-default-50']"
    @click="apply"
  >
    <div class="w-20 flex items-center justify-center flex-none relative border border-default-200 rounded-s-lg border-r-0 group-hover:border-primary-200">
      <div class="absolute w-4 h-4 rounded-full border border-default-200 bg-white -top-2.5 -right-2.5 group-hover:border-primary-200"></div>
      <div class="absolute w-4 h-4 rounded-full border border-default-200 bg-white -bottom-2.5 -right-2.5 group-hover:border-primary-200"></div>
      <div>
        <Icon v-if="voucher.discount_type === 'discount-percent-on-bill'" name="heroicons:receipt-percent" class="w-10 h-10 text-primary-900" />
        <Icon v-if="voucher.discount_type === 'discount-money-on-bill'" name="tabler:report-money" class="w-10 h-10 text-primary-900" />
        <Icon v-if="voucher.discount_type === 'free-ship'" name="tabler:truck-delivery" class="w-10 h-10 text-primary-900" />
      </div>
    </div>
    <div class="grow border-l-4 border-dotted rounded-lg border-default-100 group-hover:border-primary-100">
      <div class="p-3 border flex flex-col gap-1 border-default-200 border-l-0 h-full rounded-lg group-hover:border-primary-200">
        <p class="font-bold text-primary-500">{{ voucher.name }}</p>
        <p class="text-sm text-default-700">{{ voucher.content }}</p>
        <p>Hết ngày <span class="font-semibold">{{ $moment(voucher.ended_at).format('DD-MM-YYYY') }}</span></p>
      </div>
    </div>
  </div>
</template>