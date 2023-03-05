import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => {
    return {
      user: {},
      authenticated: false
    }
  },

  getters: {},

  actions: {
    retrieve () {},

    find () {},

    remove () {},

    update () {},

    create () {}
  }
})
