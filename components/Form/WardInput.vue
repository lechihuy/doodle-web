<script setup lang="ts">
const props = defineProps({
  id: { type: String, required: true },
  modelValue: Object,
  errorBag: { type: ErrorBag, default: useErrorBag() },
  district: { type: Object, default: null },
});
const emit = defineEmits(["update:model-value"]);
const { $lodash } = useNuxtApp();
const ward = <any>computed({
  get: () => props.modelValue,
  set: (value) => emit("update:model-value", value),
});
const query = ref("");
const filteredWards = ref<any>([]);
const loading = ref(false);
const district = computed(() => props.district);
const dropdown = ref();

onBeforeMount(async () => {
  if (!ward.value) {
    await fetchWards();
  } else {
    filteredWards.value.push(ward.value as never);
  }
});

watch(
  district,
  async () => {
    query.value = "";
    ward.value = null;
    filteredWards.value.length = 0;
  },
  { deep: true }
);

const inputWard = $lodash.debounce(async (e) => {
  if (query.value === e.target.value.trim()) return;

  query.value = e.target.value.trim();

  props.errorBag.clear(props.id);

  await fetchWards();
}, 300);

async function fetchWards() {
  if (query.value == "") {
    filteredWards.value = [ward.value as never];
    return;
  }

  loading.value = true;

  filteredWards.value = await useIndexWardApi({
    keyword: query.value,
    district_id: props.district.id,
    limit: 5,
  }).then((res) => {
    return res.data.data.map((ward: any) => ({
      id: ward.id,
      nameWithType: ward.name_with_type,
    }));
  });

  setTimeout(() => (loading.value = false), 200);
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <HeadlessCombobox
      as="div"
      class="relative"
      v-model="ward"
      v-slot="{ open }"
      :disabled="!district"
    >
      <HeadlessComboboxButton
        class="select-none form-select text-left"
        :class="{
          'border-danger-500 focus:border-danger-500': errorBag.get(props.id)
            .length,
          'cursor-not-allowed': !district,
        }"
      >
        <div v-if="ward">
          {{ ward.nameWithType }}
        </div>
        <div v-else>
          <span v-if="district" class="text-default-500">Nhấp để chọn</span>
          <span v-else class="text-default-300"
            >Hãy chọn một quận/huyện/thành phố</span
          >
        </div>
      </HeadlessComboboxButton>

      <div
        ref="dropdown"
        class="absolute w-full transition mt-2 top-10 left-0"
        :style="{ zIndex: zIndex.dropdown }"
        v-show="open"
      >
        <div
          class="rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-default-300"
        >
          <div class="relative w-full flex">
            <HeadlessComboboxInput
              class="w-full form-input rounded-none border-none pr-9 placeholder:text-default-300"
              spellcheck="false"
              autocomplete="off"
              placeholder="Nhập từ khóa tìm kiếm..."
              @input="inputWard"
            />
            <IconLoading
              class="text-default-300 absolute top-2 right-3"
              v-show="loading"
            />
          </div>
          <HeadlessComboboxOptions
            class="focus:outline-none sm:text-sm border-t border-default-100"
            v-show="loading === false"
          >
            <span
              class="px-3 py-2 text-default-500 block"
              v-if="filteredWards.length === 0 && query !== ''"
            >
              Không tìm thấy kết quả nào.
            </span>

            <HeadlessComboboxOption
              v-for="ward in filteredWards"
              as="template"
              :key="ward.id"
              :value="ward"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-pointer select-none py-2 px-3"
                :class="{
                  'bg-primary-600 text-white': active,
                  'text-default-900': !active,
                }"
              >
                <div
                  class="truncate flex items-center gap-2"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ ward.nameWithType }}
                </div>
              </li>
            </HeadlessComboboxOption>
          </HeadlessComboboxOptions>
        </div>
      </div>
    </HeadlessCombobox>

    <div
      v-if="errorBag.get(props.id)"
      class="text-sm text-danger-500 flex flex-col gap-1"
    >
      <small v-for="(error, index) in errorBag.get(props.id)" :key="index"
        >&bull; {{ error }}</small
      >
    </div>
  </div>
</template>