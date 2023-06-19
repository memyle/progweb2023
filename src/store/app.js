// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    polls: [
      {
        title: 'Titulo do role',
        items: [
          { id: 1, text: 'Overcooked' },
          { id: 2, text: 'Pummel Party' },
          { id: 3, text: 'Preencha com um título' }
        ]
      }
    ]
  }),
  getters: {
    getPools: (state) => {
      console.log(state.polls)
      return[
        {
          title: 'Titulo do role',
          items: [
            { id: 1, text: 'Overcooked' },
            { id: 2, text: 'Pummel Party' },
            { id: 3, text: 'Preencha com um título' }
          ]
        }
      ]
    }
  }
})
