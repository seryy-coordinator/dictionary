<template>
  <div class="relative">
    <div class="flex items-center justify-center h-12">
      <BaseInput v-model="searchText" class="h-full border border-gray-300 w-80" @enter="loadSuggestions()" />
      <BaseButton
        :disabled="!this.searchText"
        :loading="loading"
        theme="simple"
        icon="search"
        class="h-full border-r border-t border-b border-gray-300 bg-gray-100 px-2"
        @click="loadSuggestions()"
      />
    </div>
    <ul
      v-show="getExpressions.length"
      class="bg-white border border-gray-100 max-h-64 overflow-auto absolute top-full w-full"
    >
      <li
        v-for="expression in getExpressions"
        :key="expression._id"
        class="my-1 py-2 px-3 hover:bg-gray-50 cursor-pointer"
        @click="selectExpression(expression)"
      >
        <p class="leading-4">{{ expression.target }}</p>
        <p class="text-xs text-gray-600">{{ expression.translate }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { BaseButton, BaseInput } from '../base'
import { getMiniCard } from '../../api/firebase/functions'

// ToDo we have to add button clear

export default {
  name: 'SearchInput',
  components: {
    BaseButton,
    BaseInput,
  },
  props: {
    collection: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    searchText: '',
    suggestions: null,
    loading: false, // ToDo we have to use this for loader
  }),
  computed: {
    getCoincidences() {
      return this.searchText
        ? this.collection.filter(
            ({ target, translate }) => target.includes(this.searchText) || translate.includes(this.searchText)
          )
        : []
    },
    getExpressions() {
      return this.suggestions || this.getCoincidences
    },
  },
  methods: {
    selectExpression(expression) {
      if (this.suggestions) {
        this.$emit('select-new', expression)
      } else {
        this.$emit('select', expression)
      }
      this.clear()
    },
    async loadSuggestions() {
      this.loading = true
      const card = await getMiniCard(this.searchText)
      if (this.loading) {
        this.suggestions = [card]
        this.loading = false
      }
    },
    clear() {
      this.loading = false
      this.searchText = ''
      this.suggestions = null
    },
  },
}
</script>

<style></style>
