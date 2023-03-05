<!-- <script setup lang="ts">
import Joi from 'joi'

const schema = Joi.object({
  prompt: Joi.string().required().max(255).messages({
    'string.empty': 'The prompt cannot be an empty field.',
    'string.max': 'The prompt length must be less than or equal to 255 characters long',
    'any.required': 'The prompt is a required field'
  })
})

definePageMeta({
  middleware: ['auth']
})

const prompt = ref('')
const isLoading = ref(false)
const customError = ref({
  prompt: ''
})

async function submitHandler () {
  const params = await schema.validate({
    prompt: prompt.value
  }, {
    abortEarly: false
  })

  if (params?.error) {
    const details = params.error.details

    for (let i = 0; i < details.length; i++) {
      if (details[i].context?.key === 'prompt') {
        customError.value.prompt = details[i].message
      }
    }

    return console.error('ValidationError!')
  }

  isLoading.value = true

  const {
    error
  } = await _useFetch('/api/dalle', {
    method: 'POST',
    body: {
      prompt: prompt.value
    }
  })

  isLoading.value = false

  if (error.value) {
    customError.value.prompt = error.value.statusMessage ?? ''
  } else {
    customError.value.prompt = ''
  }
}
</script>

<template>
  <div class="h-full flex">
    <div class="w-80 bg-white px-2 pt-2 border-r border-gray-200">
      <form
        class=""
        @submit.prevent="submitHandler()"
      >
        <span class="uppercase text-xs">
          Prompt
        </span>

        <TextArea
          v-model.trim="prompt"
          rows="5"
          class=""
          placeholder="What is going on your mind."
        />

        <small
          v-if="customError.prompt"
          class="text-xs text-red-500"
        >
          {{ customError.prompt }}
        </small>

        <button
          type="submit"
          class="block text-white bg-gray-800 text-sm font-bold uppercase px-6 py-3 rounded w-full mt-2"
          :class="{
            'opacity-50': isLoading
          }"
        >
          submit
        </button>
      </form>
    </div>

    <div>
      Container here!
    </div>
  </div>
</template> -->

<script setup lang="ts">
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { faker } from '@faker-js/faker'

import { commentStore } from '@/store/comment'

dayjs.extend(utc)

const store = commentStore()

function createComment (content: string) {
  store.createComment({
    id: faker.datatype.uuid(),
    replyId: null,
    content,
    level: 1,
    createdAt: dayjs().toString(),
    score: 0,
    user: store.user,
    replies: []
  })
}
</script>

<template>
  <div class="max-w-[730px] h-full p-5 mx-auto">
    <ul role="list">
      <li
        v-for="(comment, key) in store.comments"
        :key="key"
        class="mb-5 last:mb-0"
      >
        <Comment
          :level="comment.level"
          v-bind="{
            comment,
            index: key
          }"
        />
      </li>
    </ul>

    <CommentCreate
      class="mb-5"
      btn-label="submit"
      placeholder="Add comment"
      @submit="createComment"
    />
  </div>
</template>
