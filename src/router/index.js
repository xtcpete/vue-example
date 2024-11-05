import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ownership',
      name: 'ownership',
      component: () => import('../views/OwnershipView.vue')
    },
    {
      path: '/intake_outcome',
      name: 'intake_outcome',
      component: () => import('../views/IntakeOutcomeView.vue')
    },
    {
      path: '/market',
      name: 'market',
      component: () => import('../views/MarketView.vue')
    },
    {
      path: '/supply',
      name: 'supply',
      component: () => import('../views/SupplyView.vue')
    },
  ]
})

export default router
