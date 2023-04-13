export default defineNuxtRouteMiddleware(async () => {
    const accessToken = useCookie<string|null>('access_token')
  
    if (accessToken.value) {
      return navigateTo({ name: 'index' })
    }
  
    useCurrentCustomer().value = null
  })