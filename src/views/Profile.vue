<template>
  <div>
    <div class="relative flex flex-col w-96 mb-4 mx-auto">
      <h1 class="my-4 font-bold text-4xl text-gray-700">Profile</h1>
      <div v-if="getUser" class="flex gap-6 mb-6">
        <base-avatar :src="getUser.picture" :name="getUser.name" size="huge" />
        <div>
          <h2 class="text-3xl">{{ getUser.name }}</h2>
          <p class="text-lg text-gray-600">{{ getUser.email }}</p>
        </div>
      </div>
      <div v-if="isOwnProfile">
        <h3 class="text-lg font-semibold">Vocabulary:</h3>
        <ul class="grid grid-cols-2 gap-4">
          <li class="grid grid-cols-4 gap-2">
            <span class="col-span-3">Expressions:</span>
            <va-chip color="info" size="small" square>
              {{ getExpressions.length }}
            </va-chip>
          </li>
          <li class="grid grid-cols-4 gap-2">
            <span class="col-span-3">Not important:</span>
            <va-chip color="danger" size="small" square>
              {{ notImportant.length }}
            </va-chip>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { call, get } from 'vuex-pathify'
import { relationStatus } from '../api/types/relation'

export default {
  name: 'Profile',
  computed: {
    notImportant() {
      return this.getExpressions.filter(({ notImportant }) => notImportant)
    },
    isOwnProfile() {
      return this.currentUser._id === this.$route.params.id
    },
    getUser() {
      return this.isOwnProfile ? this.currentUser : this.users.find(({ _id }) => _id === this.$route.params.id)
    },
    getExpressions: get('expressions/getExpressions', false),
    currentUser: get('users/user', false),
    ...get('relations', ['loading', 'getRelations', 'users'], false),
  },
  async created() {
    if (!this.isOwnProfile) {
      await this.loading
      const userId = this.$route.params.id
      const relation = this.getRelations.find(({ contactId }) => contactId === userId)
      if (relation && relation.status === relationStatus.APPROVE) {
        if (!this.getUser) {
          await this.loadProfile(userId)
        }
        return
      }
      this.$router.push(`/profile/${this.currentUser._id}`)
    }
  },
  methods: {
    loadProfile: call('relations/loadProfile'),
  },
}
</script>

<style></style>
