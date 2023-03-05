import { defineNuxtConfig } from 'nuxt/config'
import eslintPlugin from 'vite-plugin-eslint'

export default defineNuxtConfig({
  // ssr: false,

  app: {
    head: {
      link: [],
      script: [
        {
          id: '__RECAPTCHA_SCRIPT',
          src: 'https://www.google.com/recaptcha/api.js?render=explicit',
          async: true,
          defer: true
        }
      ]
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    // 'nuxt-logrocket',
    // 'nuxt-svgo',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-icon'
  ],

  // logRocket: {
  //   id: '',
  //   enablePinia: false
  // },

  runtimeConfig: {
    public: {
      RECAPTCHA_CLIENT_KEY: process.env.RECAPTCHA_CLIENT_KEY
    }
  },

  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/bulma.css'
  ],

  vite: {
    plugins: [
      eslintPlugin()
    ]
  },

  typescript: {
    strict: true
  },

  components: {
    dirs: [
      '~/components/base',
      '~/components/common',
      '~/components/layout'
    ]
  }
})
