<script lang="ts" setup>
import type Guideline from 'src/models/guideline'

defineProps<{ guideline: Guideline, addLoading: boolean}>()

const emit = defineEmits<{
  (event: 'edit', guideline: Guideline): void
  (event: 'delete', guideline: Guideline): void
}>()
</script>

<template>
  <q-expansion-item
    expand-separator
    :label="guideline.title"
    class="shadow-3 overflow-hidden q-mb-md"
    header-class="titulo-customizado"
    style="border-radius: 10px; font-size: 16px;"
  >
    <q-card>
      <q-separator />
      <q-card-section style="text-decoration: none">
        {{ guideline.content }}
      </q-card-section>

      <q-separator inset />

      <q-card-actions align="right">
        <q-btn square label="Deletar" v-close-popup class="bg-negative text-white" icon="delete" @click="emit('delete', guideline)"/>
        <q-btn
          class="bg-primary text-white"
          flat
          label="Editar"
          icon="edit"
          :loading="addLoading"
          type="submit"
          @click="emit('edit', guideline)"
        />
      </q-card-actions>
    </q-card>
  </q-expansion-item>
</template>

<style >
.titulo-customizado {
  font-family: 'Arial', sans-serif; /* Escolha a fonte desejada */
  font-weight: bold; /* Opcional: Ajuste o peso da fonte */
  font-size: 20px; 
  padding: 24px;/* Opcional: Ajuste o tamanho da fonte */
}
</style>