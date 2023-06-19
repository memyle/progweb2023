<template>
  <v-card color="#2C235E" class="text-white pa-8 justify-start">
    <v-card-body>
      <h2 color="primary">{{ title }}</h2>
    </v-card-body>
    <h3>Escolha entre as opções:</h3>
    <div class="align-center justify-center" v-for="item in list" :key="item.id">
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
  id: 0
})

const { getPools, getShowVoteControl } = storeToRefs(usePollStore())
const list = computed(() => getPools.value[0].items)
const title = computed(() => getPools.value[0].title)

const votedColor = (voted) => voted ? '#FFF' : '#5F578D'

const { toggleVote } = usePollStore();
</script>