import { userStore } from '@/store/user'

export const _useFetch = (url: string, opts: {} | any) => {
  const store = userStore()
  const auth = useCookie('auth0')

  function onResponseError (params: any) {
    if (params.response.status === 401) {
      store.authenticated = false

      auth.value = null

      return navigateTo('/auth/signin')
    }
  }

  return useFetch(url, { ...opts, onResponseError })
}
