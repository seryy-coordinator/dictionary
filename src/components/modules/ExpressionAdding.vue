<template>
  <div class="flex justify-center">
    <div class="flex flex-col p-4">
      <base-checkbox-group
        v-model="selectedCategories"
        :options="getDictionaryCategories"
        size="sm"
        class="border border-gray-100 p-1"
        @update:modelValue="saveSelectedCategories()"
      />
      <div class="flex items-center gap-3 my-1 ml-4">
        <base-checkbox v-model="phrase" label="Big phrase" size="small" />
        <base-checkbox v-model="notImportant" label="Not important" size="small" @update:modelValue="restudy = false" />
        <base-checkbox v-model="restudy" label="Re-study" size="small" @update:modelValue="notImportant = false" />
      </div>
      <SearchInput
        :collection="getExpressions"
        :phrase="phrase"
        :disabled="!selectedCategories.length"
        class="self-center"
        @select-new="addNewExpression"
        @select="updateExpressionStatistic"
        @pre-select="phrase = $event.phrase || false"
      />
    </div>
  </div>
</template>

<script>
import { call, get } from 'vuex-pathify'

import SearchInput from './SearchInput.vue'
import { dictionaryCategory, dictionaryCategories } from '../../api/types/category'
import { getUTCTimeString } from '../../api/utilities/date'
import { getFibonacciRate } from '../../api/utilities/fibonacci'
import { LocalStorage } from '../../api/utilities/localStorage'

export default {
  name: 'ExpressionAdding',
  components: {
    SearchInput,
  },
  data: () => ({
    selectedCategories: LocalStorage.selectedCategories || [dictionaryCategory.TERM, dictionaryCategory.DEFINITION],
    phrase: false,
    notImportant: false,
    restudy: false,
    saving: false,
  }),
  computed: {
    getDictionaryCategories() {
      return dictionaryCategories.map((category) => ({ ...category, title: category.description }))
    },
    ...get('expressions', { getExpressions: 'getExpressions' }, false),
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
        phrase: this.phrase,
        // labels // TODO: will add later
      })
      this.addNotification(`The phrase '${target}' was added successfully.`)
      this.saving = false
    },
    async updateExpressionStatistic(expression) {
      this.saving = true
      const historyData = this.getHistoryRecord()
      const statistic = this.notImportant ? {} : this.getStatistic(expression.statistic)
      await this.updateExpression({
        ...expression,
        statistic,
        history: [...expression.history, historyData],
        phrase: this.phrase,
        // labels // TODO: will add later
      })
      this.addNotification(
        `The phrase \`${expression.target}\` was <strong class="text-green-600">updated</strong> successfully.`
      )
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
          acc[key].rate = this.restudy ? 1 : getFibonacciRate(oldRate)
          return acc
        },
        { ...oldValue }
      )
    },
    saveSelectedCategories() {
      LocalStorage.selectedCategories = this.selectedCategories
    },
    addNotification: call('notification/addSuccess'),
    ...call('expressions', ['addExpression', 'updateExpression']),
  },
}
</script>

<style></style>
