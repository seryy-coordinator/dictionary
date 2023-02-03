import { make } from 'vuex-pathify'
import { notificationType } from '../api/types/notification'

const delayRemoving = 4000
function setTimer(callback) {
  setTimeout(callback, delayRemoving)
}

const state = () => ({
  collection: [],
})

const getters = {
  ...make.getters(state),
}

const mutations = {
  ...make.mutations(state),
  ADD: (state, notification) => {
    state.collection.push(notification)
  },
  REMOVE_OLD: (state) => {
    state.collection = state.collection.filter(({ timeStamp }) => timeStamp + delayRemoving > Date.now())
  },
  REMOVE: (state, notification) => {
    state.collection = state.collection.filter(({ timeStamp }) => timeStamp !== notification.timeStamp)
  },
}

const actions = {
  async addWarning({ commit }, text) {
    commit('ADD', { type: notificationType.WARNING, text, timeStamp: Date.now() })
    setTimer(() => commit('REMOVE_OLD'))
  },
  async addMessage({ commit }, text) {
    commit('ADD', { type: notificationType.MESSAGE, text, timeStamp: Date.now() })
    setTimer(() => commit('REMOVE_OLD'))
  },
  async addSuccess({ commit }, text) {
    commit('ADD', { type: notificationType.SUCCESS, text, timeStamp: Date.now() })
    setTimer(() => commit('REMOVE_OLD'))
  },
  async removeNotification({ commit }, notification) {
    commit('REMOVE', notification)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
