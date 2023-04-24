<script setup lang="ts">
const props = defineProps({
  id: { type: String, required: true },
  errorBag: { type: ErrorBag, default: useErrorBag() },
  modelValue: Object,
  latInputId: { type: String, required: true },
  lngInputId: { type: String, required: true },
  address: Object,
})
const emit = defineEmits(['update:model-value'])
const coordinates = computed<any>({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value)
})
const isLoadingFilterGeocodes = ref(false)
const filteredGeocodes = ref()

async function determineCoordinatesFromClipBoard() {
  const clipboard = await navigator.clipboard.readText()
  const rawCoordinates = clipboard.replace(' ', '').split(',')

  if (rawCoordinates.length !== 2) return

  coordinates.value!.lat = parseFloat(rawCoordinates[0]) >= -90 && parseFloat(rawCoordinates[0]) <= 90
      ? rawCoordinates[0] : rawCoordinates[1]
  coordinates.value!.lng = parseFloat(rawCoordinates[0]) >= -180 && parseFloat(rawCoordinates[0]) <= 180
      ? rawCoordinates[1] : rawCoordinates[0]
}

function canGeolocation() {
  return !! (props.address!.value.province?.id && props.address!.value.district?.id && props.address!.value.ward?.id
      && props.address!.value.streetName && props.address!.value.streetNumber)
}

async function fetchGeocodes() {
  isLoadingFilterGeocodes.value = true

  filteredGeocodes.value = await useIndexGeocodesApi({
    country_subdivision: props.address!.value.province.nameWithType,
    municipality_subdivision: props.address!.value.district.nameWithType,
    street_name: props.address!.value.streetName,
    street_number: props.address!.value.streetNumber,
  }).then(res => res.data.data)
    .finally(() => isLoadingFilterGeocodes.value = false)
}

function selectGeocode(geocode: any) {
  coordinates.value!.lat = geocode.coordinates.lat.value
  coordinates.value!.lng = geocode.coordinates.lng.value
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex items-center gap-1 relative">
      <input
        type="text"
        class="form-input"
        placeholder="Vĩ độ"
        :class="{ 'border-danger-500 focus:border-danger-500': props.errorBag.get(latInputId).length }"
        v-model="coordinates.lat"
        @paste="determineCoordinatesFromClipBoard"
      />
      <input
        type="text"
        class="form-input"
        placeholder="Kinh độ"
        :class="{ 'border-danger-500 focus:border-danger-500': props.errorBag.get(lngInputId).length }"
        v-model="coordinates.lng"
        @paste="determineCoordinatesFromClipBoard"
      />

      <HeadlessMenu as="div" class="inline-block text-left">
        <HeadlessMenuButton
          class="btn btn-default px-2.5 aspect-square" :disabled="!canGeolocation()" @click="fetchGeocodes"
        >
          <IconLoading v-if="isLoadingFilterGeocodes" class="w-5 h-5" />
          <Icon v-else name="heroicons:map-pin" class="w-5 h-5" />
        </HeadlessMenuButton>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
          v-show="!isLoadingFilterGeocodes"
        >
          <HeadlessMenuItems
            class="absolute right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            :style="{ zIndex: zIndex.dropdown }"
          >
            <div class="divide-y divide-default-200"  v-show="filteredGeocodes.length > 0">
              <HeadlessMenuItem v-slot="{ active }"
                v-for="(geocode, index) in filteredGeocodes"
                :key="index"
                as="template"
                @click="selectGeocode(geocode)"
              >
                <div :class="[
                 'px-3 py-2 text-sm first:rounded-t last:rounded-b',
                  active ? 'bg-primary-600 text-white cursor-pointer' : 'text-default-900',
                ]">
                    {{ geocode.full_address }}
                </div>
              </HeadlessMenuItem>
            </div>

            <div v-show="filteredGeocodes.length === 0" class="px-3 py-2 text-sm text-default-500">Không tìm thấy kết quả nào</div>
          </HeadlessMenuItems>
        </transition>
      </HeadlessMenu>

    </div>

    <div class="relative w-full h-72 sm:h-96 mt-2 rounded-lg overflow-hidden" v-if="coordinates.lat && coordinates.lng">
      <FormMapInput class="h-full" v-model="coordinates" />
    </div>

    <div v-if="props.errorBag.get(id) || props.errorBag.get(latInputId) || props.errorBag.get(lngInputId)" class="text-sm text-danger-500 flex flex-col gap-1">
      <small v-for="(error, index) in [
        ...props.errorBag.get(id),
        ...props.errorBag.get(latInputId),
        ...props.errorBag.get(lngInputId)
      ]" :key="index">&bull; {{ error }}</small>
    </div>
  </div>
</template>