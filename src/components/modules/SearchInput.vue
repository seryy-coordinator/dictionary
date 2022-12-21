<template>
  <div class="relative">
    <div class="flex items-center justify-center h-12">
      <BaseInput v-model="searchText" class="h-full border border-gray-300 w-80" @enter="selectNewExpression()" />
      <BaseButton
        :disabled="!this.searchText"
        theme="simple"
        icon="search"
        class="h-full border-r border-t border-b border-gray-300 bg-gray-100 px-2"
        @click="selectNewExpression()"
      />
    </div>
    <ul
      v-show="getCoincidences.length"
      class="bg-white border border-gray-100 max-h-64 overflow-auto absolute top-full w-full"
    >
      <li
        v-for="expression in getCoincidences"
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
  }),
  computed: {
    getCoincidences() {
      return this.searchText
        ? this.collection.filter(
            ({ target, translate }) => target.includes(this.searchText) || translate.includes(this.searchText)
          )
        : []
    },
  },
  methods: {
    selectNewExpression() {
      if (this.searchText !== '') {
        this.$emit('select-new', this.searchText)
        this.searchText = ''
      }
    },
    selectExpression(expression) {
      this.$emit('select', expression)
      this.searchText = ''
    },
  },
}
</script>

<style></style>
