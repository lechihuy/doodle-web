<script lang="ts" setup>
const props = defineProps({
  id: { type: String, required: true },
  modelValue: Number,
  errorBag: { type: ErrorBag, default: null }
})

const emit = defineEmits(['update:model-value'])

const gender = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value)
})
</script>

<template>
  <HeadlessRadioGroup v-model="gender" as="div" class="flex items-center gap-7">
    <HeadlessRadioGroupOption
      as="template"
      v-for="gender in GENDERS"
      :key="gender.value"
      v-slot="{ active, checked }"
      :value="gender.value"
    >
      <div class="flex items-center gap-2 hover:cursor-pointer focus:outline-none">
        <div
          class="h-8 w-8 flex items-center justify-center rounded-full border border-default-300"
          :class="{
            'border-primary-500 bg-primary-50': gender.value === 1 && (active || checked),
            '!border-danger-500 bg-danger-50': gender.value === 0 && (active || checked),
            'border-purple-500 bg-purple-50': gender.value === 2 && (active || checked),
          }"
        >
          <Icon v-if="gender.value === 1" name="material-symbols:male-sharp" class="w-5 h-5" :class="[checked || active ? 'text-primary-500' : 'text-default-300']" />
          <Icon v-if="gender.value === 0" name="material-symbols:female-sharp" class="w-5 h-5" :class="[checked || active ? 'text-danger-500' : 'text-default-300']" />
          <Icon v-if="gender.value === 2" name="mdi:gender-male-female" class="w-5 h-5" :class="[checked || active ? 'text-purple-500' : 'text-default-300']" />

        </div>

        {{ gender.label }}
      </div>

     
    </HeadlessRadioGroupOption>
  </HeadlessRadioGroup>
</template>