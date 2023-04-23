<script setup lang="ts">
const props = defineProps({
  id: { type: String, required: true },
  modelValue: Object,
  errorBag: { type: ErrorBag, default: useErrorBag() },
});
const emit = defineEmits(["update:model-value"]);
const { $lodash } = useNuxtApp();
const province = <any>computed({
  get: () => props.modelValue,
  set: (value) => emit("update:model-value", value),
});
const query = ref('');
const filteredProvinces = ref<any>([]);
const loading = ref(false);

onBeforeMount(async () => {
  if (!province.value) {
    await fetchProvinces();
  } else {
    filteredProvinces.value.push(province.value as never);
  }
});

const inputProvince = $lodash.debounce(async (e) => {
  if (query.value === e.target.value.trim()) return;

  query.value = e.target.value.trim();

  props.errorBag.clear(props.id);

  await fetchProvinces();
}, 300);

async function fetchProvinces() {
  if (query.value == "") {
    filteredProvinces.value = [province.value as never];
    return;
  }

  loading.value = true;

  filteredProvinces.value = await useIndexProvinceApi({
    keyword: query.value,
  }).then((res) => {
    return res.data.data.map((province: any) => ({
      id: province.id,
      nameWithType: province.name_with_type,
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
      v-model="province"
      v-slot="{ open }"
    >
      <HeadlessComboboxButton
        class="select-none form-select text-left"
        :class="{
          'border-danger-500 focus:border-danger-500': errorBag.get(props.id).length,
        }"
      >
        <div v-if="province">
          {{ province.nameWithType }}
        </div>
        <div v-else class="text-default-500">Nhấp để chọn</div>
      </HeadlessComboboxButton>

      <div
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
              @input="inputProvince"
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
              v-if="filteredProvinces.length === 0 && query !== ''"
            >
              Không tìm thấy kết quả nào.
            </span>

            <HeadlessComboboxOption
              v-for="province in filteredProvinces"
              as="template"
              :key="province.id"
              :value="province"
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
                  {{ province.nameWithType }}
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