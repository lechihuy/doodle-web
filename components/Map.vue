<script setup lang="ts">
const props = defineProps({
  coordinates: Object,
})
const mapContainer = ref()
let tt: any
const hasError = ref(false)
let map: any

onMounted(() => {
  tt = window.tt
  try {
    map = tt.map({
      key: '8dyy4lomiioZojfaw4lD4fAFOaq6s7EI',
      container: mapContainer.value,
      center: props.coordinates,
      zoom: 18,
    })

    map.addControl(new tt.ScaleControl())
    map.addControl(new tt.FullscreenControl())
    map.addControl(new tt.NavigationControl())
    new tt.Marker().setLngLat(props.coordinates as tt.LngLatLike).addTo(map)

    const resizeObserver = new ResizeObserver(() => map.resize())
    resizeObserver.observe(mapContainer.value)
  } catch (err) {
    hasError.value = true
  }
})
</script>

<template>
  <div v-if="!hasError" ref="mapContainer" class="w-full !z-0"></div>
  <div v-else class="w-full flex items-center justify-center bg-default-100">
    <div class="w-96 max-w-full flex flex-col justify-center items-center gap-2 text-default-500">
      <Icon name="heroicons:exclamation-circle" class="w-10 h-10" />
      <span class="font-semibold">Không thể tải bản đồ xem trước</span>
      <span class="text-sm text-center">Điều này có thể do thông tin tọa độ không hợp lệ hoặc lỗi bên phía thứ ba, vui lòng kiểm tra và thử lại.</span>
    </div>
  </div>
</template>