import { make } from 'vuex-pathify'
import { uniq } from 'lodash-es'

import { ExpressionsCollection } from '../api/collections'
import { dictionaryCategories } from '../api/types/category'
import { schema } from '../api/types/expression'
import { toLocaleTime } from '../api/utilities/date'

const state = () => ({
  collection: [],
})

const getters = {
  ...make.getters(state),
  getLabels({ collection }) {
    const labels = collection.flatMap(({ labels }) => labels)
    return uniq(labels)
  },
  getExpressions({ collection }, _, rootGetters) {
    return collection.map((item) => {
      const categories = Object.keys(item.statistic).map((key) => {
        const structure = dictionaryCategories.find((category) => category.key === key)
        return {
          key,
          rate: item.statistic[key].rate,
          structure,
        }
      })
      const authorIds = item.history.map(({ authorId }) => authorId)
      const { user, teachers } = rootGetters.users
      const currentUser = { ...user, title: 'Me' }
      const authors = uniq(authorIds).map((id) => (id ? teachers.find(({ _id }) => _id === id) : currentUser))
      const isPersonal = authors.some(({ _id }) => _id === user._id)

      return {
        ...item,
        date: toLocaleTime(item.history[item.history.length - 1].date),
        categories,
        authors,
        isPersonal,
        notImportant: Object.keys(item.statistic).length === 0,
      }
    })
  },
}

const mutations = {
  ...make.mutations(state),
  ADD(state, item) {
    state.collection.push(item)
  },
  UPDATE(state, item) {
    const index = state.collection.findIndex(({ _id }) => _id === item._id)
    if (index !== -1) {
      const selected = state.collection[index]
      state.collection.splice(index, 1, {
        ...selected,
        ...item,
      })
    }
  },
  REMOVE(state, item) {
    const index = state.collection.findIndex(({ _id }) => _id === item._id)
    if (index !== -1) {
      state.collection.splice(index, 1)
    }
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
    await ExpressionsCollection.update(_id, rest)
    commit('UPDATE', { _id, ...rest })
  },
  async removeExpression({ commit }, expression) {
    await ExpressionsCollection.delete(expression._id)
    commit('REMOVE', expression)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
