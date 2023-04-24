<script setup lang="ts">
const actionConfirmationModal = useActionConfirmationModal()
</script>

<template>
  <HeadlessTransitionRoot appear :show="actionConfirmationModal.shown" as="template">
    <HeadlessDialog as="div" @close="actionConfirmationModal.close" class="relative" :style="{ zIndex: zIndex.modal }">
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
              <div class="p-7">
                <HeadlessDialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                >
                  {{ actionConfirmationModal.title }}
                </HeadlessDialogTitle>

                <div class="mt-5">
                  <p class="text-sm text-gray-500">
                    {{ actionConfirmationModal.body }}
                  </p>
                </div>
              </div>

              <div class="px-7 py-3 bg-slate-100 flex items-center justify-end gap-2">
                <button type="button" class="btn btn-default" @click="actionConfirmationModal.close">Hủy</button>
                <button type="button" class="btn btn-primary" @click="actionConfirmationModal.accept">
                  <Icon name="heroicons:check-circle" class="w-5 h-5" v-show="!actionConfirmationModal.executing" />
                  <IconLoading v-show="actionConfirmationModal.executing" />
                  Đồng ý
                </button>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>