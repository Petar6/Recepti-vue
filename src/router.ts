// src/router.ts
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import RecipeDetail from './views/RecipeDetail.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/recept/:id', name: 'RecipeDetail', component: RecipeDetail, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
