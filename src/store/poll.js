// Utilities
import { defineStore } from 'pinia'

export const usePollStore = defineStore('poll', {
  persist: true,
  state: () => ({
    newPoll: { id: 0, title: '', items: [] },
    polls: []
  }),
  getters: {
    getPools: (state) => state.polls,
    getNewPoll: (state) => state.newPoll,
  },
  actions: {
    addToListInNew() {
      this.newPoll.items.push({ id: 10, text: 'Dale' })
    },
    addToList() {
      this.polls[0].items.push({ id: 10, text: 'Dale' })
    },
    removeFromList(item) {
      let index = this.polls[0].items.indexOf(item)
      this.polls[0].items.splice(index, 1)
    },
    removeFromListNew(item) {
      let index = this.newPoll.items.indexOf(item)
      this.newPoll.items.splice(index, 1)
    },
    toggleVote(id) {
      let item = this.polls[0].items.find(element => element.id == id)

      if (this.polls[0].openToVote) {
        item.voted = !item.voted
        this.polls[0].openToVote = false
        this.polls[0].votedId = id
      } else if (!this.polls[0].openToVote && this.polls[0].votedId == id) {
        item.voted = !item.voted
        this.polls[0].openToVote = true
        this.polls[0].votedId = null
      }
    }
  }
})
