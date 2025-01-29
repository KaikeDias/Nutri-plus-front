<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import ExpansionItemForm from 'src/components/ExpansionItemForm.vue'
import type QuestionDTO from 'src/models/dtos/QuestionDTO'
import type Patient from 'src/models/patient'
import type Question from 'src/models/question'
import { useFormStore } from 'src/stores/formStore'
import { onMounted, ref } from 'vue'

const formStore = useFormStore()
const loadedPatient = ref<Patient | null>()

const { questions } = storeToRefs(formStore)

onMounted(async () => {
  const savedPatient = localStorage.getItem('loadedPatient')
  loadedPatient.value = await JSON.parse(savedPatient!)
  if (loadedPatient.value) {
    console.log(loadedPatient.value.formId)
    formStore.fetchQuestions(loadedPatient.value.id)
  }
})

const newQuestion = ref<QuestionDTO>({
  question: '',
})
const addDialog = ref(false)
const addLoading = ref(false)
const addErrorMessage = ref<string | null>()

const openAddDialog = () => {
  addDialog.value = true
  newQuestion.value = {
    question: '',
  }
}

const handleAddQuestion = async () => {
  addLoading.value = true
  addErrorMessage.value = null

  try {
    if (loadedPatient.value) {
      await formStore.addQuestion(loadedPatient.value.formId ,newQuestion.value)
      await formStore.fetchQuestions(loadedPatient.value.id)
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
const selectedEditQuestion = ref<Question>({
  id: '',
  question: '',
  answer: '',
})

const openEditDialog = (editQuestion: Question) => {
  editDialog.value = true
  selectedEditQuestion.value = { ...editQuestion }
}

const handleEditQuestion = async () => {
  editLoading.value = true
  editErrorMessage.value = null

  try {
    if (loadedPatient.value) {
      await formStore.editQuestion(selectedEditQuestion.value)
      await formStore.fetchQuestions(loadedPatient.value.id)
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
const selectedDeleteQuestion = ref<Question>({
  id: '',
  question: '',
  answer: '',
})

const openDeleteDialog = (deleteQuestion: Question) => {
  deleteDialog.value = true
  selectedDeleteQuestion.value = { ...deleteQuestion }
}

const handleDeleteQuestion = async () => {
  deleteLoading.value = true
  deleteErrorMessage.value = null

  try {
    if (loadedPatient.value) {
      await formStore.deleteQuestion(selectedDeleteQuestion.value.id)
      await formStore.fetchQuestions(loadedPatient.value.id)
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
    {{ loadedPatient?.name }} - Formulário de Anamnese
  </div>

  <div class="q-ma-md">
    <q-btn
      color="primary"
      icon="add"
      label="Nova Pergunta"
      rounded
      class="q-mb-md"
      @click="openAddDialog"
    />

    <ExpansionItemForm
      v-for="(question, index) in questions"
      :key="index"
      :question="question"
      @edit="openEditDialog"
      @delete="openDeleteDialog"
    />
  </div>

  <q-dialog v-model="addDialog" persistent>
    <q-card style="width: 700px; max-width: 80vw">
      <q-form @submit.prevent="handleAddQuestion">
        <q-card-section class="row justify-center">
          <div class="text-h5 text-weight-bold">Adicionar Pergunta</div>
        </q-card-section>

        <q-separator />
        <q-card-section class="q-pt-none q-gutter-y-md">
          <div class="q-mt-lg">
            <div class="text-bold text-h6">Pergunta</div>
            <q-input placeholder="Nova pergunta" outlined v-model="newQuestion.question"> </q-input>
          </div>
        </q-card-section>

        <q-card-actions align="between">
          <q-btn square label="Cancelar" v-close-popup class="bg-negative text-white" />
          <q-btn
            class="bg-primary text-white"
            flat
            label="Adicionar"
            :loading="addLoading"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
  
  <q-dialog v-model="editDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-form @submit.prevent="handleEditQuestion">
          <q-card-section class="row justify-center">
            <div class="text-h5 text-weight-bold">Editar Pergunta</div>
          </q-card-section>

          <q-separator />
          <q-card-section class="q-pt-none q-gutter-y-md">
            <div class="q-mt-lg">
              <div class="text-bold text-h6">Pergunta</div>
              <q-input placeholder="Pergunta" outlined v-model="selectedEditQuestion.question">
              </q-input>
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
        <div class="text-h6 text-weight-bold">Tem certeza que deseja excluir esta pergunta?</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="around">
        <q-btn square label="Cancelar" v-close-popup class="bg-primary text-white" />
        <q-btn
          class="bg-negative text-white"
          flat
          label="Deletar"
          icon="delete"
          :loading="deleteLoading"
          @click="handleDeleteQuestion"
        />
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
