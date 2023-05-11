<script lang="ts" setup>
const props = defineProps({
  id: { type: String, required: true },
  modelValue: String,
  errorBag: { type: ErrorBag, default: useErrorBag() },
  disabled: { type: Boolean, default: false, },
  placeholder: { type: String, default: null }
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
    <textarea
      :id="id"
      class="form-textarea"
      v-model="text"
      rows="3"
      spellcheck="false"
      :class="{ 
        'border-danger-500': errorBag && errorBag.get(id)?.length > 0,
      }"
      @input="clearErrorBag"
      :disabled="disabled"
      :placeholder="placeholder"
    ></textarea>

    <div v-show="errorBag && errorBag.get(id)?.length > 0" class="text-sm text-danger-500 flex flex-col gap-1">
      <small v-for="(error, index) in errorBag.get(props.id)" :key="index">&bull; {{ error }}</small>
    </div>
  </div>
</template>