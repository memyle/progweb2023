<template>
  <v-container class="fill-height">
    <v-responsive class="align-start text-center fill-height">
      <h1 class="my-8">Adicionar uma nova poll</h1>
      <v-row class="d-flex align-start justify-start">
        <CardHome />
      </v-row>
      <h1 class="my-8">Lista das votações abertas</h1>
      <v-row class="d-flex align-start justify-start">
        <div v-for="item in getPools">
          <VoteHome class="ma-8" id="0" :poll="item"/>
        </div>
      </v-row>
      <!-- <h1 class="my-8">Lista das votações mais votadas (TOP 10)</h1>
      <v-row class="d-flex align-start justify-start">
        <div v-for="item in getPools">
          <VoteHome class="ma-8" id="0" :poll="item"/>
        </div>
      </v-row> -->
    </v-responsive>
  </v-container>
</template>

<script setup>
  import { computed } from 'vue';
  import CardHome from './CardHome.vue';
  import VoteHome from './VoteHome.vue';
  import { usePollStore } from '@/store/poll'
  import { storeToRefs } from 'pinia'
  import { useFirestore, useCollection } from 'vuefire'
  import { collection } from 'firebase/firestore'

  const { getPools } = storeToRefs(usePollStore())
  
  const polls = computed(() => getPools)
  
  const db = useFirestore()
  const firebasePolls = useCollection(collection(db, 'polls'))
</script>
