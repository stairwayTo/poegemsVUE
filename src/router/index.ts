// src/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import GemDetailView from '@/views/GemDetailView.vue'
import FavoritesView from '@/views/FavoritesView.vue'

const router = createRouter({
  // createWebHashHistory : URLs en #/... — fonctionne sans config serveur
  // createWebHistory : URLs propres — nécessite config serveur (production)
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/gem/:id',   // :id = paramètre dynamique
      name: 'gem-detail',
      component: GemDetailView
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView
    }
  ]
})

export default router
