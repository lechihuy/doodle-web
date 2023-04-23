<script setup lang="ts">
const props = defineProps({
  id: { type: String, required: true },
  modelValue: Object,
  errorBag: { type: ErrorBag, default: useErrorBag() },
  province: { type: Object, default: null },
});
const emit = defineEmits(["update:model-value"]);
const { $lodash } = useNuxtApp();
const district = <any>computed({
  get: () => props.modelValue,
  set: (value) => emit("update:model-value", value),
});
const query = ref("");
const filteredDistricts = ref<any>([]);
const loading = ref(false);
const province = computed(() => props.province);

onBeforeMount(async () => {
  if (!district.value) {
    await fetchDistricts();
  } else {
    filteredDistricts.value.push(district.value as never);
  }
});

watch(
  province,
  async () => {
    query.value = "";
    district.value = null;
    filteredDistricts.value.length = 0;
  },
  { deep: true }
);

const inputDistrict = $lodash.debounce(async (e) => {
  if (query.value === e.target.value.trim()) return;

  query.value = e.target.value.trim();

  props.errorBag.clear(props.id);

  await fetchDistricts();
}, 300);

async function fetchDistricts() {
  if (query.value == "") {
    filteredDistricts.value = [district.value as never];
    return;
  }

  loading.value = true;

  filteredDistricts.value = await useIndexDistrictApi({
    keyword: query.value,
    province_id: props.province.id,
    limit: 5,
  }).then((res) => {
    return res.data.data.map((district: any) => ({
      id: district.id,
      nameWithType: district.name_with_type,
    }));
  });

  setTimeout(() => (loading.value = false), 200);
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <HeadlessCombobox
      :key="province?.id"
      as="div"
      class="relative"
      v-model="district"
      v-slot="{ open }"
      :disabled="!province"
    >
      <HeadlessComboboxButton
        class="select-none form-select text-left"
        :class="{
          'border-danger-500 focus:border-danger-500': errorBag.get(props.id)
            .length,
          'cursor-not-allowed': !province,
        }"
      >
        <div v-if="district">
          {{ district.nameWithType }}
        </div>
        <div v-else>
          <span v-if="province" class="text-default-500">Nhấp để chọn</span>
          <span v-else class="text-default-300">Hãy chọn một tỉnh thành</span>
        </div>
      </HeadlessComboboxButton>

      <div class="absolute w-full transition mt-2 top-10 left-0" :style="{ zIndex: zIndex.dropdown }" v-show="open">
        <div
          class="rounded-md overflow-hidden bg-white shadow-lg ring-1 ring-default-300"
        >
          <div class="relative w-full flex">
            <HeadlessComboboxInput
              class="w-full form-input rounded-none border-none pr-9 placeholder:text-default-300"
              spellcheck="false"
              autocomplete="off"
              placeholder="Nhập từ khóa tìm kiếm..."
              @input="inputDistrict"
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
              v-if="filteredDistricts.length === 0 && query !== ''"
            >
              Không tìm thấy kết quả nào.
            </span>

            <HeadlessComboboxOption
              v-for="district in filteredDistricts"
              as="template"
              :key="district.id"
              :value="district"
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
                  {{ district.nameWithType }}
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