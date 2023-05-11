<script setup lang="ts">
const voucherModal = useVoucherModal()
</script> 

<template>
  <HeadlessTransitionRoot appear :show="voucherModal.shown" as="template">
    <HeadlessDialog as="div" @close="voucherModal.close" class="relative" :style="{ zIndex: zIndex.modal }">
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-70" />
      </HeadlessTransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel
              class="w-full max-w-lg transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all"
            >
              <div>
                <HeadlessDialogTitle
                    as="h3"
                    class="px-7 py-5 border-b border-default-100 text-lg font-medium flex items-center gap-2 leading-6 text-gray-900 bg-default-50"
                >
                  <Icon name="heroicons:ticket" class="w-6 h-6" /> Áp dụng phiếu ưu đãi
                  <Icon name="heroicons:x-mark" @click="voucherModal.close" class="ml-auto cursor-pointer w-6 h-6" />
                </HeadlessDialogTitle>

                <div class="p-7">
                  <p class="font-bold text-default-700 mb-2">Có thể áp dụng</p>
                  <div class="flex flex-col gap-3">
                    <Voucher v-for="voucher in voucherModal.vouchers.filter((voucher) => voucher.applicable)" :key="voucher.id" :voucher="voucher" />
                  </div>

                  <p class="font-bold text-default-700 mb-2 mt-5">Chưa đủ điều kiện</p>
                  <div class="flex flex-col gap-3">
                    <Voucher v-for="voucher in voucherModal.vouchers.filter((voucher) => !voucher.applicable)" :key="voucher.id" :voucher="voucher" />
                  </div>
                </div>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>