<script lang="ts" setup>
definePageMeta({
  layout: 'personal',
  middleware: ['auth'],
})

useHead({ title: 'Sửa địa chỉ' })
useMapHead()


const route = useRoute()
const toast = useToast()
const editAddressLoading = ref(false)
const id = route.params.id as string
const errorBag = useErrorBag()

const { data: address } = await useAsyncData<any>('address',
  async () => (await useDetailAddressApi(id)).data.data
)

const name = ref(address.value.name)
const fullName = ref(address.value.contact.full_name)
const phoneNumber = ref(address.value.contact.phone_number)
const province = ref({
  id: address.value.province_id,
  nameWithType: address.value.province.name_with_type
})
const district = ref({
  id: address.value.district_id,
  nameWithType: address.value.district.name_with_type
})
const ward = ref({
  id: address.value.ward_id,
  nameWithType: address.value.ward.name_with_type
})
const streetName = ref(address.value.street_name)
const streetNumber = ref(address.value.street_number)
const coordinates = ref<{ lat?: number, lng?: number }>({
  lat: address.value.lat, 
  lng: address.value.lng 
})
const description = ref(address.value.description)

async function submitEditAddress() {
  editAddressLoading.value = true

  await useEditAddressApi(id, {
    name: name.value,
    description: description.value,
    province_id: province.value?.id,
    district_id: district.value?.id,
    ward_id: ward.value?.id,
    street_name: streetName.value,
    street_number: streetNumber.value,
    lat: coordinates.value.lat,
    lng: coordinates.value.lng,
    contact: {
      full_name: fullName.value,
      phone_number: phoneNumber.value,
    }
  })
    .then(res => {
      toast.success('Đã cập nhật địa chỉ thành công!')
      refreshNuxtData('addresses')
      navigateTo({ name: 'addresses' })
    })
    .catch(err => {
      errorBag.errors.value = err.response.data.errors
      toast.error('Vui lòng kiểm tra lại trường dữ liệu.')
    })
    .finally(() => setTimeout(() => editAddressLoading.value = false, 200))
}

function openDeleteConfirmationModal() {
  const modal = useActionConfirmationModal()
  modal.open({
    title: 'Xác nhận xóa địa chỉ',
    body: 'Hành động này không thể hoàn tác, bạn có chắc chắn muốn thực hiện?'
  })
  modal.onAccepted = () => {
    useDestroyAddressApi(id).then(() => {
      toast.success('Xóa địa chỉ thành công!')
      navigateTo({ name: 'addresses' })
    }).catch((err) => toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau.'))
  }
}
</script>

<template>
  <div class="w-full lg:max-w-2xl mx-auto">
    <h1 class="text-2xl font-light flex items-center gap-2">
      <NuxtLink :to="{ name: 'addresses' }" class="w-8 h-8 rounded-full border border-default-500 flex items-center justify-center">
        <Icon name="heroicons:chevron-left" class="w-5 h-5" />
      </NuxtLink>
      Sửa địa chỉ
    </h1>

    <form method="PUT" @submit.prevent="submitEditAddress">
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
            lat-input-id="lat"
            lng-input-id="lng"
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
          <Icon name="heroicons:check-circle" class="w-5 h-5" v-show="!editAddressLoading" />
          <IconLoading v-show="editAddressLoading" />
          Cập nhật
        </button>

        <a @click="openDeleteConfirmationModal" class="ml-auto flex items-center gap-2 text-default-500 hover:cursor-pointer hover:text-danger-500">
          <Icon name="heroicons:trash" class="w-5 h-5" /> Xóa
        </a>
      </div>
    </form>
  </div>
</template>