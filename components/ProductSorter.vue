<script lang="ts" setup>
const props = defineProps({
  modelValue: { type: Object },
});

const emit = defineEmits(["update:model-value"]);

const sort = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:model-value", value),
});

const labelSort = ref("Không");
const mode = ref("");

watch (mode, () => {
  if (mode.value === 'price-asc') {
    sort.value!.sale_price = 'asc';
    labelSort.value = "Giá từ thấp đến cao";
  } else if (mode.value === 'price-desc') {
    sort.value!.sale_price = 'desc';
    labelSort.value = "Giá từ cao đến thấp";
  } else if (mode.value === '') {
    sort.value!.sale_price = null;
    labelSort.value = "Không";
  }
})
</script>

<template>
  <HeadlessListbox v-model="mode" as="div" class="relative z-[1] font-normal">
    <HeadlessListboxButton
      class="w-full cursor-default flex items-center rounded-lg bg-white btn btn-transparent text-sm"
    >
      <span class="block truncate">Sắp xếp: <strong class="font-bold">{{ labelSort }}</strong></span>
      <span
        class="pointer-events-none inset-y-0 right-0 flex items-center"
      >
        <Icon
          name="heroicons:chevron-up-down"
          class="h-5 w-5 text-default-400"
          aria-hidden="true"
        />
      </span>
    </HeadlessListboxButton>

    <transition
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <HeadlessListboxOptions
        class="absolute mt-1 z-[1] w-52 right-0 bg-white overflow-auto rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <HeadlessListboxOption
          v-slot="{ active, selected }"
          :value="''"
          as="template"
        >
          <li
            :class="[
              active ? 'bg-primary-100 text-primary-900' : 'text-default-900',
              'relative cursor-default select-none py-2 pl-10 pr-4',
            ]"
          >
            Không
            <span
              v-if="selected"
              class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-500"
            >
              <Icon name="heroicons:check" class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </HeadlessListboxOption>

        <HeadlessListboxOption
          v-slot="{ active, selected }"
          :value="'price-asc'"
          as="template"
        >
          <li
            :class="[
              active ? 'bg-primary-100 text-primary-900' : 'text-default-900',
              'relative cursor-default select-none py-2 pl-10 pr-4',
            ]"
          >
            Giá từ thấp đến cao
            <span
              v-if="selected"
              class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-500"
            >
              <Icon name="heroicons:check" class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </HeadlessListboxOption>

        <HeadlessListboxOption
          v-slot="{ active, selected }"
          :value="'price-desc'"
          as="template"
        >
          <li
            :class="[
              active ? 'bg-primary-100 text-primary-900' : 'text-default-900',
              'relative cursor-default select-none py-2 pl-10 pr-4',
            ]"
          >
            Giá từ cao đến thấp
            <span
              v-if="selected"
              class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-500"
            >
              <Icon name="heroicons:check" class="h-5 w-5" aria-hidden="true" />
            </span>
          </li>
        </HeadlessListboxOption>
      </HeadlessListboxOptions>
    </transition>
  </HeadlessListbox>
</template>