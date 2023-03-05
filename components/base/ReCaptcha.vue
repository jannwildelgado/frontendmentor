<script setup lang="ts">
const config = useRuntimeConfig()
const app = useNuxtApp()

// const recaptcha = ref(null)
const widgetId1 = ref(null)

onMounted(async () => {
  const recaptcha = (window as any).grecaptcha

  if (recaptcha) {
    const el = document.querySelector('#g-recaptcha')

    widgetId1.value = recaptcha.render(el, {
      sitekey: config.public.RECAPTCHA_CLIENT_KEY,
      theme: 'light'
    })

    await recaptcha.getResponse(widgetId1.value)
  }
})

onUnmounted(() => {
  //
})

app.hook('page:finish', () => {
  console.log('HOOK:', '"page:finish"')
})
</script>

<template>
  <div id="g-recaptcha" />
</template>
