<template>
  <router-view />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/authStore';
import { onMounted } from 'vue';

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  if (authStore.token) {
    router.push('/') // Redireciona para a página inicial autenticada
  } else {
    router.push('/login') // Redireciona para login se não estiver autenticado
  }
})
</script>
