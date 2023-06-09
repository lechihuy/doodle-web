export default defineNuxtRouteMiddleware(async () => {
  const accessToken = useCookie<string|null>('access_token')
  let customer = useCurrentCustomer()

  if (!accessToken.value) {
    return navigateTo({ name: 'login' })
  }

  if (accessToken.value) {
    const { data } = await useAsyncData('customer',
      async () => (await useGetCustomerProfileApi()).data.data
    )

    if (data.value) {
      customer.value = data.value
    } else {
      accessToken.value = null
    }
  }

  if (!accessToken.value) {
    return navigateTo({ name: 'login' })
  }
})