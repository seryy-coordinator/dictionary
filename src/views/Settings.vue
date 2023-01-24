<template>
  <div v-if="currentUser" class="flex flex-col items-center justify-center h-screen bg-gray-50">
    <h1 class="text-blue-500 text-6xl mb-6">
      <span> Welcome</span>
      <span v-if="currentUser">, {{ currentUser.name }}</span>
    </h1>
    <p>You are signed in to the following account:</p>
    <div class="flex items-center gap-2 bg-blue-50 border border-blue-100 py-2 px-3 rounded font-medium my-2">
      <BaseAvatar :src="currentUser.picture" :name="currentUser.name" />
      <span>{{ currentUser.email }}</span>
    </div>
    <BaseButton class="mb-8" theme="gray" rounded @click="signOut()">Sign out</BaseButton>
    <p v-if="!currentUser.role" class="text-grey-600">
      To continue, select the reason why you want to use the service:
    </p>
    <BaseRadioGroup v-model="selectedRole" :options="getRoles" class="roles mb-8 flex-col" label="You are" />
    <BaseButton :disabled="!selectedRole" icon="auto_stories" rounded @click="updateRole()">Get to work</BaseButton>
  </div>
</template>

<script>
import { call, get } from 'vuex-pathify'

import { roles } from '../api/types/role'
import { BaseAvatar, BaseButton, BaseRadioGroup } from '../components/base'

export default {
  name: 'Authenticate',
  components: {
    BaseAvatar,
    BaseButton,
    BaseRadioGroup,
  },
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
      this.$router.push('/dictionary')
    },
    async signOut() {
      await this.signUserOut()
      this.$router.push('/authenticate')
    },
    ...call('users', ['updateUserRole', 'signUserOut']),
  },
}
</script>

<style>
.roles .radio-group-option {
  width: 6rem;
}
</style>
