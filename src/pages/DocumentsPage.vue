<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import type { QFile } from 'quasar'
import type { Document } from 'src/models/dtos/document'
import type Patient from 'src/models/patient'
import { useDocumentsStore } from 'src/stores/documentsStore'
import { computed, onMounted, ref } from 'vue'

const loadedPatient = ref<Patient | null>()
const documentsStore = useDocumentsStore()
const { documents } = storeToRefs(documentsStore)

onMounted(async () => {
  const savedPatient = localStorage.getItem('loadedPatient')
  loadedPatient.value = await JSON.parse(savedPatient!)
  if (loadedPatient.value) {
    documentsStore.fetchDocuments(loadedPatient.value.id)
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

const handleDowload = (selectedDocument: Document) => {
  documentsStore.downloadDocument(selectedDocument.id)
}

const file = ref<File>()
const canUpload = computed(() => file.value !== null && file.value !== undefined)
const isUploading = ref(false)
const formData = ref<FormData | null>()

const handleUpload = async () => {
  isUploading.value = true

  console.log(formData.value)
  try {
    if (formData.value != null) {
      documentsStore.uploadDocument(formData.value)
      documentsStore.fetchDocuments(loadedPatient.value!.id)
      
      isUploading.value = false
      alert('Documento enviado com sucesso!')
    }
  } catch (error) {
    console.error('Erro ao enviar o documento:', error)
    alert('Erro ao enviar o documento')
  }
}
</script>

<template>
  <div class="title q-ma-md text-weight-bold text-black text-h5 q-pa-md text-center">
    {{ loadedPatient?.name }} - Documentos
  </div>

  <div class="q-ma-md">
    <q-file
      v-model="file"
      outlined
      clearable
      class="q-mb-md text-white"
      style="max-width: 400px"
      label="Adicionar Documento"
      accept=".pdf"
    >
      <template v-slot:prepend>
        <q-icon name="attach_file" />
      </template>

      <template v-slot:after v-if="canUpload">
        <q-btn
          color="primary"
          dense
          icon="cloud_upload"
          round
          @click="handleUpload"
          :loading="isUploading"
          :disable="!canUpload"
        />
      </template>
    </q-file>

    <q-table title="Documentos" :rows="documents" :columns="columns" row-key="name">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="gap-">
          <q-btn class="bg-primary q-mr-sm" color="white" icon="file_open" flat round />
          <q-btn
            class="bg-primary q-mr-sm"
            color="white"
            icon="file_download"
            flat
            round
            @click="handleDowload(props.row)"
          />
          <q-btn class="bg-primary" color="white" icon="delete" flat round />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<style scoped>
.title {
  background-color: #cde7eb;
  border-radius: 50px;
}
</style>
