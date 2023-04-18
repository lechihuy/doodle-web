<script lang="ts" setup>
definePageMeta({
  layout: 'blank',
  middleware: ['guest']
})

useHead({ title: 'Đăng nhập Doodle' })

const toast = useToast()
const loginLoading = ref(false)
const email = ref('')
const password = ref('')
const error = ref('')

async function submit() {
  loginLoading.value = true

  await useLoginCustomerApi({
    email: email.value,
    password: password.value
  })
    .then(res => {
      const data = res.data.data
      const accessToken = useCookie<string>('access_token', { expires: new Date(data.expires_at) })
      accessToken.value = data.access_token

      navigateTo({ name: 'index' })
    })
    .catch(err => {
      error.value = err.response.data.message
    })
    .finally(() => setTimeout(() => loginLoading.value = false, 200))
}

</script>

<template>
  <div class="relative min-h-screen flex flex-1 flex-col overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
    <img src="/images/beams-login.jpg" class="absolute left-1/2 top-0 -ml-[47.5rem] w-[122.5rem] max-w-none">

    <div class="absolute inset-0 text-slate-900/[0.07] [mask-image:linear-gradient(to_bottom_left,white,transparent,transparent)]"><svg class="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid-bg" width="32" height="32" patternUnits="userSpaceOnUse" x="100%" patternTransform="translate(0 -1)"><path d="M0 32V.5H32" fill="none" stroke="currentColor"></path></pattern></defs><rect width="100%" height="100%" fill="url(#grid-bg)"></rect></svg></div>
  
    <div class="relative flex flex-1 flex-col items-center justify-center pb-16 pt-12">
      <NuxtLink :to="{ name: 'index' }" class="inline-flex items-center gap-2 mb-16">
        <Logo />
        <span class="text-2xl font-mono font-semibold text-default-700">Doodle</span>
      </NuxtLink>

      <h1 class="sr-only">Đăng nhập Doodle</h1>
      <form action="/login" class="w-full max-w-sm flex flex-col gap-6" @submit.prevent="submit">
        <div class="bg-danger-100 shadow-sm rounded text-danger-900 px-5 py-3 mb-5" v-show="error">{{ error }}</div>
        <div class="flex flex-col gap-1">
          <label for="email" class="block text-sm font-semibold leading-6">Địa chỉ e-mail</label>
          <input 
            type="email" 
            id="email" 
            class="form-input border-default-500 shadow"
            v-model="email"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="password" class="block text-sm font-semibold leading-6 text-gray-900">Mật khẩu</label>
          <input 
            type="password" 
            id="password" 
            class="form-input border-default-500 shadow" 
            v-model="password"
          />
        </div>
        <button type="submit" class="btn btn-primary btn-large btn-block">
          <IconLoading v-show="loginLoading" />
          Đăng nhập
        </button>
        <p class="text-default-700 mt-6 text-center">
          <a href="" class="hover:underline hover:text-default-900">Quên mật khẩu?</a>
        </p>
      </form>
    </div>

    <footer class="relative">
      <div class="flex items-center gap-4 justify-center">
        <p class="text-default-700">Chưa có tài khoản?</p>
        <MagicButton>
          <NuxtLink class="btn btn-transparent" :to="{ name: 'register' }">
            <span>Đăng ký ngay</span>
          </NuxtLink>
        </MagicButton>
      </div>
    </footer>
  </div>
</template>