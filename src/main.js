import Vue from 'vue'
import 'material-icons/iconfont/material-icons.css'
import './assets/tailwind.css'
import { initializeFirebase } from './api/configuration/firebase'
import store from './store'
import router from './router'
import App from './App.vue'

Vue.config.productionTip = false

initializeFirebase()

new Vue({
  store,
  router,
  render: function (h) {
    return h(App)
  },
}).$mount('#app')
