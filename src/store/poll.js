// Utilities
import { defineStore } from 'pinia'

export const usePollStore = defineStore('poll', {
  persist: true,
  state: () => ({
    newPoll: { id: 0, title: '', items: [], openToVote: true, votedId: null },
    polls: []
  }),
  getters: {
    getPools: (state) => {
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
      let newId = this.polls.length
      this.newPoll.id = newId
      this.polls.push(this.newPoll)
      this.newPoll = { id: 0, title: '', items: [], openToVote: true, votedId: null }
    },
    addToListInNew() {
      this.newPoll.items.push({ id: this.newPoll.items.length, text: '' })
    },
    removeFromListNew(item) {
      let index = this.newPoll.items.indexOf(item)
      this.newPoll.items.splice(index, 1)
    },
    toggleVote(id, poll_id) {
      let pollObject = this.polls.find(element => element.id == poll_id)
      let item = pollObject.items.find(element => element.id == id)

      console.log(pollObject, item)
      if (pollObject.openToVote) {
        item.voted = !item.voted
        pollObject.openToVote = false
        pollObject.votedId = id
      } else if (!pollObject.openToVote && pollObject.votedId == id) {
        item.voted = !item.voted
        pollObject.openToVote = true
        pollObject.votedId = null
      }
    },

    closePoll(poll, topPolls) {
      // const items = poll.items.sort((a, b) => {
      //   return a.votes - b.votes;
      // });\
      // Ordenar os items pelos votos, pegar o tanto que foi passado no topPoll
      // 
    }
  }
})
