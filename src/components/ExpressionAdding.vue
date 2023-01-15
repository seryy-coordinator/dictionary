<template>
  <div class="flex flex-col items-center p-4 gap-2">
    <BaseCheckboxGroup
      v-model="selectedCategories"
      :options="getDictionaryCategories"
      :class="{ 'animate-pulse animation-duration-500': animation }"
      class="dictionary-categories"
      size="sm"
    />
    <SearchInput
      :collection="getExpressions"
      :disabled="!selectedCategories.length"
      @select-new="addNewExpression"
      @select="updateExpressionStatistic"
      @warn="warn()"
    />
  </div>
</template>

<script>
import { call, get } from 'vuex-pathify'

import { dictionaryCategory, dictionaryCategories } from '../api/types/category'
import { BaseCheckboxGroup } from './base'
import SearchInput from './modules/SearchInput.vue'
import { getFibonacciRate } from '../api/utilities'
import { getUTCTimeString } from '../api/utilities/date'

export default {
  name: 'ExpressionAdding',
  components: {
    BaseCheckboxGroup,
    SearchInput,
  },
  data: () => ({
    selectedCategories: [dictionaryCategory.TERM],
    searchText: '',
    saving: false,
    animation: false,
  }),
  computed: {
    getDictionaryCategories() {
      return dictionaryCategories.map((category) => ({ ...category, title: category.description }))
    },
    ...get('expressions', { getExpressions: 'collection' }),
    ...get('users', { user: 'user' }),
  },
  created() {
    this.ownerId = this.user._id // ToDo change this later (from route)
  },
  methods: {
    async addNewExpression({ target, translate }) {
      this.saving = true
      const historyData = this.getHistoryRecord()
      const statistic = this.getStatistic()
      await this.addExpression({
        target,
        translate,
        transcription: '', // TODO: will add later
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
    warn() {
      this.animation = true
      setTimeout(() => {
        this.animation = false
      }, 1000)
    },
    ...call('expressions', ['addExpression', 'updateExpression']),
  },
}
</script>

<style>
.animation-duration-500 {
  animation-duration: 0.5s;
}
</style>
