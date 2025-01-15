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
  if (authStore.token == null) {
    router.push('/login') 
  }
})
</script>
