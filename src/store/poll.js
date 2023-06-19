// Utilities
import { defineStore } from 'pinia'
import { app } from '@/plugins/firebase';
import { getDatabase, ref, child, get } from "firebase/database";
export const usePollStore = defineStore('poll', {
  persist: true,
  state: () => ({
    polls: []
  }),
  getters: {
    getPools: (state) => state.polls
  },
  actions: {
    initList() {
      const dbRef = ref(getDatabase());
      get(child(dbRef, '/polls')).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    },
    addToList() {
      this.polls[0].items.push({ id: 10, text: 'Digite aqui' })
    },
    removeFromList(item) {
      let index = this.polls[0].items.indexOf(item)
      this.polls[0].items.splice(index, 1)
    },
    toggleVote(id) {
      let item = this.polls[0].items.find(element => element.id == id)
      
      if(this.polls[0].openToVote) {
        item.voted = !item.voted
        this.polls[0].openToVote = false
        this.polls[0].votedId = id
      } else if(!this.polls[0].openToVote && this.polls[0].votedId == id) {
        item.voted = !item.voted
        this.polls[0].openToVote = true
        this.polls[0].votedId = null
      }
    }
  }
})
