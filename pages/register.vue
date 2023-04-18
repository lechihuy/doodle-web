<script lang="ts" setup>
import { useRegisterCustomerApi } from "~/composables/repositories/authRepository"

definePageMeta({
  layout: 'blank',
  middleware: ['guest']
})

useHead({ title: 'Đăng ký tài khoản Doodle' })

const toast = useToast()
const registerCustomerLoading = ref(false)
const email = ref('')
const fullName = ref('')
const gender = ref(DEFAULT_GENDER.value)
const password = ref('')
const passswordConfirmation = ref('')
const otpToken = ref('')
const errorBag = useErrorBag()

async function submit() {
  registerCustomerLoading.value = true

  await useRegisterCustomerApi({
    email: email.value,
    full_name: fullName.value,
    gender: gender.value,
    password: password.value,
    password_confirmation: passswordConfirmation.value,
  }, { 'OTP-Token': otpToken.value })
    .then(res => {
      toast.success('Chào mừng bạn đã trở thành thành viên của Doodle!')
    })
    .catch(err => {
      if (err.response.status === 419) otpToken.value = ''

      errorBag.errors.value = err.response.data.errors
    })
    .finally(() => setTimeout(() => registerCustomerLoading.value = false, 200))
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
        <h1 class="text-lg text-center tracking-wide font-semibold text-default-700">Đăng ký tài khoản</h1>
        
        <div class="flex flex-col gap-1">
          <label for="email" class="block text-sm font-semibold leading-6">Địa chỉ e-mail</label>
          <FormVerifiedEmailInput
            id="email"
            :error-bag="errorBag"
            v-model:email="email"
            v-model:otp-token="otpToken"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="full_name" class="block text-sm font-semibold leading-6">Họ tên</label>
          <FormTextInput
            id="full_name" 
            v-model="fullName"
            :error-bag="errorBag"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="gender" class="block text-sm font-semibold leading-6">Giới tính</label>
          <FormGenderInput
            id="gender"
            v-model="gender"
            :error-bag="errorBag"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="password" class="block text-sm font-semibold leading-6 text-gray-900">Mật khẩu</label>
          <FormPasswordInput
            id="password" 
            v-model="password"
            :error-bag="errorBag"
          />
        </div>

        <div class="flex flex-col gap-1">
          <label for="password_confirmation" class="block text-sm font-semibold leading-6 text-gray-900">Nhập lại mật khẩu</label>
          <FormPasswordInput
            id="password_confirmation" 
            v-model="passswordConfirmation"
            :error-bag="errorBag"
          />
        </div>

        <MagicButton>
          <button type="submit" class="btn bg-default-900 btn-large text-white btn-block">
            <IconLoading v-show="registerCustomerLoading" />
            Tạo tài khoản
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