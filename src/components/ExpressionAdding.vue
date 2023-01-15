<template>
  <div>
    <div class="flex flex-col items-center p-4 gap-2">
      <BaseCheckboxGroup
        v-model="selectedCategories"
        :options="getDictionaryCategories"
        :class="{ 'animate-pulse animation-duration-500': animation }"
        class="dictionary-categories"
      />
      <SearchInput
        :collection="getExpressions"
        :disabled="!selectedCategories.length"
        @select-new="addNewExpression"
        @select="updateExpression"
        @warn="warn()"
      />
    </div>
    <hr class="my-1" />
    <ul class="py-4 px-8">
      <li
        v-for="expression in getExpressions"
        :key="expression._id"
        class="flex items-center my-1 p-1 gap-1 hover:bg-gray-50"
      >
        <strong class="font-medium">{{ expression.target }}</strong>
        <BaseButton
          theme="simple"
          icon="volume_up"
          class="text-blue-400 hover:text-blue-500"
          @click="voiceText(expression.target)"
        />
        <span class="mx-1">-</span>
        <span class="text-gray-600">{{ expression.translate }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { call, get } from 'vuex-pathify'

import { dictionaryCategory, dictionaryCategories } from '../api/types/category'
import { BaseButton, BaseCheckboxGroup } from './base'
import SearchInput from './modules/SearchInput.vue'
import { getFibonacciRate } from '../api/utilities'
import { voiceText } from '../api/utilities/speech'
import { getUTCTimeString } from '../api/utilities/date'

export default {
  name: 'ExpressionAdding',
  components: {
    BaseButton,
    BaseCheckboxGroup,
    SearchInput,
  },
  data: () => ({
    selectedCategories: [dictionaryCategory.TERM],
    searchText: '',
    translate: '',
    saving: false,
    suggestions: [],
    animation: false,
  }),
  computed: {
    getDictionaryCategories() {
      return dictionaryCategories.map((category) => ({ ...category, title: category.description }))
    },
    ...get('expressions', {
      getExpressions: 'collection',
    }),
    ...get('users', {
      user: 'user',
    }),
  },
  created() {
    this.ownerId = this.user._id // ToDo change this later (from route)
    this.fetchAll()
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
    updateExpression(expression) {
      console.log(expression)
      // ToDo update
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
    voiceText,
    ...call('expressions', ['addExpression', 'fetchAll']),
  },
}
</script>

<style>
.dictionary-categories .checkbox-group-option {
  width: 8rem;
}
.animation-duration-500 {
  animation-duration: 0.5s;
}
</style>
