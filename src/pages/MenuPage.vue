<script setup lang="ts">
function onCardClick() {
  console.log('Card clicado!')
}
</script>

<template>
  <div class="title q-ma-md text-weight-bold text-black text-h5 q-pa-md text-center">
    Nome do Paciente
  </div>

  <div class="q-app q-pa-lg q-gutter-y-lg" style="min-height: 100vh">
    <q-card elevated clickable class="cursor-pointer q-pa-md" @click="onCardClick">
      <q-card-section class="row justify-between items-center">
        <div class="row items-center">
          <q-icon name="restaurant_menu" size="32px" class="q-mr-md" />
          <div class="text-h4">Cardápio</div>
        </div>
        <q-icon name="navigate_next" size="32px" class="q-mr-md" />
      </q-card-section>
    </q-card>

    <q-card elevated clickable class="cursor-pointer q-pa-md" @click="onCardClick">
      <q-card-section class="row justify-between items-center">
        <div class="row items-center">
          <q-icon name="description" size="32px" class="q-mr-md" />
          <div class="text-h4">Documentos</div>
        </div>
        <q-icon name="navigate_next" size="32px" class="q-mr-md" />
      </q-card-section>
    </q-card>

    <q-card elevated clickable class="cursor-pointer q-pa-md" @click="onCardClick">
      <q-card-section class="row justify-between items-center">
        <div class="row items-center">
          <q-icon name="assignment" size="32px" class="q-mr-md" />
          <div class="text-h4">Orientações Nutricionais</div>
        </div>
        <q-icon name="navigate_next" size="32px" class="q-mr-md" />
      </q-card-section>
    </q-card>

    <q-card elevated clickable class="cursor-pointer q-pa-md" @click="onCardClick">
      <q-card-section class="row justify-between items-center">
        <div class="row items-center">
          <q-icon name="free_cancellation" size="32px" class="q-mr-md" />
          <div class="text-h4">Diário Alimentar</div>
        </div>
        <q-icon name="navigate_next" size="32px" class="q-mr-md" />
      </q-card-section>
    </q-card>

    <q-card elevated clickable class="cursor-pointer q-pa-md" @click="onCardClick">
      <q-card-section class="row justify-between items-center">
        <div class="row items-center">
          <q-icon name="pending_actions" size="32px" class="q-mr-md" />
          <div class="text-h4">Metas</div>
        </div>
        <q-icon name="navigate_next" size="32px" class="q-mr-md" />
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.title {
  background-color: #cde7eb;
  border-radius: 50px;
}
</style>
