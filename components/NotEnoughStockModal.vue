<script setup lang="ts">
const notEnoughStockModal = useNotEnoughStockModal()
const cart = useCart()
</script>

<template>
  <HeadlessTransitionRoot appear :show="notEnoughStockModal.shown" as="template">
    <HeadlessDialog as="div" @close="notEnoughStockModal.close" class="relative" :style="{ zIndex: zIndex.modal }">
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
              class="w-full max-w-md transform rounded-lg bg-white text-left align-middle shadow-xl transition-all"
            >
              <div class="p-7 flex flex-col items-center justify-center gap-4">
                <div class="bg-warning-100 w-14 h-14 rounded-full flex items-center justify-center">
                  <Icon name="heroicons:exclamation-triangle" class="w-8 h-8 text-warning-900" />
                </div>
                <template v-if="notEnoughStockModal.type == 'OUT_OF_STOCK'">
                  <h3 class="text-xl leading-6 font-semibold text-default-700">Sản phẩm đã hết hàng</h3>
                  <p class="text-center text-default-500 text-sm">Quý khách có thể chọn chi nhánh khác ở bên dưới và thử lại.</p>
                </template>
                <template v-else>
                  <h3 class="text-xl leading-6 font-semibold text-default-700">Số lượng tồn kho không đủ</h3>
                  <p class="text-center text-default-500 text-sm">Số lượng đã đạt tối đa số lượng tồn kho mà chi nhánh gần nhất có thể cung cấp, quý khách có thể chọn chi nhánh khác ở bên dưới và thử lại.</p>
                </template>
                <FormSwitchCartBranchInput />
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>