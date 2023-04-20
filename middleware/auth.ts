export default defineNuxtRouteMiddleware(async () => {
  const accessToken = useCookie<string|null>('access_token')
  let customer = useCurrentCustomer()
  const currentCustomerRefreshed = useCurrentCustomerRefreshed()

  if (accessToken.value && (!customer.value || currentCustomerRefreshed.value)) {
    const { data } = useAsyncData('customer',
      async () => (await useGetCustomerProfileApi()).data.data
    )
    customer.value = data
  }
})