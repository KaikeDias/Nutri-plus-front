<script setup lang="ts">
import { ref } from 'vue'
import logo from 'assets/logo.png'

const username = ref('')
const password = ref('')
const isPwd = ref(true)
</script>

<template>
  <q-layout view="hHh Lpr lFf" style="background-color: #83c5be">
    <q-card class="bg-white fixed-center q-pa-md">
      <q-card-section>
        <div class="row justify-center">
          <q-img :src="logo" spinner-color="white" style="height: 140px; max-width: 150px" />
        </div>
        <q-form>
          <q-input
            outlined
            v-model="username"
            label="Username"
            class="q-mb-md"
            style="min-width: 350px"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input
            outlined
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            label="Senha"
            class="q-mb-lg"
          >
            <template v-slot:prepend>
              <q-icon name="key" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div class="row justify-center">
            <q-btn
              color="primary"
              label="Entrar"
              style="height: 50px; min-width: 250px; border-radius: 10px"
            />
          </div>
        </q-form>
      </q-card-section>
      <q-card-section class="text-center">
        <div class="text-caption">
          Esqueceu sua senha?
          <router-link to="/recuperar-senha" class="text-blue" >Recuperar senha</router-link>
          <br />
          Ainda não possui uma conta?
          <router-link to="/register" class="text-blue">Cadastre-se</router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-layout>
</template>

