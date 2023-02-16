<template>
  <div>
    <div class="relative flex flex-col w-96 mb-4 mx-auto">
      <h1 class="my-4 font-bold text-4xl text-gray-700">Profile</h1>
      <div class="flex gap-6 mb-6">
        <base-avatar :src="currentUser.picture" :name="currentUser.name" size="huge" />
        <div>
          <h2 class="text-3xl">{{ currentUser.name }}</h2>
          <p class="text-lg text-gray-600">{{ currentUser.email }}</p>
        </div>
      </div>
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
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: 'Profile',
  computed: {
    notImportant() {
      return this.getExpressions.filter(({ notImportant }) => notImportant)
    },
    getExpressions: get('expressions/getExpressions', false),
    currentUser: get('users/user', false),
  },
}
</script>

<style></style>
