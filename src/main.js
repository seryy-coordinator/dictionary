import { createApp } from 'vue'

import { initializeFirebase } from './api/firebase/initialize'
import store from './store'
import router from './router'
import VueStic from './vuestic'
import * as baseComponents from './components/base'
import App from './App.vue'

import './assets/tailwind.css'

initializeFirebase()
  .then((userData) => {
    if (userData) {
      const userId = userData.uid
      return store.dispatch('users/findUser', userId, { root: true })
    }
  })
  .then((user) => {
    if (!user) {
      return store.dispatch('users/signUserOut', null, { root: true })
    }
  })
  .then(() => {
    const app = createApp(App)
    Object.keys(baseComponents).forEach((key) => {
      app.component(key, baseComponents[key])
    })
    app.use(store)
    app.use(router)
    app.use(VueStic)
    app.mount('#app')
  })
