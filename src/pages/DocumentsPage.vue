<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import type { QFile } from 'quasar'
import type { Document } from 'src/models/dtos/document'
import type { DocumentDAO } from 'src/models/dtos/documentDAO'
import type Patient from 'src/models/patient'
import { useDocumentsStore } from 'src/stores/documentsStore'
import { onMounted, ref } from 'vue'

const loadedPatient = ref<Patient | null>()
const documentsStore = useDocumentsStore()
const { documents } = storeToRefs(documentsStore)
const fetchLoading = ref(true)

onMounted(async () => {
  const savedPatient = localStorage.getItem('loadedPatient')
  loadedPatient.value = await JSON.parse(savedPatient!)
  if (loadedPatient.value) {
    try {
      await documentsStore.fetchDocuments(loadedPatient.value.id) // Aguarda o fetch
    } catch (error) {
      console.error('Erro ao buscar documentos:', error)
    } finally {
      fetchLoading.value = false // Só define como falso após o fetch
    }
  } else {
    fetchLoading.value = false // Garantia para caso não haja paciente carregado
  }
})

interface Column {
  name: string
  label: string
  align: 'left' | 'center' | 'right'
  field: string | ((row: Document) => string | number)
}

const columns: Column[] = [
  {
    name: 'title',
    label: 'Titulo',
    align: 'center',
    field: (row: Document) => row.filename,
  },
  {
    name: 'size',
    label: 'Tamanho',
    align: 'center',
    field: (row: Document) => row.size,
  },
  {
    name: 'actions',
    label: 'Ações',
    align: 'center',
    field: 'actions',
  },
]

const handleDownload = (selectedDocument: Document) => {
  documentsStore.downloadDocument(selectedDocument.id)
}

const file = ref<File | null>(null)
const isUploading = ref(false)

const makeForm = (file: File | null): FormData => {
  if (file == null) {
    throw new Error('File is null')
  }

  if (loadedPatient.value == null) {
    throw new Error('LoadedPatient is null')
  }

  const data = new FormData()
  data.append('file', file)
  data.append('patientId', loadedPatient.value.id)
  data.append('filename', file.name)

  return data
}

const handleUploadDocument = async () => {
  isUploading.value = true
  fetchLoading.value = true

  try {
    await documentsStore.uploadDocument(makeForm(file.value))
    await documentsStore.fetchDocuments(loadedPatient.value!.id)
    file.value = null
    isUploading.value = false
  } catch (e) {
    console.log(e)
  } finally {
    fetchLoading.value = false
  }
}

const deleteDialog = ref(false)
const deleteLoading = ref(false)
const deleteErrorMessage = ref<string | null>()
const selectedDeleteFile = ref<DocumentDAO>()

const openDeleteDialog = (deletedFile: DocumentDAO) => {
  deleteDialog.value = true
  selectedDeleteFile.value = { ...deletedFile }
}

const handleDeleteDocument = async () => {
  deleteLoading.value = true
  deleteErrorMessage.value = null

  try {
    if (loadedPatient.value) {
      await documentsStore.deleteDocument(selectedDeleteFile.value!.id)
      await documentsStore.fetchDocuments(loadedPatient.value.id)
      deleteDialog.value = false
    }
  } catch (error) {
    deleteErrorMessage.value = (error as Error).message
  } finally {
    deleteLoading.value = false
  }
}

const handleOpenDocument = (selectedDocument: Document) => {
  documentsStore.openDocument(selectedDocument.id)
}
</script>

<template>
  <div class="title q-ma-md text-weight-bold text-black text-h5 q-pa-md text-center">
    {{ loadedPatient?.name }} - Documentos
  </div>

  <div class="q-ma-md">
    <div class="q-mb-md">
      <q-form>
        <q-file
          v-model="file"
          label="Adicionar Documento"
          color="primary"
          accept=".pdf, .docx, .docm"
          use-chips
          outlined
          style="max-width: 400px"
          class="q-mb-sm"
        />

        <q-btn
          label="Adicionar"
          :loading="isUploading"
          @click="handleUploadDocument"
          class="bg-primary text-white"
        />
      </q-form>
    </div>
    <q-table
      title="Documentos"
      :rows="documents"
      :columns="columns"
      row-key="name"
      :loading="fetchLoading"
    >
      <template #loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="gap-">
          <q-btn
            class="bg-primary q-mr-sm"
            color="white"
            icon="file_open"
            flat
            round
            @click="handleOpenDocument(props.row)"
          />
          <q-btn
            class="bg-primary q-mr-sm"
            color="white"
            icon="file_download"
            flat
            round
            @click="handleDownload(props.row)"
          />
          <q-btn
            class="bg-primary"
            color="white"
            icon="delete"
            flat
            round
            @click="openDeleteDialog(props.row)"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="deleteDialog" persistent>
      <q-card style="width: 600px; max-width: 80vw">
        <q-card-section class="row justify-center">
          <div class="text-h6 text-weight-bold">Tem certeza que deseja excluir este documento?</div>
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
            @click="handleDeleteDocument"
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
