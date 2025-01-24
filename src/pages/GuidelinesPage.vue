<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import ExpansionItem from 'src/components/ExpansionItem.vue'
import type GuidelineDTO from 'src/models/dtos/guidelineDTO'
import type Guideline from 'src/models/guideline'
import type Patient from 'src/models/patient'
import { useGuidelineStore } from 'src/stores/guidelineStore'
import { onMounted, ref } from 'vue'

const guidelineStore = useGuidelineStore()
const loadedPatient = ref<Patient | null>()

const { guidelines } = storeToRefs(guidelineStore)

onMounted(async () => {
  const savedPatient = localStorage.getItem('loadedPatient')
  loadedPatient.value = await JSON.parse(savedPatient!)
  if (loadedPatient.value) {
    console.log(loadedPatient.value.id)
    await guidelineStore.fetchGuidelines(loadedPatient.value?.id)
    console.log(guidelines.value)
  }
})

const guidelineDto = ref<GuidelineDTO>({
  title: '',
  content: '',
  patientId: '',
})
const addDialog = ref(false)
const addLoading = ref(false)
const addErrorMessage = ref<string | null>()

const openAddDialog = () => {
  addDialog.value = true
  guidelineDto.value = {
    title: '',
    content: '',
    patientId: '',
  }
}

const handleAddGuideline = async () => {
  addLoading.value = true
  addErrorMessage.value = null

  try {
    if (loadedPatient.value) {
      guidelineDto.value.patientId = loadedPatient.value.id
      await guidelineStore.createGuideline(guidelineDto.value)
      await guidelineStore.fetchGuidelines(loadedPatient.value.id)
      addDialog.value = false
    }
  } catch (error) {
    addErrorMessage.value = (error as Error).message
  } finally {
    addLoading.value = false
  }
}

const editDialog = ref(false)
const editLoading = ref(false)
const editErrorMessage = ref<string | null>()
const selectedEditGuideline = ref<Guideline>({
  id: '',
  title: '',
  content: '',
})

const openEditDialog = (editGuideline: Guideline) => {
  editDialog.value = true
  selectedEditGuideline.value = { ...editGuideline }
}

const handleEditGuideline = async () => {
  editLoading.value = true
  editErrorMessage.value = null

  try {
    if (loadedPatient.value) {
      await guidelineStore.editGuideline(selectedEditGuideline.value)
      await guidelineStore.fetchGuidelines(loadedPatient.value.id)
      editDialog.value = false
    }
  } catch (error) {
    editErrorMessage.value = (error as Error).message
  } finally {
    editLoading.value = false
  }
}

const deleteDialog = ref(false)
const deleteLoading = ref(false)
const deleteErrorMessage = ref<string | null>()
const selectedDeleteGuideline = ref<Guideline>({
  id: '',
  title: '',
  content: '',
})

const openDeleteDialog = (deleteGuideline: Guideline) => {
  deleteDialog.value = true
  selectedDeleteGuideline.value = { ...deleteGuideline }
}

const handleDeleteGuideline = async () => {
  deleteLoading.value = true
  deleteErrorMessage.value = null

  try {
    if(loadedPatient.value) {
      await guidelineStore.deleteGuideline(selectedDeleteGuideline.value.id)
      await guidelineStore.fetchGuidelines(loadedPatient.value.id)
      deleteDialog.value = false
    }
  } catch (error) {
    deleteErrorMessage.value = (error as Error).message
  } finally {
    deleteLoading.value = false
  }
}
</script>

<template>
  <div class="title q-ma-md text-weight-bold text-black text-h5 q-pa-md text-center">
    {{ loadedPatient?.name }} - Orientações Nutricionais
  </div>

  <div class="q-ma-md">
    <q-btn
      color="primary"
      icon="add"
      label="Nova Orientação"
      rounded
      class="q-mb-md"
      @click="openAddDialog"
    />

    <ExpansionItem
      v-for="(guideline, index) in guidelines"
      :key="index"
      :guideline="guideline"
      :add-loading="addLoading"
      @edit="openEditDialog(guideline)"
      @delete="openDeleteDialog(guideline)"
    />

    <q-dialog v-model="addDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-form @submit.prevent="handleAddGuideline">
          <q-card-section class="row justify-center">
            <div class="text-h5 text-weight-bold">Adicionar Orientação Nutricional</div>
          </q-card-section>

          <hr />
          <q-card-section class="q-pt-none q-gutter-y-md">
            <div class="q-mt-lg">
              <div class="text-bold text-h6">Titulo</div>
              <q-input placeholder="Titulo" outlined v-model="guidelineDto.title"> </q-input>
            </div>
            <div>
              <div class="text-bold text-h6">Conteúdo</div>
              <q-input
                placeholder="Digite a orientação nutricional..."
                outlined
                v-model="guidelineDto.content"
                type="textarea"
              ></q-input>
            </div>
          </q-card-section>

          <q-card-actions align="between">
            <q-btn square label="Cancelar" v-close-popup class="bg-negative text-white" />
            <q-btn
              class="bg-primary text-white"
              flat
              label="Salvar"
              :loading="addLoading"
              type="submit"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="editDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-form @submit.prevent="handleEditGuideline">
          <q-card-section class="row justify-center">
            <div class="text-h5 text-weight-bold">Editar Orientação Nutricional</div>
          </q-card-section>

          <hr />
          <q-card-section class="q-pt-none q-gutter-y-md">
            <div class="q-mt-lg">
              <div class="text-bold text-h6">Titulo</div>
              <q-input placeholder="Titulo" outlined v-model="selectedEditGuideline.title">
              </q-input>
            </div>
            <div>
              <div class="text-bold text-h6">Conteúdo</div>
              <q-input
                placeholder="Digite a orientação nutricional..."
                outlined
                v-model="selectedEditGuideline.content"
                type="textarea"
              ></q-input>
            </div>
          </q-card-section>

          <q-card-actions align="between">
            <q-btn square label="Cancelar" v-close-popup class="bg-negative text-white" />
            <q-btn
              class="bg-primary text-white"
              flat
              label="Salvar"
              :loading="editLoading"
              type="submit"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteDialog" persistent>
    <q-card style="width: 600px; max-width: 80vw">
      <q-card-section class="row justify-center">
        <div class="text-h6 text-weight-bold">Tem certeza que deseja excluir esta orientação nutricional?</div>
      </q-card-section>

      <hr />

      <q-card-actions align="around">
        <q-btn square label="Cancelar" v-close-popup class="bg-primary text-white" />
        <q-btn
          class="bg-negative text-white"
          flat
          label="Deletar"
          icon="delete"
          :loading="deleteLoading"
          @click="handleDeleteGuideline"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  </div>
</template>

<style scoped>
.title {
  background-color: #cde7eb;
  border-radius: 50px;
}
</style>
