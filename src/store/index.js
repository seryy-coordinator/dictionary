import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'

import expressions from './expressions'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [pathify.plugin],
  modules: {
    expressions,
  },
})
