<template>
  <v-card color="#2C235E" class="text-white pa-8 justify-start" text="Escolha um titulo para a votação">
    <v-card-body>
      <v-text-field
        v-model="title"
        color="primary"
        label="Titulo"
        variant="solo"
      ></v-text-field>
    </v-card-body>
    <h3>Preencha as opções de títulos:</h3>
    <div class="align-center justify-center" v-for="item in list" :key="item.id">
      <v-text-field variant="solo" :placeholder="item.text">
        <template v-slot:append>
          <v-btn density="compact" color="#5F578D" icon="mdi-minus" @click="removeFromList(item)"></v-btn>
        </template>
      </v-text-field>
    </div>
    <h3 class="text-start">
      <v-btn class="mr-4" density="compact" color="#5F578D" icon="mdi-plus" @click="addToList()"></v-btn>
      Adicionar mais
    </h3>
    <v-btn color="#5F578D">Criar</v-btn>
</v-card>
</template>

<script setup>  
  import { computed } from 'vue';
  import { usePollStore } from '@/store/poll'
  import { storeToRefs } from 'pinia'

  
  const props = defineProps({
    id: 0
  })

  const { getPools } = storeToRefs(usePollStore())
  const list = computed(() => getPools.value[0].items)
  const title = computed(() => getPools.value[0].title)
  
  const { addToList } = usePollStore();
  const { removeFromList } = usePollStore();
</script>