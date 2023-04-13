export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.errorHandler = (error) => {
      const staff = useCurrentCustomer()
      const accessToken = useCookie<string|null>('access_token')
  
      // @ts-ignore
      if (error?.status === 401) {
        staff.value = null
        accessToken.value = null
        navigateTo({ name: 'login' })
      }
  
      // @ts-ignore
      if (error.response?.status == 403) {
        showError(createError({ statusCode: 403 }))
      }
    }
  })