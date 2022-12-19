import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { make } from 'vuex-pathify'

import { schema } from '../api/types/user'
import { getAuth } from '../api/utilities/auth'
import { UsersCollection } from '../api/collections'

const state = () => ({
  user: null,
})

const getters = {
  ...make.getters(state),
}

const mutations = {
  ...make.mutations(state),
  UPDATE_USER: (state, data) => {
    state.user = { ...state.user, ...data }
  },
}

const actions = {
  async signInWithPopup({ dispatch }) {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    auth.useDeviceLanguage()

    try {
      const result = await signInWithPopup(auth, provider)
      if (result.user) {
        const { user } = result
        const data = {
          ...user,
          _id: user.uid,
        }
        await dispatch('findOrCreateUser', data)
      } else {
        console.error('No user was found')
      }
    } catch (error) {
      throw new Error(error)
    }
  },
  async signUserOut({ commit }) {
    const auth = getAuth()
    const { currentUser } = auth
    if (currentUser) {
      await auth.signOut()
    }
    commit('SET_USER', null)
  },

  async findOrCreateUser({ dispatch }, user) {
    if (!user._id) {
      return dispatch('signUserOut')
    }

    const foundUser = await dispatch('findUser', user._id)
    if (!foundUser) {
      await dispatch('createUser', user)
    }
  },
  async findUser({ commit }, _id) {
    const user = await UsersCollection.read(_id)

    if (user) {
      commit('SET_USER', user)
      return user
    }
    return null
  },
  async createUser({ commit }, { _id, displayName, email, photoURL }) {
    const newUser = schema({
      name: displayName,
      email,
      picture: photoURL,
      role: '',
    })
    await UsersCollection.set(_id, newUser)
    commit('SET_USER', newUser)
  },
  async updateUserRole({ commit, getters }, role) {
    await UsersCollection.update(getters.user._id, { role })

    commit('UPDATE_USER', { role })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
