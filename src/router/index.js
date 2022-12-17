import Vue from 'vue'
import VueRouter from 'vue-router'

import Authenticate from '../views/Authenticate.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/authenticate',
    name: 'Authenticate',
    component: Authenticate,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
