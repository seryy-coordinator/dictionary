<template>
  <div class="p-2">
    <h1 class="text-xl font-semibold">Admin</h1>
    <va-button :loading="loading" @click="removeAllExpressions()">Remove all expressions</va-button>
  </div>
</template>

<script>
import { ExpressionsCollection } from '../api/collections'

export default {
  name: 'Admin',
  data: () => ({
    loading: false,
  }),
  methods: {
    async removeAllExpressions() {
      this.loading = true
      const expressions = await ExpressionsCollection.getAll()
      const promises = expressions.map(({ _id }) => ExpressionsCollection.delete(_id))
      Promise.all(promises)
      this.loading = false
    },
  },
}
</script>

<style></style>
