import { useAuthStore } from 'src/stores/authStore';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {path: 'patients', component: () => import('pages/PatientsPage.vue')},
      {path: 'patientMenu', component: () => import('pages/MenuPage.vue')},
      {path: 'meals', component: () => import('pages/MealsPage.vue')},
      {path: 'createMeal', component: () => import('pages/CreateMealPage.vue')},
      {path: 'guidelines', component: () => import('pages/GuidelinesPage.vue')},
      {path: 'documents', component: () => import('pages/DocumentsPage.vue')},
      {path: 'form', component: () => import('pages/FormPage.vue')},
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue')
  },
  {
    path: '/register',
    component: () => import('layouts/RegisterLayout.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Proteção de rotas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.loadToken() // Garante que o token é carregado

  if (to.meta.requiresAuth && !authStore.token) {
    next('/login')
  } else {
    next()
  }
})

export default routes;
