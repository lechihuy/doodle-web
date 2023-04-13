export default defineNuxtRouteMiddleware(async () => {
  const accessToken = useCookie<string|null>('access_token')
  const customer = useCurrentCustomer()
  const currentCustomerRefreshed = useCurrentCustomerRefreshed()

  if (!accessToken.value) {
    return navigateTo({ name: 'login' })
  }

  if (!customer.value || currentCustomerRefreshed.value) {
    //
  }

  if (!accessToken.value) {
    return navigateTo({ name: 'login' })
  }
})