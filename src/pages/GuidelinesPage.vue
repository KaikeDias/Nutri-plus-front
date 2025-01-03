<script lang="ts" setup>
import ExpansionItem from 'src/components/ExpansionItem.vue'
import type Guideline from 'src/models/guideline'
import { ref } from 'vue'

const guidelines = ref<Guideline[]>([
  {
    title: 'Orientações Gerais',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam doloribus excepturi, incidunt animi aliquam velit qui. Similique fuga, dolores quod officia iste fugiat sapiente blanditiis quis saepe a quasi unde?Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, aspernatur sequi ipsam, perspiciatis sint soluta nobis dolorem, fuga nisi sapiente quia velit dolorum quas dolores eius autem. Sunt, ducimus earum. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut dolores quod nihil quae minima officiis temporibus quia, corporis obcaecati a error quisquam quidem, modi, voluptates animi quam! Esse, dolor dolorem!',
  },
  {
    title: 'Orientações Gerais',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam doloribus excepturi, incidunt animi aliquam velit qui. Similique fuga, dolores quod officia iste fugiat sapiente blanditiis quis saepe a quasi unde?Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, aspernatur sequi ipsam, perspiciatis sint soluta nobis dolorem, fuga nisi sapiente quia velit dolorum quas dolores eius autem. Sunt, ducimus earum. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut dolores quod nihil quae minima officiis temporibus quia, corporis obcaecati a error quisquam quidem, modi, voluptates animi quam! Esse, dolor dolorem!',
  },
  {
    title: 'Orientações Gerais',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam doloribus excepturi, incidunt animi aliquam velit qui. Similique fuga, dolores quod officia iste fugiat sapiente blanditiis quis saepe a quasi unde?Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, aspernatur sequi ipsam, perspiciatis sint soluta nobis dolorem, fuga nisi sapiente quia velit dolorum quas dolores eius autem. Sunt, ducimus earum. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut dolores quod nihil quae minima officiis temporibus quia, corporis obcaecati a error quisquam quidem, modi, voluptates animi quam! Esse, dolor dolorem!',
  },
  {
    title: 'Orientações Gerais',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam doloribus excepturi, incidunt animi aliquam velit qui. Similique fuga, dolores quod officia iste fugiat sapiente blanditiis quis saepe a quasi unde?Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, aspernatur sequi ipsam, perspiciatis sint soluta nobis dolorem, fuga nisi sapiente quia velit dolorum quas dolores eius autem. Sunt, ducimus earum. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut dolores quod nihil quae minima officiis temporibus quia, corporis obcaecati a error quisquam quidem, modi, voluptates animi quam! Esse, dolor dolorem!',
  },
])
</script>

<template>
  <div class="title q-ma-md text-weight-bold text-black text-h5 q-pa-md text-center">
    Nome do Paciente - Orientações Nutricionais
  </div>

  <div class="q-ma-md">
    <q-btn color="primary" icon="add" label="Nova Orientação" rounded class="q-mb-md" />

    <ExpansionItem v-for="(guideline, index) in guidelines" :key="index" :guideline="guideline" />
  </div>
</template>

<style scoped>
.title {
  background-color: #cde7eb;
  border-radius: 50px;
}
</style>
