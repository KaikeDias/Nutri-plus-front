<script lang="ts" setup>
import type Meal from 'src/models/meal'
import { defineProps, defineEmits } from 'vue'

defineProps<{ meal: Meal }>()
const emit = defineEmits<{
  (event: 'delete', meal: Meal): void
  (event: 'edit', meal: Meal): void
  (event: 'show-substitutions', foodId: string): void
}>()

const formatTime = (time: string): string => {
  return time.slice(0, 5); // Retorna apenas 'hh:mm'
};

</script>

<template>
  <q-card class="q-pa-md q-mb-md">
    <div class="text-h5 text-center q-mb-md text-bold">{{ meal.title }}</div>
    <div class="text-subtitle1 text-center q-mb-md text-grey-7">{{ formatTime(meal.mealTime)}}</div>

    <q-list bordered separator>
      <q-item v-for="(food, index) in meal.aliments" :key="index" class="q-pa-md">
        <q-item-section>
          <q-item-label class="text-bold">{{ food.name }}</q-item-label>
          <q-item-label caption
            >{{ food.homeQuantity }} {{ food.homeUnit }} ({{ food.quantity
            }}{{ food.unit }})</q-item-label
          >
        </q-item-section>

        <q-item-section side>
          <q-btn
            outline
            color="teal"
            label="Opções de substituição"
            dense
            size="sm"
            @click="emit('show-substitutions', food.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <div class="q-mt-md flex justify-end">
      <q-btn
        color="red"
        outline
        icon="delete"
        label="Excluir"
        class="q-mr-md"
        @click="emit('delete', meal)"
      />
      <q-btn color="green" outline icon="edit" label="Editar" @click="emit('edit', meal)" />
    </div>
  </q-card>
</template>
