<template>
  <v-card color="#2C235E" class="text-white pa-8 justify-start" text="Escolha um titulo para a votação">
    <v-text-field
      v-model="getNewPoll.title"
      color="primary"
      label="Titulo"
      variant="solo"
      :onchange="updateNewTitle"
    ></v-text-field>
    <h3>Preencha as opções de títulos:</h3>
    <div class="align-center justify-center" v-for="item in getNewPoll.items" :key="item.id">
      <v-text-field variant="solo" placeholder="Coloque sua opção" v-model="item.text">
        <template v-slot:append>
          <v-btn density="compact" color="#5F578D" icon="mdi-minus" @click="removeFromListNew(item)"></v-btn>
        </template>
      </v-text-field>
    </div>
    <h3 class="text-start">
      <v-btn class="mr-4" density="compact" color="#5F578D" icon="mdi-plus" @click="addToListInNew()"></v-btn>
      Adicionar mais
    </h3>
    <v-btn color="#5F578D" @click="addCreatePoll()">Criar</v-btn>
</v-card>
</template>

<script setup>  
  import { storeToRefs } from 'pinia'
  import { usePollStore } from '@/store/poll'
  
  const props = defineProps({id: 0})
  const { getNewPoll } = storeToRefs(usePollStore())
  const { addToListInNew, updateItemTitle, addCreatePoll, updateNewTitle, removeFromListNew } = usePollStore();
</script>