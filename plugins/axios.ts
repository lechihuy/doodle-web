import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const customer = useCurrentCustomer()
  const accessToken = useCookie<string|null>('access_token')

  const instance = axios.create({
    baseURL: config.public.baseApiUrl,
    headers: {
      common: {},
    },
  })

  instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status === 401 && customer.value) {
      customer.value = null
      accessToken.value = null

      navigateTo({ name: 'login' })
    }

    return Promise.reject(error);
  })

  return {
    provide: {
      axios: instance,
    },
  }
})