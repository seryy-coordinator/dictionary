<template>
  <div v-if="currentUser" class="flex flex-col items-center justify-center h-screen bg-gray-50">
    <h1 class="text-blue-500 text-6xl mb-6">
      <span> Welcome</span>
      <span v-if="currentUser">, {{ currentUser.name }}</span>
    </h1>
    <p>You are signed in to the following account:</p>
    <div class="flex items-center gap-2 bg-blue-50 border border-blue-100 py-2 px-3 rounded font-medium my-2">
      <base-avatar :src="currentUser.picture" :name="currentUser.name" />
      <span>{{ currentUser.email }}</span>
    </div>
    <va-button color="gray-200" border-color="gray-300" @click="signOut()">Sign out</va-button>
    <p v-if="!currentUser.role" class="text-grey-600">
      To continue, select the reason why you want to use the service:
    </p>
    <label>You are:</label>
    <va-button-toggle v-model="selectedRole" :options="getRoles" color="info" icon-color="warning" class="mb-12" />
    <va-button :disabled="!selectedRole" @click="updateRole()">Save</va-button>
  </div>
</template>

<script>
import { call, get } from 'vuex-pathify'

import { roles } from '../api/types/role'

export default {
  name: 'Authenticate',
  data: () => ({
    saving: false,
    selectedRole: '',
  }),
  computed: {
    getRoles() {
      return roles.filter(({ isDefault }) => isDefault).map((role) => ({ ...role, value: role.key }))
    },
    currentUser: get('users/user', false),
  },
  created() {
    this.selectedRole = this.currentUser.role
  },
  methods: {
    async updateRole() {
      if (this.selectedRole !== this.currentUser.role) {
        this.saving = true
        await this.updateUserRole(this.selectedRole)
        this.saving = false
      }
    },
    async signOut() {
      await this.signUserOut()
      this.$router.push('/authenticate')
    },
    ...call('users', ['updateUserRole', 'signUserOut']),
  },
}
</script>

<style></style>
