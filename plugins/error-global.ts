export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.config.errorHandler = (error) => {
      const customer = useCurrentCustomer()
      const accessToken = useCookie<string|null>('access_token')
      const toast = useToast()

      console.log(error)

      // @ts-ignore
      if (error?.status === 401) {
        customer.value = null
        accessToken.value = null
      }
  
      // @ts-ignore
      if (error?.status == 403) {
        showError(createError({ statusCode: 403 }))
      }

      // @ts-ignore
      if (error?.status == 429) {
        toast.error('Bạn thao tác quá nhiều lần, vui lòng thử lại sau!')
      }
    }
  })