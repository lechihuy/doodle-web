<script lang="ts" setup>
definePageMeta({
  layout: 'blank',
  middleware: ['guest']
})

useHead({ title: 'Khôi phục mật khẩu' })

const toast = useToast()
const resetCustomerPasswordLoading = ref(false)
const email = ref('')
const newPassword = ref('')
const newPassswordConfirmation = ref('')
const otpToken = ref('')
const errorBag = useErrorBag()

async function submit() {
  resetCustomerPasswordLoading.value = true

  await useResetCustomerPasswordApi({
    email: email.value,
    new_password: newPassword.value,
    new_password_confirmation: newPassswordConfirmation.value,
  }, { 'OTP-Token': otpToken.value })
    .then(() => {
      toast.success('Khôi phục mật khẩu thành công, vui lòng đăng nhập lại!')
      navigateTo({ name: 'login' })
    })
    .catch(err => {
      if (err.response.status === 419) otpToken.value = ''

      errorBag.errors.value = err.response.data.errors
    })
    .finally(() => setTimeout(() => resetCustomerPasswordLoading.value = false, 200))
}

</script>

<template>
  <div class="relative min-h-screen flex flex-1 flex-col overflow-hidden px-4 py-8 sm:px-6 lg:px-8 bg-default-50">
    <img src="/images/beams-register.png" alt="" class="absolute left-0 top-0 w-[90.4375rem] max-w-none">

    <div class="absolute inset-0 text-slate-900/[0.07] [mask-image:linear-gradient(to_top,transparent,white,transparent)]"><svg class="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid-bg" width="32" height="32" patternUnits="userSpaceOnUse" x="100%" patternTransform="translate(0 -1)"><path d="M0 32V.5H32" fill="none" stroke="currentColor"></path></pattern></defs><rect width="100%" height="100%" fill="url(#grid-bg)"></rect></svg></div>
  
    <div class="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12 -mx-3 xs:mx-0">
      <NuxtLink :to="{ name: 'index' }" class="inline-flex items-center gap-2 mb-16">
        <Logo />
        <span class="text-2xl font-mono font-semibold text-default-700">Doodle</span>
      </NuxtLink>

      <form action="/login" class="w-full max-w-sm flex flex-col gap-5 p-7 bg-white rounded-xl shadow-xl ring-1 ring-default-900/10" @submit.prevent="submit">
        <h1 class="text-lg text-center tracking-wide font-semibold text-default-700">Khôi phục mật khẩu</h1>
        
        <div class="flex flex-col gap-1">
          <label for="email" class="block text-sm font-semibold leading-6">Địa chỉ e-mail</label>
          <FormVerifiedEmailInput
            id="email"
            :error-bag="errorBag"
            v-model:email="email"
            v-model:otp-token="otpToken"
            :is-exists="true"
          />
        </div>
      
        <div class="flex flex-col gap-1">
          <label for="new_password" class="block text-sm font-semibold leading-6 text-gray-900">Mật khẩu mới</label>
          <FormPasswordInput
            id="new_password" 
            v-model="newPassword"
            :error-bag="errorBag"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="new_password_confirmation" class="block text-sm font-semibold leading-6 text-gray-900">Nhập lại mật khẩu mới</label>
          <FormPasswordInput
            id="new_password_confirmation" 
            v-model="newPassswordConfirmation"
            :error-bag="errorBag"
          />
        </div>

        <MagicButton>
          <button type="submit" class="btn bg-default-900 btn-large text-white btn-block">
            <IconLoading v-show="resetCustomerPasswordLoading" />
            Khôi phục
          </button>
        </MagicButton>

      </form>
    </div>

    <footer class="relative">
      <div class="flex items-center gap-4 justify-center">
        <p class="text-default-700">Đã có tài khoản?</p>
        <NuxtLink class="btn btn-transparent btn-sm" :to="{ name: 'login' }">
          <span>Trở về đăng nhập</span>
        </NuxtLink>
      </div>
    </footer>
  </div>
</template>