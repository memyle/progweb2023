<template>
  <v-card color="#2C235E" class="text-white pa-8 justify-start">
    <v-card-body>
      <h2 color="primary">{{ poll?.title }}</h2>
    </v-card-body>
    <h3>Escolha entre as opções:</h3>
    <div class="align-center justify-center" v-for="item in poll.items" :key="item.id">
      <h2 variant="solo">
        {{ item.text }}
        <v-btn density="compact" :color="votedColor(item.voted)" icon="mdi-thumb-up" @click="toggleVote(item.id)"></v-btn>
      </h2>
    </div>
  </v-card>
</template>

<script setup>
import { computed } from 'vue';
import { usePollStore } from '@/store/poll'
import { storeToRefs } from 'pinia'


const props = defineProps({
  poll: null
})


console.log(props)

const votedColor = (voted) => voted ? '#FFF' : '#5F578D'

const { toggleVote } = usePollStore();
</script>