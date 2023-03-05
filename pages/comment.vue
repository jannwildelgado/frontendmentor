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
