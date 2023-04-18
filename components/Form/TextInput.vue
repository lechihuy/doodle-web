<script lang="ts" setup>
const props = defineProps({
  id: { type: String, required: true },
  modelValue: String,
  errorBag: { type: ErrorBag, default: null }
})

const emit = defineEmits(['update:model-value'])

const text = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value)
})

function clearErrorBag() {
  props.errorBag?.clear(props.id)
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <input
      :id="id"
      type="text" 
      class="form-input "
      v-model="text"
      :class="{ 
        'border-danger-500': errorBag.get(id)?.length > 0,
      }"
      @input="clearErrorBag"
    />

    <div v-show="errorBag && errorBag.get(id)?.length > 0" class="text-sm text-danger-500 flex flex-col gap-1">
      <small v-for="(error, index) in props.errorBag.get(props.id)" :key="index">&bull; {{ error }}</small>
    </div>
  </div>
</template>