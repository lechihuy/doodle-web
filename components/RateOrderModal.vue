<script setup lang="ts">
const rateOrderModal = useRateOrderModal();
</script>

<template>
  <HeadlessTransitionRoot appear :show="rateOrderModal.shown" as="template">
    <HeadlessDialog
      as="div"
      @close="rateOrderModal.close"
      class="relative"
      :style="{ zIndex: zIndex.modal }"
    >
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
              <div class="p-7 flex flex-col items-center justify-center gap-5">
                <div
                  class="bg-default-50 w-14 h-14 rounded-full flex items-center justify-center"
                >
                  <Icon name="icon-park:thumbs-up" class="w-8 h-8" />
                </div>
                <h3 class="text-xl leading-6 font-semibold text-default-700">
                  Đánh giá đơn hàng
                </h3>

                <div class="flex items-center gap-3">
                  <template v-for="i in 5" :key="i">
                    <Icon
                      :name="
                        rateOrderModal.hoverRating >= i
                          ? 'teenyicons:star-solid'
                          : 'teenyicons:star-outline'
                      "
                      @mouseenter="rateOrderModal.mouseEnterStar(i)"
                      @mouseleave="rateOrderModal.mouseLeaveStar(i)"
                      @click="rateOrderModal.focusStar(i)"
                      class="w-8 h-8 cursor-pointer"
                      :class="[
                        rateOrderModal.hoverRating >= i ? 'text-yellow-500' : 'text-default-200'
                      ]"
                    />
                  </template>
                </div>

                <textarea v-model="rateOrderModal.feedback" cols="3" class="form-textarea" placeholder="Đánh giá của bạn về đơn hàng này..."></textarea>
              </div>
              <div class="px-7 py-3 bg-slate-100 flex items-center justify-end gap-2">
                <button type="button" class="btn btn-default" @click="rateOrderModal.close">Hủy</button>
                <button type="button" class="btn btn-primary" @click="rateOrderModal.submit" :disabled="!rateOrderModal.rating">
                  <Icon name="ph:paper-plane-tilt-bold" class="w-5 h-5" /> Gửi đánh giá
                </button>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>