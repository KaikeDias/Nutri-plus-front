<script lang="ts" setup>
import { ref } from 'vue'
import MealCard from 'src/components/mealCard.vue'
import type Meal from 'src/models/meal';


const meals = ref<Meal[]>([
  {
    title: 'Café da Manhã',
    foods: [
      { name: 'Pão Francês', quantity: '1', unit: 'unidade' },
      { name: 'Ovo', quantity: '2', unit: 'unidades' },
      { name: 'Leite', quantity: '200', unit: 'ml' },
    ],
  },
  {
    title: 'Almoço',
    foods: [
      { name: 'Arroz', quantity: '150', unit: 'g' },
      { name: 'Feijão', quantity: '100', unit: 'g' },
      { name: 'Frango', quantity: '120', unit: 'g' },
    ],
  },
  {
    title: 'Almoço',
    foods: [
      { name: 'Arroz', quantity: '150', unit: 'g' },
      { name: 'Feijão', quantity: '100', unit: 'g' },
      { name: 'Frango', quantity: '120', unit: 'g' },
    ],
  },
  {
    title: 'Almoço',
    foods: [
      { name: 'Arroz', quantity: '150', unit: 'g' },
      { name: 'Feijão', quantity: '100', unit: 'g' },
      { name: 'Frango', quantity: '120', unit: 'g' },
    ],
  },
])

// const removeMeal = (meal: Meal) => {
// //   meals.value = meals.value.filter((m) => m !== meal)
// }

const editMeal = (meal: Meal) => {
  console.log('Editar refeição:', meal)
}
</script>
<template>
  <div id="q-app">
    <div class="title q-ma-md text-weight-bold text-black text-h5 q-pa-md text-center">
      Nome do Paciente - Cardápio
    </div>

    <div class="q-ma-md">
      <q-btn color="primary" icon="add" label="Nova Refeição" rounded class="q-mb-md" />

      <MealCard
        v-for="(meal, index) in meals"
        :key="index"
        :meal="meal"
        @edit="editMeal"
      />
    </div>
  </div>
</template>

<style scoped>
.title {
  background-color: #cde7eb;
  border-radius: 50px;
}
</style>
