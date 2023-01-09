import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
import { roles } from '../api/types/role'
import { getAuth } from '../api/firebase/auth'

import Authenticate from '../views/Authenticate.vue'
import Settings from '../views/Settings.vue'
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
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

const nextToPath = (to, path, next) => {
  if (to.path === path) {
    next()
  } else {
    next(path)
  }
}

router.beforeEach((to, from, next) => {
  const auth = getAuth()
  if (auth && auth.currentUser) {
    if (store.getters['users/user']?.role && to.name !== 'Authenticate') {
      const role = roles.find(({ key }) => key === store.getters['users/user']?.role)
      const userHasPermissions =
        !to.meta?.permissions || to.meta.permissions.some((key) => role.permissions.includes(key))
      if (userHasPermissions) {
        next()
      } else {
        console.error('Forbidden!')
        if (!from) {
          next('/')
        }
      }
    } else {
      nextToPath(to, '/settings', next)
    }
  } else {
    nextToPath(to, '/authenticate', next)
  }
})

export default router
