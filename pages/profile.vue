<script lang="ts" setup>
import { useEditProfileApi } from "~/composables"

definePageMeta({
  layout: 'personal',
  middleware: ['auth'],
})

useHead({ title: 'Hồ sơ' })

const toast = useToast()
const editProfileLoading = ref(false)
const currentCustomer = useCurrentCustomer()
const fullName = ref(currentCustomer.value?.full_name)
const gender = ref(currentCustomer.value?.gender)
const errorBag = useErrorBag()

async function submitEditProfile() {
  editProfileLoading.value = true

  await useEditProfileApi({
    full_name: fullName.value,
    gender: gender.value
  })
    .then(res => {
      toast.success('Đã cập nhật hồ sơ thành công!')
      currentCustomer.value = res.data.data
    })
    .catch(err => {
      errorBag.errors.value = err.response.data.errors
    })
    .finally(() => setTimeout(() => editProfileLoading.value = false, 200))
}
</script>

<template>
  <div class="w-full lg:max-w-2xl mx-auto">
    <h1 class="text-2xl font-light mb-1">Cập nhật hồ sơ</h1>
    <p class="text-default-500 text-light text-sm">
      Bao gồm các thông tin cơ bản của khách hàng
    </p>
    
    <form method="POST" @submit.prevent="submitEditProfile">
      <div class="divide-y divide-default-500/10 mt-7">
        <div class="py-7 flex flex-col gap-2">
          <label for="email" class="w-36 font-semibold">Địa chỉ e-mail</label>
          <p>{{ currentCustomer?.user.email }}</p>
        </div>
        <div class="py-7 flex flex-col gap-2">
          <label for="full_name" class="w-36 font-semibold">Họ tên</label>
          <FormTextInput
            id="full_name"
            class="grow relative z-[2]"
            v-model="fullName"
            :error-bag="errorBag"
          />
        </div>
        <div class="py-7 flex flex-col gap-2">
          <label for="gender" class="w-36 font-semibold">Giới tính</label>
          <FormGenderInput
            id="gender"
            class="grow relative z-[2]"
            v-model="gender"
            :error-bag="errorBag"
          />
        </div>
      </div>

      <div class="flex items-center gap-2 mt-7">
        <button type="submit" class="btn btn-primary">
          <Icon name="heroicons:check-circle" class="w-5 h-5" v-show="!editProfileLoading" />
          <IconLoading v-show="editProfileLoading" />
          Lưu thay đổi
        </button>
      </div>
    </form>
  </div>
</template>