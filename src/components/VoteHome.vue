<template>
  <v-card color="#2C235E" class="text-white pa-8 justify-start">
    <h2 color="primary">{{ poll?.title }}</h2>
    <h3>Escolha entre as opções:</h3>
    <div class="align-center d-flex justify-space-between my-4" v-for="item in poll.items" :key="item.id">
      <h3 variant="solo"> {{ item.text }} </h3>
      <v-btn density="compact" :color="votedColor(item.voted)" icon="mdi-thumb-up" @click="toggleVote(item.id, poll.id)"></v-btn>
    </div>

    <v-select placeholder="Ver resultado como" :items="options" item-title="text" item-value="value" v-model="topSelect"></v-select>
    <v-btn :onclick="closePoll">Fechar votação</v-btn>
  </v-card>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { usePollStore } from '@/store/poll'
  const props = defineProps({poll: null})
  const votedColor = computed(() => (voted) => voted ? '#FFF' : '#5F578D')
  
  const options = [
    { text: 'TOP 5', value: 5 },
    { text: 'TOP 10', value: 10 },
  ]

  const topSelect = ref(null)

  const { toggleVote, closePoll } = usePollStore();
</script>