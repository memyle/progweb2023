// Utilities
import { defineStore } from 'pinia'

export const usePollStore = defineStore('poll', {
  persist: true,
  state: () => ({
    newPoll: { id: 0, title: '', items: [] },
    polls: []
  }),
  getters: {
    getPools: (state) => {
      console.log(state.polls)
      return state.polls
    },
    getNewPoll: (state) => state.newPoll,
  },
  actions: {
    updateNewTitle(event) {
      this.newPoll.title = event.target.value
    },
    updateItemTitle(event) {
      console.log(event)
      let index = this.newPoll.items.indexOf(item)
      this.newPoll.items[index].text = event.target.value
    },
    addCreatePoll() {
      console.log(this.newPoll)
      this.polls.push(this.newPoll)
      this.newPoll = { id: 0, title: '', items: [] }
    },
    addToListInNew() {
      this.newPoll.items.push({ id: 10, text: 'Coloque uma opção' })
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
