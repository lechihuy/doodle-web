<script lang="ts" setup>
definePageMeta({
  layout: 'personal',
  middleware: ['auth'],
})

useHead({ title: 'Đổi mật khẩu' })

const toast = useToast()
const changePasswordLoading = ref(false)
const password = ref('')
const newPassword = ref('')
const newPasswordConfirmation = ref('')
const errorBag = useErrorBag()

async function submitChangeCustomerPassword() {
  changePasswordLoading.value = true

  await useChangeCustomerPasswordApi({
    password: password.value,
    new_password: newPassword.value,
    new_password_confirmation: newPasswordConfirmation.value
  })
    .then(res => {
      toast.success('Đã thay đổi mật khẩu thành công!')
      password.value = ''
      newPassword.value = ''
      newPasswordConfirmation.value = ''
    })
    .catch(err => {
      errorBag.errors.value = err.response.data.errors
    })
    .finally(() => setTimeout(() => changePasswordLoading.value = false, 200))
}
</script>

<template>
  <div class="w-full lg:max-w-2xl mx-auto">
    <h1 class="text-2xl font-light mb-1">Đổi mật khẩu</h1>
      <p class="text-default-500 text-light text-sm">
        Bao gồm các thông tin cơ bản của khách hàng
      </p>

    <form method="PUT" @submit.prevent="submitChangeCustomerPassword">
      <div class="divide-y divide-default-500/10 mt-7">
        <div class="py-7 flex flex-col gap-2">
          <label for="password" class="font-semibold">Mật khẩu hiện tại</label>
          <FormPasswordInput
            id="password"
            v-model="password"
            :error-bag="errorBag"
          />
        </div>
        <div class="py-7 flex flex-col gap-2">
          <label for="new_password" class="w-36 font-semibold">Mật khẩu mới</label>
          <FormPasswordInput
            id="new_password"
            v-model="newPassword"
            :error-bag="errorBag"
          />
        </div>
        <div class="py-7 flex flex-col gap-2">
          <label for="new_password_confirmation" class="font-semibold">Nhập lại mật khẩu mới</label>
          <FormPasswordInput
            id="new_password_confirmation"
            v-model="newPasswordConfirmation"
            :error-bag="errorBag"
          />
        </div>
      </div>

      <div class="flex items-center gap-2 mt-7">
        <button type="submit" class="btn btn-primary">
          <Icon name="heroicons:check-circle" class="w-5 h-5" v-show="!changePasswordLoading" />
          <IconLoading v-show="changePasswordLoading" />
          Lưu thay đổi
        </button>
      </div>
    </form>
  </div>
</template>