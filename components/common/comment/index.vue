<script setup lang="ts">
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import { faker } from '@faker-js/faker'

import { commentStore } from '@/store/comment'

dayjs.extend(utc)
dayjs.extend(relativeTime)

const store = commentStore()

const props = defineProps({
  comment: {
    type: Object,
    default: null
  }
})

const isReply = ref(false)
const isModify = ref(false)
const modifyVal = ref('')

function createReply (content: string) {
  let replyId = props.comment.id
  let level = props.comment.level

  /**
   * Lvl 3 limit
   */
  const limit = 2

  if (level > limit) {
    replyId = props.comment.replyId
  } else {
    level += 1
  }

  store.createReply({
    comments: store.comments,
    reply: {
      id: faker.datatype.uuid(),
      replyId,
      level,
      content,
      createdAt: dayjs().toString(),
      score: 0,
      user: store.user,
      replies: []
    }
  })

  isReply.value = false
}

function modifyComment () {
  isModify.value = !isModify.value
  modifyVal.value = isModify.value ? props.comment.content : ''
}

function updateComment () {
  store.updateComment({
    comment: props.comment,
    content: modifyVal.value
  })

  isModify.value = false
  modifyVal.value = ''
}
</script>

<template>
  <div class="block">
    <div class="w-full min-h-[167px] p-6 bg-white rounded-lg flex gap-5">
      <div class="w-full max-w-[40px] h-[100px] rounded-lg bg-[#eaecf1] flex flex-col justify-between items-center py-2">
        <Icon
          class="w-4 h-4 text-[#67727e] cursor-pointer active:text-[#5457b6] active:ring-2"
          name="ph:plus-bold"
          @click="store.updateScore({
            comment: props.comment,
            vote: 1
          })"
        />

        <span class="text-base text-[#5457b6] select-none">
          {{ props.comment.score }}
        </span>

        <Icon
          class="w-4 h-4 text-[#67727e] cursor-pointer active:text-[#5457b6] active:ring-2"
          name="ph:minus-bold"
          @click="store.updateScore({
            comment: props.comment,
            vote: -1
          })"
        />
      </div>

      <div class="w-full">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <img
              class="max-h-8"
              :src="props.comment.user.image.png"
              :alt="props.comment.user.username"
            >

            <div class="flex items-center">
              <div class="font-bold text-[#324152]">
                {{ props.comment.user.username }}
              </div>

              <div
                v-if="props.comment.user.username === store.user.username"
                class="text-sm text-white rounded px-1 h-fit ml-2 bg-[#5457b6]"
              >
                you
              </div>
            </div>

            <div class="text-[#67727e]">
              {{ dayjs(props.comment.createdAt).fromNow() }}
            </div>
          </div>

          <div class="flex gap-3">
            <ReplyBtn
              v-if="props.comment.user.username !== store.user.username"
              @click="isReply = !isReply"
            >
              <Icon
                class="w-5 h-5"
                name="ph:arrow-bend-up-left-bold"
              />

              Reply
            </ReplyBtn>

            <template v-else>
              <ReplyBtn
                class="text-[#ed6468] active:text-[#ffb8bb]"
                @click=" store.deleteComment({
                  commentId: props.comment.id,
                  comments: store.comments
                })"
              >
                <Icon
                  class="w-5 h-5"
                  name="ph:trash-bold"
                />

                Delete
              </ReplyBtn>

              <ReplyBtn
                @click="modifyComment()"
              >
                <Icon
                  class="w-5 h-5"
                  name="ph:pencil-simple-bold"
                />

                Edit
              </ReplyBtn>
            </template>
          </div>
        </div>

        <div class="text-[#67727e]">
          <div
            v-if="isModify"
            class="flex flex-col gap-4"
          >
            <TextArea
              v-model="modifyVal"
              class="h-full"
              rows="4"
              cols="50"
            />

            <div class="flex justify-end">
              <button
                class="text-white bg-[#5457b6] active:bg-[#c3c4ef] py-[10px] px-[20px] uppercase rounded-lg"
                @click="updateComment()"
              >
                update
              </button>
            </div>
          </div>

          <span v-else>
            {{ props.comment.content }}
          </span>
        </div>
      </div>
    </div>

    <ul
      role="list"
      class="mt-5 ml-6 pl-6 border-l-2 border-[#eaecf1]"
    >
      <li
        v-for="(reply, key) in comment.replies"
        :key="key"
        class="mt-5"
      >
        <Comment
          class=""
          :level="reply.level"
          v-bind="{
            comment: reply,
            index: key
          }"
        />
      </li>
    </ul>

    <CommentCreate
      v-if="isReply"
      class="mb-5"
      @submit="createReply"
    />
  </div>
</template>
