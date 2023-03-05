import { userStore } from '@/store/user'

export default defineNuxtRouteMiddleware(async () => {
  const auth = await useCookie('auth0')
  const store = userStore()

  if (!auth.value) {
    store.authenticated = false

    return navigateTo('/auth/signin', {
      redirectCode: 401
    })
  }

  store.authenticated = true
})
