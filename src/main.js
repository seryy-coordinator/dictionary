import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import 'material-icons/iconfont/material-icons.css'
import { initializeFirebase } from './api/configuration/firebase'

Vue.config.productionTip = false

initializeFirebase()

new Vue({
  render: (h) => h(App),
}).$mount('#app')
