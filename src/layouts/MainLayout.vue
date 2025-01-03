<template>
  <q-layout view="hHh Lpr lFf">
    <q-header bordered>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Nutri+ </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      none
      class="bg-primary"
    >
      <q-list>
        <DrawerItem v-for="link in linksList" :key="link.title" v-bind="link" class="text-white" />
      </q-list>

      <q-item class="col-grown"> </q-item>

      <DrawerItem :key="logout.title" v-bind="logout" class="text-white fixed-bottom" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DrawerItem, { type DrawerItemProps } from 'src/components/DrawerItem.vue'

const linksList: DrawerItemProps[] = [
  {
    title: 'Início',
    icon: 'home',
  },
  {
    title: 'Pacientes',
    icon: 'person',
  },
]

const logout: DrawerItemProps = {
  title: 'Sair',
  icon: 'logout',
}

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
