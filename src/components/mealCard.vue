<script lang="ts" setup>
import type Meal from 'src/models/meal';
import { defineProps, defineEmits } from 'vue';

defineProps<{ meal: Meal }>();
const emit = defineEmits<{
  (event: 'delete', meal: Meal): void;
  (event: 'edit', meal: Meal): void;
}>();
</script>

<template>
    <q-card class="q-pa-md q-mb-md">
      <!-- Título da refeição -->
      <div class="text-h5 text-center q-mb-md">{{ meal.title }}</div>
  
      <!-- Lista de alimentos -->
      <q-list bordered separator>
        <q-item v-for="(food, index) in meal.foods" :key="index" class="q-pa-md">
          <q-item-section>
            <q-item-label class="text-bold">{{ food.name }}</q-item-label>
            <q-item-label caption>{{ food.quantity }} {{ food.unit }}</q-item-label>
          </q-item-section>
  
          <q-item-section side>
            <q-btn outline color="teal" label="Opções de substituição" dense size="sm" />
          </q-item-section>
        </q-item>
      </q-list>
  
      <!-- Botões de ação -->
      <div class="q-mt-md flex justify-end">
        <q-btn color="red" outline icon="delete" label="Excluir" class="q-mr-md" @click="emit('delete', meal)" />
        <q-btn color="green" outline icon="edit" label="Editar" @click="emit('edit', meal)" />
      </div>
    </q-card>
  </template>