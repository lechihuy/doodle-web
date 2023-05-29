<script lang="ts" setup>
definePageMeta({
  layout: 'personal',
  middleware: ['auth'],
})

useHead({ title: 'Chi tiết địa chỉ' })
useMapHead()

const toast = useToast()
const route = useRoute()
const id = route.params.id as string

const { data: address } = await useAsyncData<any>('address',
  async () => (await useDetailAddressApi(id)).data.data
)

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
      Chi tiết địa chỉ
    </h1>

    <div class="divide-y divide-default-500/10 mt-7">
      <div class="py-7 flex flex-col gap-2">
        <label for="name" class="font-semibold">Tên địa chỉ</label>
        {{ address.name }}
      </div>

      <div class="py-7 flex flex-col gap-2">
        <label for="contact.full_name" class="font-semibold">Họ tên người nhận</label>
        {{ address.contact.full_name }}
      </div>

      <div class="py-7 flex flex-col gap-2">
        <label for="contact.phone_number" class="font-semibold">Số điện thoại</label>
        {{ address.contact.phone_number }}
      </div>

      <div class="py-7 flex flex-col gap-2">
        <label for="province_id" class="font-semibold">Địa chỉ</label>
        <p>{{ address.full_address }}</p>
        <div class="relative w-full h-72 sm:h-96 z-[1] rounded-lg overflow-hidden" v-if="address.lat && address.lng">
          <Map :coordinates="{
            lat: address.lat,
            lng: address.lng
          }" class="h-full" />
        </div>  
      </div>

      <div class="py-7 flex flex-col gap-2">
        <label for="description" class="font-semibold">Ghi chú</label>
        <span v-if="address.description">{{ address.description }}</span>
        <span v-else>&mdash;</span>
      </div>
      
    </div>

    <div class="flex items-center gap-2 mt-7">
      <a @click="openDeleteConfirmationModal" v-if="address.deletable" class="flex items-center gap-2 text-default-500 hover:cursor-pointer hover:text-danger-500">
        <Icon name="heroicons:trash" class="w-5 h-5" /> Xóa
      </a>
    </div>

  </div>
</template>