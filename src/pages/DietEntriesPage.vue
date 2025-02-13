<script lang="ts" setup>
import type Patient from 'src/models/patient'
import { onMounted, ref } from 'vue'

const loadedPatient = ref<Patient | null>()
const dialog = ref(true)

onMounted(async () => {
  const savedPatient = localStorage.getItem('loadedPatient')
  loadedPatient.value = await JSON.parse(savedPatient!)
})
</script>

<template>
  <div class="title q-ma-md text-weight-bold text-black text-h5 q-pa-md text-center">
    {{ loadedPatient?.name }} - Registro do dia 12/02/2025
  </div>

  <div class="q-pa-lg">
    <q-card elevated clickable class="cursor-pointer q-pa-md">
      <q-card-section class="row justify-between items-center">
        <div class="row items-center">
          <q-icon name="restaurant" size="32px" class="q-mr-md" />
          <div class="text-h4">Almoço</div>
        </div>
        <q-icon name="navigate_next" size="32px" class="q-mr-md" />
      </q-card-section>
    </q-card>
  </div>

  <q-dialog v-model="dialog">
    <q-card class="q-pa-md" style="width: 300px">
      <q-card-section class="text-h6">Almoço</q-card-section>

      <q-card-section>
        <div class="row items-center">
          <q-icon name="check" color="primary" class="q-mr-sm" />
          <span>Arroz</span>
        </div>
        <div class="row items-center">
          <q-icon name="check" color="primary" class="q-mr-sm" />
          <span>Ovo</span>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-subtitle2">Imagem</div>
        <q-img
          src="https://oestadoonline.com.br/wp-content/uploads/2023/06/arrozcomovo.png"
          style="width: 100%; height: 150px"
          class="q-mt-sm"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Fechar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.title {
  background-color: #cde7eb;
  border-radius: 50px;
}
</style>
