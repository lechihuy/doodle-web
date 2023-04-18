<script setup lang="ts">
const toast = useToast()

const CONTEXTS = {
  error: {
    container: {
      class: "bg-red-100 text-red-900 shadow-red-900/30",
    },
    icon: 'heroicons:exclamation-circle-solid',
  },
  success: {
    container: {
      class: "bg-green-100 text-green-900 shadow-green-900/30",
    },
    icon: 'heroicons:check-circle-solid',
  },
}

type ContextKeys = keyof typeof CONTEXTS

const styles = computed(() => CONTEXTS[toast.context as ContextKeys])
</script>

<template>
  <Transition name="slide-fade">
    <div
      class="fixed top-3 right-3 max-w-sm p-3 rounded-lg flex items-center shadow-lg gap-3 text-sm"
      :style="{ zIndex: zIndex.toast }"
      v-show="toast.shown"
      :class="styles.container.class"
    >
      <Icon class="w-6 h-6" :name="styles.icon" />
      {{ toast.message }}
      <Icon name="heroicons:x-mark" class="w-4 h-4 cursor-pointer" @click="toast.hide" />
    </div>
  </Transition>
</template>