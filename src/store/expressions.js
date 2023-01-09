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
  async fetchAll({ commit }) {
    const expressions = await ExpressionsCollection.getAll()
    commit('SET_COLLECTION', expressions)
  },
  async addExpression({ commit }, { target, translate, sections }) {
    const data = schema({ target, translate, sections })
    // use fibonacci number for rate
    const expression = await ExpressionsCollection.create(data, null, true)
    commit('ADD', expression)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
