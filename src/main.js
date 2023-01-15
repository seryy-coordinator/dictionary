import Vue from 'vue'
import VueTippy, { TippyComponent } from 'vue-tippy'
import 'material-icons/iconfont/material-icons.css'
import './assets/tailwind.css'
import { initializeFirebase } from './api/firebase/initialize'
import store from './store'
import router from './router'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueTippy)
Vue.component('tippy', TippyComponent)

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
    new Vue({
      store,
      router,
      render: function (h) {
        return h(App)
      },
    }).$mount('#app')
  })
