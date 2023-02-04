import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'
import { roles } from '../api/types/role'
import { getAuth } from '../api/firebase/auth'

import Layout from '../components/layout/Layout.vue'

import Authenticate from '../views/Authenticate.vue'
import Settings from '../views/Settings.vue'
import Dictionary from '../views/Dictionary.vue'
import Games from '../views/Games.vue'
import Contacts from '../views/Contacts.vue'
import Students from '../views/Students.vue'
import Profile from '../views/Profile.vue'
import Admin from '../views/Admin.vue'

const routes = [
  {
    path: '/authenticate',
    name: 'Authenticate',
    component: Authenticate,
  },
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/dictionary',
        redirect: '',
      },
      {
        path: '',
        name: 'Dictionary',
        component: Dictionary,
      },
      {
        path: '/games',
        name: 'Games',
        component: Games,
      },
      {
        path: '/contacts',
        name: 'Contacts',
        component: Contacts,
      },
      {
        path: '/students',
        name: 'Students',
        component: Students,
      },
      {
        path: '/profile/:id',
        name: 'Profile',
        component: Profile,
      },
      {
        path: '/settings',
        name: 'Settings',
        component: Settings,
      },
    ],
  },
  {
    path: '/manager',
    name: 'Admin page',
    component: Admin,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
