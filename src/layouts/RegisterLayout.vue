<script setup lang="ts">
import { ref } from 'vue'
import logo from 'assets/logo.png'

const dateMask = ref('##/##/####');
const cpfMask = ref('###.###.###-##');

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const birthDate = ref('')
const cpf = ref('')
const crn = ref('')
const isPwd = ref(true)
const isCPwd = ref(true)



</script>

<template>
  <q-layout view="hHh Lpr lFf" style="background-color: #83c5be">
    <q-card class="bg-white fixed-center q-pa-md">
      <q-card-section>
        <div class="row justify-center">
          <q-img :src="logo" spinner-color="white" style="height: 140px; max-width: 150px" />
        </div>
        <q-form>
          <div class="row q-gutter-x-md">
            <q-input outlined v-model="username" label="Username" class="q-mb-md" style="min-width: 350px">
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input outlined v-model="birthDate" :mask="dateMask" label="Data de Nascimento" class="q-mb-md" style="min-width: 350px">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date mask="DD/MM/YYYY" v-model="birthDate">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="row q-gutter-x-md">
            <q-input outlined v-model="cpf" label="CPF" :mask="cpfMask" class="q-mb-md" style="min-width: 350px">
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>
            <q-input outlined v-model="crn" label="CRN" class="q-mb-md" style="min-width: 350px">
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>
          </div>
          <q-input outlined v-model="email" label="Email" class="q-mb-md" style="min-width: 350px">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>

          <q-input outlined v-model="password" :type="isPwd ? 'password' : 'text'" label="Senha" class="q-mb-lg">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>

          <q-input outlined v-model="confirmPassword" :type="isCPwd ? 'password' : 'text'" label="Confirmar Senha"
            class="q-mb-lg">
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon :name="isCPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isCPwd = !isCPwd" />
            </template>
          </q-input>
          <div class="row justify-center">
            <q-btn color="primary" label="Cadastrar-se" style="height: 50px; min-width: 250px; border-radius: 10px" />
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
