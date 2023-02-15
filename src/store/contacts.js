import { make } from 'vuex-pathify'
import { ContactsCollection } from '../api/collections'
import { schema } from '../api/types/contact'

const state = () => ({
  contacts: [],
})

const getters = {
  ...make.getters(state),
}

const mutations = {
  ...make.mutations(state),
  ADD(state, item) {
    state.contacts.push(item)
  },
  UPDATE(state, item) {
    const index = state.contacts.findIndex(({ _id }) => _id === item._id)
    if (index === -1) {
      state.contacts.push(item)
      return
    }
    state.contacts.splice(index, 1, item)
  },
}

const actions = {
  async fetchAll({ commit, rootGetters }) {
    const ownerId = rootGetters['users/user']._id
    const contacts = await ContactsCollection.query({ options: [['userIds', 'array-contains', ownerId]] })
    commit('SET_CONTACTS', contacts)
  },
  async addContact({ commit, rootGetters }, contact) {
    const ownerId = rootGetters['users/user']._id
    const data = schema({
      userIds: [ownerId, contact._id],
      status: 'Require',
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
