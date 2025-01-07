<script lang="ts" setup>

interface Row {
  title: string
  type: string
}

interface Column {
  name: string
  label: string
  align: 'left' | 'center' | 'right' 
  field: string | ((row: Row) => string | number) 
}

const rows: Row[] = [
  { title: 'Orientações Gerais', type: 'pdf' },
  { title: 'Orientações Gerais', type: 'pdf' },
  { title: 'Orientações Gerais', type: 'pdf' },
]

const columns: Column[] = [
  {
    name: 'title',
    label: 'Titulo',
    align: 'center', 
    field: (row: Row) => row.title,
  },
  {
    name: 'type',
    label: 'Tipo',
    align: 'center', 
    field: (row: Row) => row.type,
  },
  {
    name: 'actions',
    label: 'Ações',
    align: 'center', 
    field: 'actions', 
  },
]

</script>

<template>
  <div class="title q-ma-md text-weight-bold text-black text-h5 q-pa-md text-center">
    Nome do Paciente - Documentos
  </div>

  <div class="q-ma-md">
    <q-btn color="primary" icon="upload" label="Adicionar Novo Documento" rounded class="q-mb-md" />

    <q-table title="Documentos" :rows="rows" :columns="columns" row-key="name">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="gap-">
            <q-btn
              class="bg-primary q-mr-sm"
              color="white"
              icon="file_open"
              flat
              round
            />
            <q-btn
              class="bg-primary q-mr-sm"
              color="white"
              icon="file_download"
              flat
              round
            />
            <q-btn
              class="bg-primary"
              color="white"
              icon="delete"
              flat
              round
            />
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

