import { createStore } from 'vuex'
import pathify from 'vuex-pathify'

import expressions from './expressions'
import users from './users'

pathify.options.mapping = 'simple'

export default createStore({
  plugins: [pathify.plugin],
  modules: {
    expressions,
    users,
  },
})
