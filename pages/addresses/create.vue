<script lang="ts" setup>
definePageMeta({
  layout: 'personal',
  middleware: ['auth'],
})

useHead({ title: 'Thêm địa chỉ mới' })
useMapHead()

const toast = useToast()
const createAddressLoading = ref(false)
const errorBag = useErrorBag()
const name = ref('')
const fullName = ref('')
const phoneNumber = ref('')
const province = ref()
const district = ref()
const ward = ref()
const streetName = ref()
const streetNumber = ref()
const coordinates = ref<{ lat?: number, lng?: number }>({ lat: undefined, lng: undefined })
const description = ref('')

const { data: total } = await useAsyncData<any>('total',
  async () => (await useCountAddressMetricApi('total')).data.data.value
)

if (total.value >= 5) {
  navigateTo({ name: 'addresses' })
}

async function submitCreateAddress() {
  createAddressLoading.value = true

  await useCreateAddressApi({
    name: name.value,
    description: description.value,
    province_id: province.value?.id,
    district_id: district.value?.id,
    ward_id: ward.value?.id,
    street_name: streetName.value,
    street_number: streetNumber.value,
    coordinates: {
      lat: coordinates.value.lat,
      lng: coordinates.value.lng
    },
    contact: {
      full_name: fullName.value,
      phone_number: phoneNumber.value,
    }
  })
    .then(res => {
      toast.success('Đã tạo địa chỉ mới thành công!')
      navigateTo({ name: 'addresses' })
    })
    .catch(err => {
      errorBag.errors.value = err.response.data.errors
      toast.error('Vui lòng kiểm tra lại trường dữ liệu.')
    })
    .finally(() => setTimeout(() => createAddressLoading.value = false, 200))
}
</script>

<template>
  <div class="w-full lg:max-w-2xl mx-auto">
    <h1 class="text-2xl font-light">Thêm địa chỉ mới</h1>

    <form method="PUT" @submit.prevent="submitCreateAddress">
      <div class="divide-y divide-default-500/10 mt-7">
        <div class="py-7 flex flex-col gap-2">
          <label for="name" class="font-semibold">Tên địa chỉ</label>
          <FormTextInput
            id="name"
            v-model="name"
            :error-bag="errorBag"
          />
        </div>

        <div class="py-7 flex flex-col gap-2">
          <label for="contact.full_name" class="font-semibold">Họ tên người nhận</label>
          <FormTextInput
            id="contact.full_name"
            v-model="fullName"
            :error-bag="errorBag"
          />
        </div>

        <div class="py-7 flex flex-col gap-2">
          <label for="contact.phone_number" class="font-semibold">Số điện thoại</label>
          <FormTextInput
            id="contact.phone_number"
            v-model="phoneNumber"
            :error-bag="errorBag"
          />
        </div>

        <div class="py-7 flex flex-col gap-2">
          <label for="province_id" class="font-semibold">Tỉnh thành</label>
          <FormProvinceInput
            id="province_id"
            v-model="province"
            :error-bag="errorBag"
          />
        </div>

        <div class="py-7 flex flex-col gap-2">
          <label for="district_id" class="font-semibold">Quận/huyện/thành phố</label>
          <FormDistrictInput
            id="district_id"
            v-model="district"
            :province="province"
            :error-bag="errorBag"
          />
        </div>

        <div class="py-7 flex flex-col gap-2">
          <label for="ward_id" class="font-semibold">Phường/xã</label>
          <FormWardInput
            id="ward_id"
            v-model="ward"
            :district="district"
            :error-bag="errorBag"
          />
        </div>

        <div class="py-7 grid grid-cols-2 gap-5">
          <div class="flex flex-col gap-2">
            <label for="street_number" class="font-semibold">Số nhà</label>
            <FormTextInput
              id="street_number"
              v-model="streetNumber"
              :error-bag="errorBag"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="street_name" class="font-semibold">Tên đường</label>
            <FormTextInput
              id="street_name"
              v-model="streetName"
              :error-bag="errorBag"
            />
          </div>
        </div>

        <div class="py-7 flex flex-col gap-2">
          <label for="coordinates" class="font-semibold">Tọa độ</label>
          <FormCoordinatesInput
            lat-input-id="address.lat"
            lng-input-id="address.lng"
            v-model="coordinates"
            id="coordinates"
            :address="ref({
              province: province,
              district: district,
              ward: ward,
              streetName: streetName,
              streetNumber: streetNumber
            })"
            :error-bag="errorBag"
          />
        </div>

        <div class="py-7 flex flex-col gap-2">
          <label for="description" class="font-semibold">Ghi chú</label>
          <FormTextInput
            id="description"
            v-model="description"
            :error-bag="errorBag"
          />
        </div>
        
      </div>

      <div class="flex items-center gap-2 mt-7">
        <button type="submit" class="btn btn-primary">
          <Icon name="heroicons:check-circle" class="w-5 h-5" v-show="!createAddressLoading" />
          <IconLoading v-show="createAddressLoading" />
          Tạo mới
        </button>
      </div>
    </form>
  </div>
</template>