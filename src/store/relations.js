import { make } from 'vuex-pathify'
import { RelationsCollection, UsersCollection } from '../api/collections'
import { relationStatus, schema } from '../api/types/relation'

const state = () => ({
  collection: [],
  users: [],
  loading: null,
})

const getters = {
  ...make.getters(state),
  getRelations: ({ collection }, _, rootGetters) => {
    const ownerId = rootGetters.users.user._id
    return collection.map((item) => {
      const contactId = item.userIds.find((id) => id !== ownerId)
      return {
        ...item,
        contactId,
        incoming: item.userIds[0] !== ownerId,
      }
    })
  },
  getContactRelations: (_, { getRelations }) => {
    return getRelations.filter(({ studies }) => !studies)
  },
  activeContactRelations: (_, { getContactRelations }) =>
    getContactRelations.filter(({ status }) => status !== relationStatus.REMOVED && status !== relationStatus.DISABLED),
}

const mutations = {
  ...make.mutations(state),
  ADD_RELATIONSHIP(state, item) {
    state.collection.unshift(item)
  },
  UPDATE_RELATIONSHIP(state, { _id, status }) {
    const selectedItem = state.collection.find((item) => item._id === _id)
    selectedItem.status = status
  },
  ADD_CONTACT(state, item) {
    state.users.push(item)
  },
  ADD_CONTACTS(state, items) {
    state.users = [...state.users, ...items]
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
  async fetchAllRelations({ commit, rootGetters }) {
    const ownerId = rootGetters['users/user']._id
    const loading = RelationsCollection.query({
      options: [['userIds', 'array-contains', ownerId]],
    })
    commit('SET_LOADING', loading)
    const relations = await loading
    commit('SET_COLLECTION', relations)
  },
  async loadContacts({ commit, getters }, { start = 0, size = 10 } = {}) {
    const contactIds = getters.activeContactRelations
      .slice(start, start + size)
      .map(({ contactId }) => contactId)
      .filter((contactId) => !getters.users.some((_id) => _id === contactId))
    if (getters.activeContactRelations.length > start && contactIds.length) {
      const contacts = await UsersCollection.queryByIds(contactIds)
      commit('ADD_CONTACTS', contacts)
    }
  },
  async loadProfile({ commit }, userId) {
    const user = await UsersCollection.read(userId)
    commit('ADD_CONTACT', user)
  },
  async addRelation({ commit, rootGetters }, contact) {
    const ownerId = rootGetters['users/user']._id
    const data = schema({
      userIds: [ownerId, contact._id],
      status: relationStatus.REQUEST,
    })
    const newRelation = await RelationsCollection.create(data, null, true)
    commit('ADD_CONTACT', contact)
    commit('ADD_RELATIONSHIP', newRelation)
  },
  async updateRelation({ commit }, { _id, status }) {
    await RelationsCollection.update(_id, { status })
    commit('UPDATE_RELATIONSHIP', { _id, status })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
