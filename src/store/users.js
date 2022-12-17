import { getAuth } from 'firebase/auth'
import { make } from 'vuex-pathify'
// import { UsersCollection } from '../api/collections'

const state = () => ({
  currentUser: null,
})

const getters = {
  ...make.getters(state),
}

const mutations = {
  ...make.mutations(state),
}

const actions = {
  signIn() {
    const auth = getAuth()
    console.log(auth)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
