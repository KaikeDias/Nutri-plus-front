<script setup lang="ts">
import { ref } from 'vue'
import logo from 'assets/logo.png'
import { useAuthStore } from 'src/stores/authStore'
import { useRouter } from 'vue-router'
import type RegisterNutritionistDTO from "src/models/dtos/registerNutritionistDTO"

const authStore = useAuthStore()
const router = useRouter()

const phoneMask = ref('(##) #####-####')
const cpfMask = ref('###.###.###-##')

const emptyFieldErrorMessage = 'Este campo é obrigatório'

const name = ref('')
const username = ref('')
const email = ref('')
const password = ref<string>('')
const confirmPassword = ref('')
const phone = ref('')
const cpf = ref('')
const crn = ref('')
const isPwd = ref(true)
const isCPwd = ref(true)

const loading = ref(false)
const errorMessage = ref<string | null>(null)

function validatePassword(password: string, confirmPassword: string): boolean {
  return password === confirmPassword
}

const handleRegister = async () => {
  errorMessage.value = null
  loading.value = true


  try {
    if (validatePassword(password.value, confirmPassword.value)) {
      const registerData: RegisterNutritionistDTO = {
        username: username.value,
        email: email.value,
        password: password.value,
        name: name.value,
        phone: phone.value,
        cpf: cpf.value,
        crn: crn.value
      }

      await authStore.registerNutritionist(registerData)

      router.push('/login')
    } else {
      throw new Error('as senhas sao diferentes')
    }
  } catch (error) {
    errorMessage.value = (error as Error).message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <q-layout view="hHh Lpr lFf" style="background-color: #83c5be">
    <q-card class="bg-white fixed-center q-pa-md">
      <q-card-section>
        <div class="row justify-center">
          <q-img :src="logo" spinner-color="white" style="height: 140px; max-width: 150px" />
        </div>
        <q-form @submit.prevent="handleRegister">
          <div class="row q-gutter-x-md">
            <q-input outlined class="q-mb-sm" style="min-width: 350px" v-model="name" label="Nome completo"
              :rules="[(val) => !!val || emptyFieldErrorMessage]">
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input outlined class="q-mb-sm" style="min-width: 350px" v-model="phone" :mask="phoneMask"
              label="Celular" :rules="[(val) => !!val || emptyFieldErrorMessage]">
              <template v-slot:prepend>
                <q-icon name="phone" />
              </template>
            </q-input>
          </div>

          <div class="row q-gutter-x-md">
            <q-input outlined class="q-mb-sm" style="min-width: 350px" v-model="cpf" label="CPF" :mask="cpfMask"
              :rules="[(val) => !!val || emptyFieldErrorMessage]">
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>
            <q-input outlined class="q-mb-sm" style="min-width: 350px" v-model="crn" label="CRN"
              :rules="[(val) => !!val || emptyFieldErrorMessage]">
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>
          </div>
          <q-input outlined class="q-mb-sm" style="min-width: 350px" v-model="username" label="Nome de usuário"
            :rules="[(val) => !!val || emptyFieldErrorMessage]">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input outlined class="q-mb-sm" style="min-width: 350px" v-model="email" label="Email"
            :rules="[(val) => !!val || emptyFieldErrorMessage]">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>

          <q-input outlined class="q-mb-sm" v-model="password" :type="isPwd ? 'password' : 'text'" label="Senha"
            :rules="[(val) => !!val || emptyFieldErrorMessage]">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>

          <q-input outlined class="q-mb-md" v-model="confirmPassword" label="Confirmar Senha"
            :type="isCPwd ? 'password' : 'text'" :rules="[(val) => !!val || emptyFieldErrorMessage]">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon :name="isCPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isCPwd = !isCPwd" />
            </template>
          </q-input>
          <div class="row justify-center">
            <q-btn color="primary" style="height: 50px; min-width: 250px; border-radius: 10px" label="Cadastrar-se"
              :loading="loading" type="submit" />
          </div>
        </q-form>
      </q-card-section>
      <q-card-section class="text-center">
        <div class="text-caption">
          Já possui uma conta?
          <router-link to="/login" class="text-blue">Entrar</router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-layout>
</template>
