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
  UPDATE(state, item) {
    const index = state.collection.findIndex(({ _id }) => _id === item._id)
    if (index === -1) {
      state.collection.push(item)
      return
    }
    state.collection.splice(index, 1, item)
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
    const newExpression = await ExpressionsCollection.create(data, null, true)
    commit('ADD', newExpression)
  },
  async updateExpression({ commit }, { _id, ...rest }) {
    const data = schema(rest)
    await ExpressionsCollection.update(_id, data)
    commit('UPDATE', { _id, ...data })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
