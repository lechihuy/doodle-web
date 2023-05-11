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

  type ResetCustomerPasswordData = {
    email?: string,
    new_password?: string,
    new_password_confirmation?: string,
  }

  type ChangeCustomerPasswordData = {
    password?: string,
    new_password?: string,
    new_password_confirmation?: string,
  }

  type ProfileData = {
    full_name?: string,
    gender?: number,
  }

  type AddressCreationData = {
    name?: string,
    description?: string,
    province_id?: string|Number,
    district_id?: string|Number,
    ward_id?: string|Number,
    street_name?: string,
    street_number?: string,
    lat?: string|number,
    lng?: string|number,
    contact: {
      full_name?: string,
      phone_number?: string,
    }
  }

  type AddressEditData = {
    name?: string,
    description?: string,
    province_id?: string|Number,
    district_id?: string|Number,
    ward_id?: string|Number,
    street_name?: string,
    street_number?: string,
    lat?: string|number,
    lng?: string|number,
    contact: {
      full_name?: string,
      phone_number?: string,
    }
  }

  type AddressFilter = {
    limit?: number,
  }

  type OrderFilter = {
    keyword?: string,
    status?: string
    page?: number,
  }

  type CartCreationData = {
    product_id?: number,
  }

  type CartEditData = {
    branch_id?: number,
    address_id?: number,
    note?: string,
  }

  type CartItemEditData = {
    qty?: number,
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

export const useLogoutCustomerApi = (headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.post('public/auth/logout', {}, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
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

export const useResetCustomerPasswordApi = (data: ResetCustomerPasswordData, headers: object = {}) => {
  const { $axios } = useNuxtApp()

  return $axios.post('public/auth/password/reset', data, {
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

export const useGetCustomerProfileApi = (headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.get('public/auth/profile', {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
  })
}

export const useEditProfileApi = (data: ProfileData, headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.put('public/auth/profile', data, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
  })
}

export const useChangeCustomerPasswordApi = (data: ChangeCustomerPasswordData, headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.put('public/auth/password/change', data, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
  })
}

// Address
export const useIndexAddressApi = (filter?: AddressFilter, headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.get('public/auth/addresses', {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
    params: {
      ...filter
    }
  })
}

export const useCountAddressMetricApi = (metric: string, filter?: AddressFilter, headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.get(`public/auth/addresses/metrics/${metric}`, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
    params: {
      ...filter
    }
  })
}

export const useDetailAddressApi = (id: string, headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.get(`public/auth/addresses/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
  })
}

export const useCreateAddressApi = (data: AddressCreationData, headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.post(`public/auth/addresses/`, data, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
  })
}

export const useEditAddressApi = (id: string, data: AddressEditData, headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.put(`public/auth/addresses/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
  })
}

export const useDestroyAddressApi = (id: string, headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.delete(`public/auth/addresses/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
  })
}

// Order
export const useCountOrderMetricApi = (metric: string, filter?: OrderFilter, headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.get(`public/auth/orders/metrics/${metric}`, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
    params: {
      ...filter,
    }
  })
}

export const useIndexOrdersApi = (filter?: OrderFilter, headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.get(`public/auth/orders`, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
    params: {
      ...filter
    }
  })
}

export const useDetailOrderApi = (id: string|number, headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.get(`public/auth/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
  })
}

export const useCancelOrderApi = (id: string|number, headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.put(`public/auth/orders/${id}/cancel`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
  })
}

// Cart
export const useAddToCartApi = (data: CartCreationData, headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.post(`public/auth/cart`, data, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
  })
}

export const useIndexCartApi = (headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.get(`public/auth/cart`, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
  })
}

export const useEditCartApi = (data: CartEditData, headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.put(`public/auth/cart`, data, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
  })
}

export const useEditCartItemApi = (id: string, data: CartItemEditData, headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.put(`public/auth/cart/cart-items/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
  })
}

export const useDeleteCartItemApi = (id: string, headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.delete(`public/auth/cart/cart-items/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
  })
}

export const useCheckoutApi = (headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.post(`public/auth/cart/checkout`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
  })
}