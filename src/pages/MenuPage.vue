<script setup lang="ts">
import type Patient from 'src/models/patient'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// import { usePatientStore } from 'src/stores/patientStore';

// const patientStore = usePatientStore();
const router = useRouter()

const loadedPatient = ref<Patient>()
const savedPatient = localStorage.getItem('loadedPatient')
loadedPatient.value = JSON.parse(savedPatient!)

const waterAmount = ref(0)
const dialog = ref(false)

function onCardClick() {
  console.log('Card clicado!')
}

const openMealsPage = () => {
  router.push('/meals')
}

const openGuidelinePage = () => {
  router.push('/guidelines')
}

const openDocumentsPage = () => {
  router.push('/documents')
}

const openFormPage = () => {
  router.push('/form')
}

const openEntriesPage = () => {
  router.push('/entries')
}
</script>

<template>
  <div class="title q-ma-md text-weight-bold text-black text-h5 q-pa-md text-center">
    {{ loadedPatient?.name }}
  </div>

  <div class="q-app q-pa-lg q-gutter-y-lg" style="min-height: 100vh">
    <q-card elevated clickable class="cursor-pointer q-pa-md" @click="openMealsPage">
      <q-card-section class="row justify-between items-center">
        <div class="row items-center">
          <q-icon name="restaurant_menu" size="32px" class="q-mr-md" />
          <div class="text-h4">Cardápio</div>
        </div>
        <q-icon name="navigate_next" size="32px" class="q-mr-md" />
      </q-card-section>
    </q-card>

    <q-card elevated clickable class="cursor-pointer q-pa-md" @click="openFormPage">
      <q-card-section class="row justify-between items-center">
        <div class="row items-center">
          <q-icon name="list_alt" size="32px" class="q-mr-md" />
          <div class="text-h4">Formulário de Anamnese</div>
        </div>
        <q-icon name="navigate_next" size="32px" class="q-mr-md" />
      </q-card-section>
    </q-card>

    <q-card elevated clickable class="cursor-pointer q-pa-md" @click="openGuidelinePage">
      <q-card-section class="row justify-between items-center">
        <div class="row items-center">
          <q-icon name="assignment" size="32px" class="q-mr-md" />
          <div class="text-h4">Orientações Nutricionais</div>
        </div>
        <q-icon name="navigate_next" size="32px" class="q-mr-md" />
      </q-card-section>
    </q-card>

    <q-card elevated clickable class="cursor-pointer q-pa-md" @click="openDocumentsPage">
      <q-card-section class="row justify-between items-center">
        <div class="row items-center">
          <q-icon name="description" size="32px" class="q-mr-md" />
          <div class="text-h4">Documentos</div>
        </div>
        <q-icon name="navigate_next" size="32px" class="q-mr-md" />
      </q-card-section>
    </q-card>

    <q-card elevated clickable class="cursor-pointer q-pa-md" @click="openEntriesPage">
      <q-card-section class="row justify-between items-center">
        <div class="row items-center">
          <q-icon name="free_cancellation" size="32px" class="q-mr-md" />
          <div class="text-h4">Diário Alimentar</div>
        </div>
        <q-icon name="navigate_next" size="32px" class="q-mr-md" />
      </q-card-section>
    </q-card>

    <q-card elevated clickable class="cursor-pointer q-pa-md" @click="onCardClick">
      <q-card-section class="row justify-between items-center">
        <div class="row items-center">
          <q-icon name="pending_actions" size="32px" class="q-mr-md" />
          <div class="text-h4">Metas</div>
        </div>
        <q-icon name="navigate_next" size="32px" class="q-mr-md" />
      </q-card-section>
    </q-card>
  </div>

  <q-dialog v-model="dialog">
    <q-card class="q-pa-md" style="width: 400px">
      <q-card-section class="text-h6 text-center">Meta de Consumo de Água</q-card-section>

      <q-card-section>
        <q-input v-model="waterAmount" outlined label="Quantidade (mL)" type="number" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="negative" v-close-popup />
        <q-btn flat label="Salvar" color="primary" />
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
