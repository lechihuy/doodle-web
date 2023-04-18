declare global {
  type Credentials = {
    email?: string,
    password?: string
  }

  type SendEmailVerificationData = {
    email?: string,
  }

  type VerifyEmailData = {
    identifier_token?: string,
    otp_code?: string,
  }

  type RegisterCustomerData = {
    email?: string,
    password?: string,
    full_name?: string,
    gender?: number,
    password_confirmation?: string,
  }
}

export const useLoginCustomerApi = (credentials: Credentials, headers: object = {}) => {
  const { $axios } = useNuxtApp()

  return $axios.post('public/auth/login', credentials, {
    headers: {
      ...headers,
    },
  })
}

export const useRegisterCustomerApi = (data: RegisterCustomerData, headers: object = {}) => {
  const { $axios } = useNuxtApp()

  return $axios.post('public/auth/register', data, {
    headers: {
      ...headers,
    },
  })
}

export const useSendEmailVerificationApi = (data: SendEmailVerificationData, headers: object = {}) => {
  const { $axios } = useNuxtApp()

  return $axios.post('public/auth/email/send-verification', data, {
    headers: {
      ...headers,
    },
  })
}

export const useVerifyEmailApi = (data: VerifyEmailData, headers: object = {}) => {
  const { $axios } = useNuxtApp()

  return $axios.post('public/auth/email/verify', data, {
    headers: {
      ...headers,
    },
  })
}
