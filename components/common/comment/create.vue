<script setup lang="ts">
import { commentStore } from '@/store/comment'

const emit = defineEmits(['submit'])

const store = commentStore()

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  btnLabel: {
    type: String,
    default: 'reply'
  }
})

const comment = ref('')

function submitHandler () {
  emit('submit', comment.value)
  comment.value = ''
}
</script>

<template>
  <div class="min-h-[167px] p-6 bg-white rounded-lg flex items-start gap-5">
    <img
      class="max-h-9"
      :src="store.user.image.png"
      :alt="store.user.username"
    >

    <TextArea
      v-model="comment"
      class="h-full"
      rows="4"
      cols="50"
      :placeholder="props.placeholder"
    />

    <button
      class="text-white bg-[#5457b6] active:bg-[#c3c4ef] py-[10px] px-[20px] uppercase rounded-lg"
      @click="submitHandler()"
    >
      {{ props.btnLabel }}
    </button>
  </div>
</template>
