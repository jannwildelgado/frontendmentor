export default defineNuxtRouteMiddleware(() => {
  const auth = useCookie('auth0')

  if (auth.value) {
    return navigateTo('/')
  }
})
