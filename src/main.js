import { createApp } from 'vue'

import { initializeFirebase } from './api/firebase/initialize'
import store from './store'
import router from './router'
import VueStic from './vuestic'
import * as baseComponents from './components/base'
import * as commonComponents from './components/common'
import App from './App.vue'

import './assets/tailwind.css'
import './assets/styles.css'

let timestamp = Date.now()
const timePoint = (title) => {
  const newTimestamp = Date.now()
  console.log(title, newTimestamp - timestamp)
  timestamp = newTimestamp
}

initializeFirebase()
  .then((userData) => {
    timePoint('initialize Firebase')
    if (userData) {
      const userId = userData.uid
      return store.dispatch('users/findUser', userId, { root: true })
    }
  })
  .then((user) => {
    timePoint('find user')
    if (!user) {
      return store.dispatch('users/signUserOut', null, { root: true })
    }
  })
  .then(() => {
    timePoint('check user')
    const app = createApp(App)
    Object.entries({ ...baseComponents, ...commonComponents }).forEach(([key, value]) => {
      app.component(key, value)
    })
    app.use(store)
    app.use(router)
    app.use(VueStic)
    app.mount('#app')
  })
  .then(() => {
    timePoint('application mount')
  })
