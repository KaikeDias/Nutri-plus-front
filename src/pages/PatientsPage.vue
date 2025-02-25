<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type CreatePatientDTO from 'src/models/dtos/createPatientDTO'
import type Patient from 'src/models/patient'
// import type EditPatientDTO from 'src/models/dtos/editPatientDTO'
import { usePatientStore } from 'src/stores/patientStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const phoneMask = ref('(##) #####-####')
const cpfMask = ref('###.###.###-##')

const patientStore = usePatientStore()
const { patients } = storeToRefs(patientStore)

const router = useRouter()
const fetchLoading = ref(true);

onMounted(async () => {
  try {
    await patientStore.fetchPatients(); // Aguarda o fetch ser concluído
    localStorage.removeItem('loadedPatient');
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
  } finally {
    fetchLoading.value = false; // Garante que o estado seja atualizado no final
  }
});


interface Column {
  name: string
  label: string
  align: 'left' | 'center' | 'right'
  field: string | ((row: Patient) => string | number)
}

const columns: Column[] = [
  {
    name: 'name',
    label: 'Nome Completo',
    align: 'left',
    field: (row: Patient) => row.name,
  },
  {
    name: 'username',
    label: 'Usuário',
    align: 'left',
    field: (row: Patient) => row.username,
  },
  {
    name: 'cpf',
    label: 'CPF',
    align: 'left',
    field: (row: Patient) => row.cpf,
  },
  {
    name: 'phone',
    label: 'Celular',
    align: 'left',
    field: (row: Patient) => row.phone,
  },
  {
    name: 'email',
    label: 'Email',
    align: 'left',
    field: (row: Patient) => row.email,
  },
  {
    name: 'actions',
    label: 'Ações',
    align: 'center',
    field: 'actions',
  },
]

const addDialog = ref(false)
const addLoading = ref(false)
const errorMessage = ref<string | null>(null)

const patient = ref<CreatePatientDTO>({
  name: '',
  cpf: '',
  phone: '',
  username: '',
  email: '',
  password: '',
})

const openAddDialog = () => {
  addDialog.value = true
  patient.value = {
    name: '',
    cpf: '',
    phone: '',
    username: '',
    email: '',
    password: '',
  }
}

const confirmPassword = ref<string>('')

function validatePassword(password: string, confirmPassword: string): boolean {
  return password === confirmPassword
}

const handleRegisterPatient = async () => {
  errorMessage.value = null
  addLoading.value = true
  fetchLoading.value = true

  try {
    if (validatePassword(patient.value.password, confirmPassword.value)) {
      await patientStore.createPatient(patient.value)
      addDialog.value = false
      await patientStore.fetchPatients()
      fetchLoading.value = false
    } else {
      throw new Error('as senhas sao diferentes')
    }
  } catch (error) {
    errorMessage.value = (error as Error).message
  } finally {
    addLoading.value = false
  }
}

const deleteDialog = ref(false)
const deleteLoading = ref(false)
const deleteErrorMessage = ref<string | null>(null)

const selectedPatient = ref<Patient | null>(null)

const openDeleteDialog = (patientDelete: Patient) => {
  deleteDialog.value = true
  selectedPatient.value = patientDelete
}

const onDelete = async (id: string) => {
  if (!selectedPatient.value) return
  deleteErrorMessage.value = null
  deleteLoading.value = true
  fetchLoading.value = true

  try {
    await patientStore.deletePatient(id)
    await patientStore.fetchPatients()
    deleteDialog.value = false
    fetchLoading.value = false
  } catch (error) {
    deleteErrorMessage.value = (error as Error).message
  } finally {
    deleteLoading.value = false
  }
}

const editDialog = ref(false)
const editLoading = ref(false)
const editErrorMessage = ref<string | null>(null)

const selectedEditPatient = ref<Patient | null>(null)

const openEditDialog = (patientEdit: Patient) => {
  editDialog.value = true
  selectedEditPatient.value = { ...patientEdit }
}

const handleEditPatient = async (evt: Event) => {
  evt.preventDefault()
  editErrorMessage.value = null
  editLoading.value = true

  try {
    if (selectedEditPatient.value) {
      await patientStore.editPatient(selectedEditPatient.value)
      await patientStore.fetchPatients()
      editDialog.value = false
    }
  } catch (error) {
    editErrorMessage.value = (error as Error).message
  } finally {
    editLoading.value = false
  }
}

const openMenuErrorMessage = ref<string | null>(null)
const openMenuLoading = ref(false)

const handleLoadPatient = async (id: string) => {
  openMenuErrorMessage.value = null
  openMenuLoading.value = true

  try {
    patientStore.loadPatient(id)
    router.push('/patientMenu')
  } catch (error) {
    openMenuErrorMessage.value = (error as Error).message
  } finally {
    openMenuLoading.value = false
  }
}
</script>

<template>
  <div id="q-app" style="min-height: 100vh">
    <div class="title q-ma-md text-weight-bold text-black text-h5 q-pa-md text-center">
      Pacientes
    </div>

    <div class="q-pa-md">
      <q-btn
        color="primary"
        icon="add"
        label="Novo Paciente"
        class="q-mb-md"
        rounded
        @click="openAddDialog"
      />

      <q-table
        title="Pacientes"
        :rows="patients"
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
              icon="grid_view"
              @click="handleLoadPatient(props.row.id)"
              flat
              round
            >
              <q-tooltip> Menu do Paciente </q-tooltip>
            </q-btn>
            <q-btn
              class="bg-primary q-mr-sm"
              color="white"
              icon="mode_edit"
              @click="openEditDialog(props.row)"
              flat
              round
            >
              <q-tooltip> Editar Paciente </q-tooltip>
            </q-btn>
            <q-btn
              class="bg-primary"
              color="white"
              icon="delete"
              @click="openDeleteDialog(props.row)"
              flat
              round
            >
              <q-tooltip> Deletar Paciente </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="addDialog" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-form @submit.prevent="handleRegisterPatient">
          <q-card-section class="row justify-center">
            <div class="text-h5 text-weight-bold">Adicionar Paciente</div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pt-none q-gutter-y-md">
            <q-input outlined v-model="patient.name" label="Nome Completo" class="q-mt-lg">
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input outlined v-model="patient.cpf" :mask="cpfMask" label="CPF">
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>
            <q-input outlined v-model="patient.phone" :mask="phoneMask" label="Celular">
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
            <q-input outlined type="password" v-model="patient.password" label="Senha">
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
            <q-input
              outlined
              type="password"
              v-model="confirmPassword"
              label="Confirmação de Senha"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>
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
        <q-form @submit.prevent="handleEditPatient">
          <q-card-section class="row justify-center">
            <div class="text-h5 text-weight-bold">Editar Paciente</div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pt-none q-gutter-y-md">
            <q-input
              outlined
              v-model="selectedEditPatient!.name"
              label="Nome Completo"
              class="q-mt-lg"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input outlined v-model="selectedEditPatient!.cpf" :mask="cpfMask" label="CPF">
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>
            <q-input
              outlined
              v-model="selectedEditPatient!.phone"
              :mask="phoneMask"
              label="Celular"
            >
              <template v-slot:prepend>
                <q-icon name="smartphone" />
              </template>
            </q-input>
            <q-input outlined v-model="selectedEditPatient!.username" label="Nome de Usuário">
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input outlined v-model="selectedEditPatient!.email" label="Email">
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>
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
      <q-card style="width: 500px; max-width: 80vw">
        <q-card-section class="row justify-center">
          <div class="text-h6 text-weight-bold">Tem certeza que deseja excluir este paciente?</div>
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
            @click="onDelete(selectedPatient!.id)"
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
