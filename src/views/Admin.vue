<template>
  <div class="flex flex-col gap-2 p-2">
    <h1 class="text-xl font-semibold">Admin</h1>
    <!-- <va-button :loading="loading" @click="removeAllExpressions()">Remove all expressions</va-button> -->
    <!-- <va-button :loading="loading" @click="fixAllExpressions()">Fix all expressions</va-button> -->
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
    async fixAllExpressions() {
      this.loading = true
      const expressions = await ExpressionsCollection.getAll()
      const dateString = '2/8/2023, 6:32:09 PM'
      const promises = expressions.map(({ _id, history }) => {
        const date = history[0].date
        const historyItem = {
          ...history[0],
          date,
          categories: ['1', '2', '3', '4'],
        }
        const result = {
          history: [historyItem],
          statistic:
            date < dateString
              ? {
                  1: {
                    rate: 3,
                  },
                  2: {
                    rate: 3,
                  },
                  3: {
                    rate: 3,
                  },
                  4: {
                    rate: 3,
                  },
                }
              : {},
        }
        return ExpressionsCollection.update(_id, result)
      })
      Promise.all(promises)
      this.loading = false
    },
  },
}
</script>

<style></style>
