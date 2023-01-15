import { make } from 'vuex-pathify'
import { ExpressionsCollection } from '../api/collections'
import { schema } from '../api/types/expression'

const state = () => ({
  collection: [],
})

const getters = {
  ...make.getters(state),
}

const mutations = {
  ...make.mutations(state),
  ADD(state, item) {
    state.collection.push(item)
  },
}

const actions = {
  async fetchAll({ commit, rootGetters }) {
    const ownerId = rootGetters['users/user']._id
    const expressions = await ExpressionsCollection.query({ options: [['ownerId', '==', ownerId]] })
    commit('SET_COLLECTION', expressions)
  },
  async addExpression({ commit }, expression) {
    const data = schema(expression)
    console.log(data)
    // use fibonacci number for rate
    const newExpression = await ExpressionsCollection.create(data, null, true)
    commit('ADD', newExpression)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
