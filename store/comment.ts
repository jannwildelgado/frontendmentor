import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { comments, user } from '~/assets/comments.json'

interface Comment {
  id: string,
  replyId: string | null,
  level: number,
  content: string,
  createdAt: string,
  score: number,
  user: {
    image: {
      png: string,
      webp: string
    },
    username: string
  },
  replies: Array<Comment | any>
}

export const commentStore = defineStore('comment', {
  state: () => {
    return {
      comments: useLocalStorage('cache', comments),
      user
    }
  },

  getters: {},

  actions: {
    updateScore (params: { vote: number, comment: Comment | any }) {
      params.comment.score += params.vote
    },

    createComment (comment: Comment) {
      this.comments.splice(0, 0, comment)
    },

    updateComment (params: { comment: Comment | any, content: string }) {
      params.comment.content = params.content
    },

    deleteComment (params: { commentId: string, comments: Array<Comment | any> }) {
      for (let i = 0; i < params.comments?.length; i++) {
        if (params.comments[i].id === params.commentId) {
          return params.comments.splice(i, 1)
        }

        if (params.comments[i].replies.length) {
          this.deleteComment({
            commentId: params.commentId,
            comments: params.comments[i].replies
          })
        }
      }
    },

    createReply (params: { comments: any, reply: Comment }) {
      for (let i = 0; i < params.comments?.length; i++) {
        if (params.comments[i].id === params.reply?.replyId) {
          return params.comments[i].replies.splice(0, 0, params.reply)
        }

        if (params.comments[i].replies.length) {
          this.createReply({
            comments: params.comments[i].replies,
            reply: params.reply
          })
        }
      }
    }
  }
})
