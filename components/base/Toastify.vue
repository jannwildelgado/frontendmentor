<!--
  @USAGE
  import { useEventBus } from '@vueuse/core'

  const _toast = useEventBus<string>('toast')

  _toast.emit('success', 'Success')
 -->

<script setup lang="ts">
import { useEventBus, useDebounceFn } from '@vueuse/core'

const _toast = useEventBus<string>('toast')

const isOpen = ref(false)

const opts = ref({
  type: '',
  message: ''
})

const closeHandler = useDebounceFn(() => {
  isOpen.value = false
}, 3000)

_toast.on((type: string, message: string) => {
  opts.value.type = type
  opts.value.message = message
  isOpen.value = true
  closeHandler()
})

const bgColor = computed(() => {
  return getKey(opts.value.type, {
    success: 'text-green-600 bg-green-100 dark:bg-green-800 dark:text-green-200',
    error: 'bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200',
    warning: 'text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200',
    default: 'text-gray-500 bg-white dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800'
  })
})

const position = ref('top-5 m-auto left-0 right-0')
</script>

<template>
  <div
    v-if="isOpen"
    class="absolute flex items-center w-full max-w-xs p-4 space-x-4 divide-x divide-gray-200 rounded-lg shadow space-x"
    :class="[
      position,
      bgColor
    ]"
  >
    <div class="text-sm font-normal">
      {{ opts.message }}
    </div>
  </div>
</template>
