import { createWebHistory, createRouter } from 'vue-router'

import Home from './views/Home.vue'
import Requests from './views/Requests.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/pedidos', component: Requests },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router