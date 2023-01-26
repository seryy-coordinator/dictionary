<template>
  <div class="flex flex-col items-center p-4 gap-2">
    <base-checkbox-group
      v-model="selectedCategories"
      :options="getDictionaryCategories"
      size="sm"
      class="dictionary-categories border border-gray-100 p-1"
    />
    <SearchInput
      :collection="getExpressions"
      :disabled="!selectedCategories.length"
      @select-new="addNewExpression"
      @select="updateExpressionStatistic"
    />
  </div>
</template>

<script>
import { call, get } from 'vuex-pathify'

import SearchInput from './SearchInput.vue'
import { dictionaryCategory, dictionaryCategories } from '../../api/types/category'
import { getFibonacciRate } from '../../api/utilities/fibonacci'
import { getUTCTimeString } from '../../api/utilities/date'

export default {
  name: 'ExpressionAdding',
  components: {
    SearchInput,
  },
  data: () => ({
    selectedCategories: [dictionaryCategory.TERM],
    searchText: '',
    saving: false,
  }),
  computed: {
    getDictionaryCategories() {
      return dictionaryCategories.map((category) => ({ ...category, title: category.description }))
    },
    ...get('expressions', { getExpressions: 'collection' }, false),
    ...get('users', { user: 'user' }, false),
  },
  created() {
    this.ownerId = this.user._id // ToDo change this later (from route)
  },
  methods: {
    async addNewExpression({ target, translate, transcription }) {
      this.saving = true
      const historyData = this.getHistoryRecord()
      const statistic = this.getStatistic()
      await this.addExpression({
        target,
        translate,
        transcription,
        ownerId: this.user._id,
        statistic,
        history: [historyData],
        // labels // TODO: will add later
      })
      this.searchText = ''
      this.saving = false
    },
    async updateExpressionStatistic(expression) {
      this.saving = true
      const historyData = this.getHistoryRecord()
      const statistic = this.getStatistic(expression.statistic)
      await this.updateExpression({
        ...expression,
        statistic,
        history: [...expression.history, historyData],
        // labels // TODO: will add later
      })
      this.searchText = ''
      this.saving = false
    },
    getHistoryRecord() {
      const date = getUTCTimeString()
      return {
        categories: this.selectedCategories,
        date,
        ...(this.ownerId !== this.user._id && { authorId: this.user._id }),
      }
    },
    getStatistic(oldValue = {}) {
      return this.selectedCategories.reduce(
        (acc, key) => {
          acc[key] = acc[key] || {}
          const oldRate = acc[key]?.rate
          acc[key].rate = getFibonacciRate(oldRate)
          return acc
        },
        { ...oldValue }
      )
    },
    ...call('expressions', ['addExpression', 'updateExpression']),
  },
}
</script>

<style></style>
