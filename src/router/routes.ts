import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/MenuPage.vue')},
      {path: 'patients', component: () => import('pages/PatientsPage.vue')},
      {path: 'meals', component: () => import('pages/MealsPage.vue')},
      {path: 'guidelines', component: () => import('pages/GuidelinesPage.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
