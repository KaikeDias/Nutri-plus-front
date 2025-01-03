<script lang="ts" setup>
import type Guideline from 'src/models/guideline'

defineProps<{guideline: Guideline}>()

</script>

<template>
  <q-expansion-item
    expand-separator
    :label="guideline.title"
    class="shadow-3 overflow-hidden q-mb-md"
    style="border-radius: 10px"
  >
    <q-card>
      <q-separator />
      <q-card-section>
        {{ guideline.content }}
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>
