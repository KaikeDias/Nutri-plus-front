<script setup lang="ts">
import type Patient from 'src/models/Patient'
import { ref } from 'vue'

interface Row {
  name: string
  email: string
}

interface Column {
  name: string
  label: string
  align: 'left' | 'center' | 'right' // Corrigido para aceitar apenas os valores possíveis
  field: string | ((row: Row) => string | number) // 'field' pode ser uma string ou uma função
}

const rows: Row[] = [
  { name: 'Joao', email: 'joao@email.com' },
  { name: 'Lucas', email: 'lucas@email.com' },
  { name: 'Ana', email: 'ana@email.com' },
  { name: 'Carlos', email: 'carlos@email.com' },
  { name: 'Maria', email: 'maria@email.com' },
  { name: 'Maria', email: 'maria@email.com' },
  { name: 'Maria', email: 'maria@email.com' },
  { name: 'Maria', email: 'maria@email.com' },
  { name: 'Maria', email: 'maria@email.com' },
]

const columns: Column[] = [
  {
    name: 'name',
    label: 'Nome Completo',
    align: 'left', // Corrigido para "left", "center" ou "right"
    field: (row: Row) => row.name,
  },
  {
    name: 'email',
    label: 'Email',
    align: 'left', // Corrigido para "left", "center" ou "right"
    field: (row: Row) => row.email,
  },
  {
    name: 'actions',
    label: 'Ações',
    align: 'center', // Corrigido para "left", "center" ou "right"
    field: 'actions', // Essa coluna usará ícones de ação, como edit e delete
  },
]

function onEdit(row: Row) {
  console.log('Editando:', row)
}

function onDelete(row: Row) {
  console.log('Deletando:', row)
}

const addDialog = ref(false)

const patient = ref<Patient>({
  fullName: '',
  cpf: '',
  phone: '',
  username: '',
  email: '',
  password: '',
})
const confirmPassword = ref<string>()
</script>

<template>
  <div id="q-app" style="min-height: 100vh">
    <div class="title q-ma-md text-weight-bold text-black text-h5 q-pa-md text-center" >Pacientes</div>

    <div class="q-pa-md">
      <q-btn
        color="primary"
        icon="add"
        label="Novo Paciente"
        class="q-mb-md"
        rounded
        @click="addDialog = true"
      />

      <q-table title="Pacientes" :rows="rows" :columns="columns" row-key="name">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="gap-">
            <q-btn
              class="bg-primary q-mr-sm"
              color="white"
              icon="grid_view"
              @click="onDelete(props.row)"
              flat
              round
            />
            <q-btn
              class="bg-primary q-mr-sm"
              color="white"
              icon="mode_edit"
              @click="onEdit(props.row)"
              flat
              round
            />
            <q-btn
              class="bg-primary"
              color="white"
              icon="delete"
              @click="onDelete(props.row)"
              flat
              round
            />
          </q-td>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="addDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="row justify-center">
          <div class="text-h5 text-weight-bold">Adicionar Paciente</div>
        </q-card-section>

        <hr />

        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-input outlined v-model="patient.fullName" label="Nome Completo" class="q-mt-lg">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input outlined v-model="patient.cpf" label="CPF">
            <template v-slot:prepend>
              <q-icon name="badge" />
            </template>
          </q-input>
          <q-input outlined v-model="patient.phone" label="Telefone">
            <template v-slot:prepend>
              <q-icon name="smartphone" />
            </template>
          </q-input>
          <q-input outlined v-model="patient.username" label="Nome de Usuário">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input outlined v-model="patient.email" label="Email">
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
          <q-input outlined v-model="patient.password" label="Senha">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
          <q-input outlined v-model="confirmPassword" label="Confirmação de Senha">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="between">
          <q-btn square label="Cancelar" v-close-popup class="bg-negative text-white" />
          <q-btn flat label="Salvar" v-close-popup class="bg-primary text-white" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>

.title {
  background-color: #CDE7EB;
  border-radius: 50px;
}

</style>