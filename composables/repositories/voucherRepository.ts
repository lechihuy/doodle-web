declare global {

}

export const useIndexVouchersApi = (headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.get(`public/vouchers`, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
  })
}

export const useApplyVoucherApi = (id: string|number, headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.post(`public/vouchers/${id}/apply`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
  })
}

export const useDetachVoucherApi = (id: string|number, headers: object = {}) => {
  const { $axios } = useNuxtApp()
  const accessToken = useCookie<string|null>('access_token')

  return $axios.post(`public/vouchers/${id}/detach`, {}, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      ...headers,
    },
  })
}