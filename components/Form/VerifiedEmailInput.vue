<script lang="ts" setup>
const props = defineProps({
  id: { type: String, required: true },
  email: String,
  otpToken: String,
  errorBag: { type: ErrorBag, default: null }
})

const emit = defineEmits(['update:email', 'update:otp-token'])

const email = computed({
  get: () => props.email,
  set: (value) => emit('update:email', value)
})
const otpToken = computed({
  get: () => props.otpToken,
  set: (value) => emit('update:otp-token', value)
})
const isShownModal = ref(false)
const verifyEmailLoading = ref(false)
const sendEmailVerificationLoading = ref(false)
const otpCode = ref('')
const identifierToken = ref('')
const resendVerificationTimer = ref(0)
const isInvalidOtpCode = ref(false)

function closeModal() {
  otpCode.value = ''
  isShownModal.value = false
}

function openModal() {
  isShownModal.value = true
}

function clearErrorBag() {
  props.errorBag?.clear(props.id)
}

async function sendEmailVerification() {
  sendEmailVerificationLoading.value = true

  await useSendEmailVerificationApi({ email: email.value }, { 'Require-Email-Unique': true })
    .then(res => {
      identifierToken.value = res.data.data.identifier_token
      resendVerificationTimer.value = res.data.data.expires * 60 // convert minutes to seconds

      const timer = setInterval(() => {
        if (resendVerificationTimer.value === 0) {
          clearInterval(timer)
          return
        }
        resendVerificationTimer.value--
      }, 1000)
      
      clearErrorBag()
      openModal()
    })
    .catch(err => {
      if (err.response.status === 422) {
        props.errorBag.set(props.id, err.response.data.errors[props.id])
      } else if (err.response.status === 429) {
        props.errorBag.set(props.id, err.response.data.message)
      }
    })
    .finally(() => setTimeout(() => sendEmailVerificationLoading.value = false, 200))
}

async function verifyEmail() {
  verifyEmailLoading.value = true

  await useVerifyEmailApi({ 
    identifier_token: identifierToken.value,
    otp_code: otpCode.value 
  })
    .then(res => {
      otpToken.value = res.data.data.otp_token
      isInvalidOtpCode.value = false

      clearErrorBag()
      closeModal()
    })
    .catch(err => {
      if (err.response.status === 422) {
        isInvalidOtpCode.value = true
      } else if (err.response.status === 429) {
        isInvalidOtpCode.value = false
        props.errorBag.set(props.id, err.response.data.message)
        closeModal()
      }
    })
    .finally(() => setTimeout(() => verifyEmailLoading.value = false, 200))
}

watch(email, () => {
  identifierToken.value = ''
  otpToken.value = ''
})
</script>

<template>
  <div class="relative flex flex-col gap-1">
    <input
      :id="id"
      type="email" 
      class="form-input "
      v-model="email"
      :class="{ 
        'border-danger-500': errorBag.get(id)?.length > 0,
        'pr-20': !identifierToken,
        'pr-8': otpToken
      }"
      @input="clearErrorBag"
    />

    <button
      v-show="!otpToken"
      type="button" 
      :disabled="sendEmailVerificationLoading" 
      class="btn btn-sm rounded shadow-sm btn-transparent absolute right-1 top-1" 
      @click="sendEmailVerification"
    >
      <IconLoading class="text-default-500" v-if="sendEmailVerificationLoading" />
      <span v-else>Lấy mã</span>
    </button>

    <Icon v-show="otpToken" name="heroicons:check-circle-solid" class="w-6 h-6 absolute right-2 top-2 text-primary-500" />

    <div v-show="errorBag && errorBag.get(id)?.length > 0" class="text-sm text-danger-500 flex flex-col gap-1">
      <small v-for="(error, index) in props.errorBag.get(props.id)" :key="index">&bull; {{ error }}</small>
    </div>
  </div>

  <HeadlessTransitionRoot appear :show="isShownModal" as="template">
    <HeadlessDialog as="div" @close="closeModal" class="relative" :style="{ zIndex: zIndex.modal }" :initialFocus="null">
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-70" />
      </HeadlessTransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <HeadlessDialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all"
            >
              <div class="p-7">
                <HeadlessDialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Xác thực địa chỉ e-mail
                </HeadlessDialogTitle>

                <div class="mt-5 flex flex-col gap-7">
                  <p class="text-sm text-gray-500">Chúng tôi đã gửi đến địa chỉ e-mail <span class="font-semibold">{{ email }}</span> mã xác thực bao gồm 6 chữ số, vui lòng kiểm tra hộp thư và xác thực địa chỉ e-mail bên dưới:</p>
                  <div class="flex justify-center">
                    <input 
                      type="text" 
                      v-model="otpCode" 
                      class="mx-auto placeholder:text-default-300 form-input text-xl tracking-widest w-28 bg-default-50 font-semibold text-default-700 font-mono" 
                      :class="{ 'border-danger-500': isInvalidOtpCode }"
                      maxlength="6" 
                      placeholder="######"
                    />
                  </div>
                  <p class="text-sm text-gray-500 flex items-center gap-2 justify-center">
                    <span>Không nhận được mã?</span>
                    <button 
                      :disabled="resendVerificationTimer > 0" 
                      type="button" 
                      class="btn btn-transparent btn-sm"
                      @click="sendEmailVerification"
                    >
                      Gửi lại <span v-show="resendVerificationTimer > 0">({{ resendVerificationTimer }})</span>
                    </button>
                  </p>
                </div>
              </div>

              <div class="px-7 py-3 bg-slate-100 flex items-center justify-end gap-2">
                <button type="button" class="btn btn-default" @click="closeModal">Hủy bỏ</button>
                <button type="button" class="btn btn-primary" @click="verifyEmail">
                  <Icon name="heroicons:check-circle" class="w-5 h-5" v-if="!verifyEmailLoading" />
                  <IconLoading v-else />
                  Xác thực
                </button>
              </div>
            </HeadlessDialogPanel>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>