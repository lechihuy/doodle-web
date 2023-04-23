<script setup lang="ts">
const props = defineProps({
  modelValue: Object,
})
const emit = defineEmits(['update:model-value'])
const mapContainer = ref()
let tt: any
const hasError = ref(false)
const coordinates = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:model-value', value)
})
let map: any
let currentMarker: any

onMounted(() => {
  tt = window.tt

  try {
    map = tt.map({
      key: '8dyy4lomiioZojfaw4lD4fAFOaq6s7EI',
      container: mapContainer.value,
      center: coordinates.value,
      zoom: 18,
    })

    map.addControl(new tt.ScaleControl())
    map.addControl(new tt.FullscreenControl())
    map.addControl(new tt.NavigationControl())
    currentMarker = new tt.Marker().setLngLat(coordinates.value as tt.LngLatLike).addTo(map)

    map.on('click', (event: any) => {
      coordinates.value!.lat = event.lngLat.lat
      coordinates.value!.lng = event.lngLat.lng
    })

    const resizeObserver = new ResizeObserver(() => map.resize())
    resizeObserver.observe(mapContainer.value)
  } catch (err) {
    hasError.value = true
  }
})

watch(coordinates, () => {
  if (map) {
    currentMarker.remove()
    currentMarker = new tt.Marker().setLngLat(coordinates.value as tt.LngLatLike).addTo(map)
    map.flyTo({ center: coordinates.value, zoom: 18 });
  }
}, { deep: true })
</script>

<template>
  <div v-if="!hasError" ref="mapContainer" class="w-full h-full"></div>
  <div v-else class="w-full flex items-center justify-center bg-default-100">
    <div class="w-96 max-w-full flex flex-col justify-center items-center gap-2 text-default-500">
      <Icon name="heroicons:exclamation-circle" class="w-10 h-10" />
      <span class="font-semibold">Không thể tải bản đồ xem trước</span>
      <span class="text-sm text-center">Điều này có thể do thông tin tọa độ không hợp lệ hoặc lỗi bên phía thứ ba, vui lòng kiểm tra và thử lại.</span>
    </div>
  </div>
</template>