<script setup lang="ts">
const mustBeLoginModal = useMustBeLoginModal()

function redirectTo(to: any) {
  mustBeLoginModal.close()
  navigateTo(to)
}
</script>

<template>
  <HeadlessTransitionRoot appear :show="mustBeLoginModal.shown" as="template">
    <HeadlessDialog as="div" @close="mustBeLoginModal.close" class="relative" :style="{ zIndex: zIndex.modal }">
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
              class="w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all"
            >
              <div class="p-7 flex flex-col items-center justify-center gap-4">
                <div class="bg-warning-100 w-14 h-14 rounded-full flex items-center justify-center">
                  <Icon name="heroicons:exclamation-triangle" class="w-8 h-8 text-warning-900" />
                </div>
                <h3 class="text-xl leading-6 font-semibold text-default-700">Vui lòng đăng nhập</h3>
                <p class="text-center text-default-500">Để có thể tiếp tục sử dụng tính năng này, vui lòng đăng nhập tài khoản khách hàng.</p>
              </div>

              <div class="p-7 pt-0 flex items-center justify-center gap-2">
                <MagicButton>
                  <button type="button" class="btn btn-transparent" @click="redirectTo({ name: 'register' })">Tạo tài khoản</button>
                </MagicButton>
                <button type="button" class="btn btn-primary" @click="redirectTo({ name: 'login' })">
                  Đăng nhập ngay
                </button>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>