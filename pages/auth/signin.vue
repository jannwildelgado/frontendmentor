<script setup lang="ts">
import Joi from 'joi'

const schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'The email cannot be an empty field.',
    'string.email': 'The email must be valid.',
    'any.required': 'The email is a required field'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'The password cannot be an empty field.',
    'any.required': 'The password is a required field'
  })
})

definePageMeta({
  middleware: 'contact'
})

useHead({
  script: []
})

const isLoading = ref(false)
const email = ref('jannwildelgado@gmail.com')
const password = ref('00000000')
const customError = ref({
  email: '',
  password: ''
})

async function loginHandler () {
  customError.value.email = ''
  customError.value.password = ''

  const params = await schema.validate({
    email: email.value,
    password: password.value
  }, {
    abortEarly: false
  })

  if (params?.error) {
    const details = params.error.details

    for (let i = 0; i < details.length; i++) {
      if (details[i].context?.key === 'email') {
        customError.value.email = details[i].message
      }

      if (details[i].context?.key === 'password') {
        customError.value.password = details[i].message
      }
    }

    return console.error('ValidationError!')
  }

  isLoading.value = true

  const {
    error
  } = await _useFetch('/api/auth/signin', {
    method: 'POST',
    body: {
      email: params.value.email,
      password: params.value.password
    }
  })

  isLoading.value = false

  if (error.value) {
    customError.value.password = error.value?.statusMessage ?? ''

    return console.error('ValidationError!')
  }

  navigateTo('/')
}
</script>

<template>
  <div class="flex justify-center pt-10">
    <div class="w-[400px] sm:rounded-lg sm:drop-shadow-lg bg-transparent sm:bg-white flex flex-col sm:border border-[#d1d5db63]">
      <span class="px-5 md:px-10 pb-5 pt-7 text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl">
        Sign in to your account
      </span>

      <form
        class="px-5 md:px-10 py-10 pt-0"
        @submit.prevent="loginHandler()"
      >
        <div class="mb-6">
          <label class="block uppercase text-gray-800 text-xs font-medium mb-1">
            email*
          </label>

          <TextField
            v-model="email"
            @focus="$event.target.select()"
          />

          <small
            v-if="customError.email"
            class="text-red-500"
          >
            {{ customError.email }}
          </small>
        </div>

        <div class="mb-6">
          <label class="block uppercase text-gray-800 text-xs font-medium mb-1">
            password*
          </label>

          <TextField
            v-model="password"
            type="password"
            class=""
            @focus="$event.target.select()"
          />

          <small
            v-if="customError.password"
            class="text-red-500"
          >
            {{ customError.password }}
          </small>
        </div>

        <div class="">
          <button
            :disabled="isLoading"
            type="submit"
            class="block text-white bg-gray-800 text-sm font-bold uppercase px-6 py-3 rounded w-full"
            :class="{
              'opacity-50': isLoading
            }"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
