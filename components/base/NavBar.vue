<script setup lang="ts">
import { useColorMode, useCycleList } from '@vueuse/core'
import { userStore } from '@/store/user'

const mode = useColorMode({
  emitAuto: true,
  modes: {}
})

const {
  next: themeHandler
} = useCycleList(['dark', 'light', 'auto'], {
  initialValue: mode
})

const icon = computed(() => {
  if (mode.value === 'auto') {
    return 'icon-park-outline:new-computer'
  }

  if (mode.value === 'dark') {
    return 'icon-park-outline:moon'
  }

  if (mode.value === 'light') {
    return 'icon-park-outline:sun-one'
  }

  return ''
})

const store = userStore()

function logoutHandler () {
  const auth = useCookie('auth0')

  store.authenticated = false
  auth.value = null

  navigateTo('/auth/signin')
}
</script>

<template>
  <header class="h-[100px] bg-white dark:bg-[#1f2937] border border-[#e5e7eb] dark:border-[#4b5563] drop-shadow flex justify-center items-center">
    <nav class="max-w-[1200px] flex w-full">
      <span>
        &nbsp;
      </span>

      <ul class="flex justify-end gap-1.5 w-full">
        <li>
          <button
            class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-gray-600 dark:text-gray-400 rounded-lg"
            @click="themeHandler()"
          >
            <Icon
              class="w-5 h-5"
              :name="icon"
            />
          </button>
        </li>

        <li v-if="store.authenticated">
          <button
            class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-gray-600 dark:text-gray-400 rounded-lg"
            @click="logoutHandler()"
          >
            <Icon
              class="w-5 h-5"
              name="icon-park-outline:logout"
            />
          </button>
        </li>

        <li
          v-else
          class="ml-1"
        >
          <NuxtLink
            class="inline-flex items-center justify-center flex-shrink-0 px-2 h-8 text-gray-600 dark:text-gray-400 rounded-lg font-bold"
            active-class=""
            to="/auth/signin"
          >
            <!-- active-class="bg-gray-100 text-gray-500" -->
            Sign in
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
