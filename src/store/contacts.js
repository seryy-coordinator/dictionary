import { make } from 'vuex-pathify'
import { ContactsCollection } from '../api/collections'
import { contactStatus, schema } from '../api/types/contact'

const state = () => ({
  collection: [],
})

const getters = {
  ...make.getters(state),
  getContacts: () => [],
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
    const contacts = await ContactsCollection.query({ options: [['userIds', 'array-contains', ownerId]] })
    commit('SET_COLLECTION', contacts)
  },
  async addContact({ commit, rootGetters }, contact) {
    const ownerId = rootGetters['users/user']._id
    const data = schema({
      userIds: [ownerId, contact._id],
      status: contactStatus.REQUEST,
    })
    const newContact = await ContactsCollection.create(data, null, true)
    commit('ADD', newContact)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
