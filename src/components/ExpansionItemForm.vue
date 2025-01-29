<script lang="ts" setup>
import type Question from 'src/models/question'

defineProps<{ question: Question }>()

const emit = defineEmits<{
  (event: 'edit', question: Question): void
  (event: 'delete', question: Question): void
}>()
</script>

<template>
  <q-expansion-item
    expand-separator
    :label="`Pergunta: ${question.question}`"
    class="shadow-3 overflow-hidden q-mb-md"
    header-class="titulo-customizado"
    style="border-radius: 10px; font-size: 16px"
  >
    <q-card>
      <q-separator />
      <q-card-section style="text-decoration: none">
        Resposta: {{ question?.answer }}
      </q-card-section>

      <q-separator inset />

      <q-card-actions align="right">
        <q-btn
          square
          label="Deletar"
          v-close-popup
          class="bg-negative text-white"
          icon="delete"
          @click="emit('delete', question)"
        />
        <q-btn
          class="bg-primary text-white"
          flat
          label="Editar"
          icon="edit"
          type="submit"
          @click="emit('edit', question)"
        />
      </q-card-actions>
    </q-card>
  </q-expansion-item>
</template>

<style>
.titulo-customizado {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 20px;
  padding: 24px;
}
</style>
