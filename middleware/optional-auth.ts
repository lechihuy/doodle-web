export default defineNuxtRouteMiddleware(async () => {
  const accessToken = useCookie<string|null>('access_token')
  let customer = useCurrentCustomer()

  if (accessToken.value && !customer.value) {
    const { data } = await useAsyncData('customer',
      async () => (await useGetCustomerProfileApi()).data.data
    )
    customer.value = data.value
  }
})