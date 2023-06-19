<template>
  <v-container class="fill-height">
    <v-responsive class="align-start text-center fill-height">
      <h1 class="my-8">Adicionar uma nova poll</h1>
      <v-row class="d-flex align-start justify-start">
        <CardHome v-for="item in getPools" id="0" />
      </v-row>
      <h1 class="my-8">Lista das votações abertas</h1>
      <v-row class="d-flex align-start justify-start">
        <VoteHome v-for="item in getPools" id="0" />
      </v-row>
      <h1 class="my-8">Lista das votações mais votadas (TOP 10)</h1>
      <v-row  v-for="item in getPools" class="d-flex align-start justify-start">
        <VoteHome id="0" />
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import CardHome from './CardHome.vue';
import VoteHome from './VoteHome.vue';
import { usePollStore } from '@/store/poll'
import { storeToRefs } from 'pinia'

const { getPools } = storeToRefs(usePollStore())
const { initList } = usePollStore()
initList()
</script>
