<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import MealCard from 'src/components/mealCard.vue'
import type Meal from 'src/models/meal'
import type Patient from 'src/models/patient'
import { useMealsStore } from 'src/stores/mealsStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
// import type Food from 'src/models/food'

const loadedPatient = ref<Patient | null>()

const mealsStore = useMealsStore()
const router = useRouter();

const { meals } = storeToRefs(mealsStore)

onMounted(async () => {
  const savedPatient = localStorage.getItem('loadedPatient')
  // console.log(savedPatient)
  loadedPatient.value = await JSON.parse(savedPatient!)
  if (loadedPatient.value) {
    console.log(loadedPatient.value)
    console.log(loadedPatient.value.menuId)
    mealsStore.fetchMeals(loadedPatient.value.menuId)
    console.log(meals)
  }
})

const { substitutions } = storeToRefs(mealsStore)
const substitutionsDialog = ref(false)

const showSubstitutions = (foodId: string) => {
  mealsStore.fetchSubstitutions(foodId)
  substitutionsDialog.value = true
}


const editMeal = (meal: Meal) => {
  console.log('Editar refeição:', meal)
}
</script>

<template>
  <div id="q-app">
    <div class="title q-ma-md text-weight-bold text-black text-h5 q-pa-md text-center">
      {{ loadedPatient?.name }} - Cardápio
    </div>

    <div class="q-ma-md">
      <q-btn color="primary" icon="add" label="Nova Refeição" rounded class="q-mb-md" @click="router.push('/createMeal')"/>

      <MealCard
        v-for="(meal, index) in meals"
        :key="index"
        :meal="meal"
        @edit="editMeal"
        @show-substitutions="showSubstitutions"
      />
    </div>
  </div>

  <q-dialog v-model="substitutionsDialog">
    <q-card style="width: 500px; max-width: 80vw" class="bg-grey-4 q-pa-md">
      <div class="text-h5 text-center q-ma-md text-bold">Substituições:</div>
      <hr />
      <q-list v-for="(food, index) in substitutions" :key="index" class="q-pa-sm">
        <q-item-section class="q-pa-md bg-white" style="border-radius: 10px">
          <q-item-label class="text-bold text-primary">{{ food.name }}</q-item-label>
          <q-item-label caption>{{ food.quantity }} {{ food.unit }}</q-item-label>
        </q-item-section>
      </q-list>
      <div class="row justify-end">
        <q-btn color="negative" label="Fechar" class="" v-close-popup />
      </div>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.title {
  background-color: #cde7eb;
  border-radius: 50px;
}
</style>
