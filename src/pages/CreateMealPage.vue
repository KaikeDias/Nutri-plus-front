<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type Patient from 'src/models/patient'
import type MealDTO from 'src/models/dtos/mealDTO'
import type FoodDTO from 'src/models/dtos/foodDTO'
import { useRouter } from 'vue-router'
import { useMealsStore } from 'src/stores/mealsStore'

const loadedPatient = ref<Patient | null>()

const mealsStore = useMealsStore()
const router = useRouter()

onMounted(async () => {
  const savedPatient = localStorage.getItem('loadedPatient')
  loadedPatient.value = await JSON.parse(savedPatient!)
})

const formCreated = ref(false)

const meal = reactive<MealDTO>({
  title: '',
  aliments: [],
})

const quantity = ref<number>(1)

const createForm = () => {
  meal.aliments.length = 0
  for (let i = 0; i < quantity.value; i++) {
    meal.aliments.push({
      name: '',
      quantity: '',
      unit: 'Unidade',
      substitutions: [],
    })
  }

  formCreated.value = true
}

const addSubstitute = (foodIndex: number) => {
  if (meal.aliments[foodIndex]) {
    const substitute: FoodDTO = {
      name: '',
      quantity: '',
      unit: 'Unidade',
      substitutions: [],
    }

    meal.aliments[foodIndex].substitutions.push(substitute)
  }
}

const addLoading = ref(false)
const errorMessage = ref<string | null>(null)

const handleAddMeal = async () => {
  errorMessage.value = null
  addLoading.value = true
  try {
    await mealsStore.addMeal(meal, loadedPatient.value!.menuId)
    router.push('/meals')
  } catch (error) {
    errorMessage.value = (error as Error).message
  } finally {
    addLoading.value = false
  }
}
</script>

<template>
  <div class="title q-ma-md text-weight-bold text-black text-h5 q-pa-md text-center">
    {{ loadedPatient?.name }} - Nova Refeição
  </div>

  <div class="column items-center">
    <div class="q-pa-lg">
      <div class="row q-gutter-md q-mb-md items-center">
        <div class="column">
          <div class="text-bold text-h6">Nome da refeição</div>
          <q-input
            v-model="meal.title"
            placeholder="Nome da Refeição"
            outlined
            style="min-width: 500px"
          />
        </div>
        <div class="column">
          <div class="text-bold text-h6">Quantidade de Alimentos</div>
          <q-input v-model.number="quantity" type="number" outlined style="min-width: 100px" />
        </div>
        <q-btn
          label="Criar Formulário"
          color="primary"
          @click="createForm"
          style="max-width: 200px; height: 10px; margin-top: 40px"
        ></q-btn>
      </div>

      <div v-for="(food, foodIndex) in meal.aliments" :key="foodIndex">
        <div class="row q-gutter-md q-mb-md">
          <div class="column">
            <div class="text-bold text-h6">{{ `Alimento ${foodIndex + 1}` }}</div>
            <q-input
              v-model="food.name"
              placeholder="Nome do alimento"
              outlined
              style="min-width: 300px"
            />
          </div>

          <div class="column">
            <div class="text-bold text-h6">Quantidade</div>
            <q-input
              v-model="food.quantity"
              placeholder="Quantidade"
              type="number"
              outlined
              style="min-width: 100px"
            />
          </div>

          <div class="column">
            <div class="text-bold text-h6">Unidade de Medida</div>
            <q-select
              v-model="food.unit"
              :options="['Unidade', 'g', 'Fatia']"
              outlined
              style="min-width: 150px"
            />
          </div>

          <div class="column">
            <q-btn
              label="Adicionar Substituição"
              color="secondary"
              @click="addSubstitute(foodIndex)"
              style="max-width: 400px; height: 10px; margin-top: 40px"
            />
          </div>
        </div>

        <div
          v-for="(substitute, subIndex) in food.substitutions"
          :key="`${foodIndex}-${subIndex}`"
          class="q-pa-sm q-ml-lg"
        >
          <div class="row q-gutter-md">
            <div class="column">
              <div class="text-bold text-h6">{{ `Substituição ${subIndex + 1}` }}</div>
              <q-input
                v-model="substitute.name"
                placeholder="Nome do alimento"
                outlined
                style="min-width: 300px"
              />
            </div>
            <div>
              <div class="text-bold text-h6">Quantidade</div>
              <q-input
                v-model="substitute.quantity"
                placeholder="Quantidade"
                type="number"
                outlined
                style="min-width: 100px"
              />
            </div>
            <div>
              <div class="text-bold text-h6">Unidade de Medida</div>
              <q-select
                v-model="substitute.unit"
                :options="['Unidade', 'g', 'Fatia']"
                placeholder="Unidade de medida"
                outlined
                style="min-width: 150px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-btn
      v-if="formCreated"
      color="primary"
      label="salvar"
      :loading="addLoading"
      @click="handleAddMeal"
    />
  </div>
</template>

<style scoped>
.title {
  background-color: #cde7eb;
  border-radius: 50px;
}
</style>
