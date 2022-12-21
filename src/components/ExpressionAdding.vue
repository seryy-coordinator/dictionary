<template>
  <div>
    <div class="flex flex-col items-center p-4 gap-2">
      <BaseCheckboxGroup v-model="selectedSections" :options="dictionarySections" class="dictionary-sections" />
      <SearchInput :collection="getExpressions" @select-new="fetchTranslates" @select="updateExpression" />
    </div>
    <hr class="my-1" />
    <ul>
      <li v-for="expression in getExpressions" :key="expression._id">
        {{ expression.target }} <BaseButton @click="voiceText(expression.target)">Lissen</BaseButton>
      </li>
    </ul>
  </div>
</template>

<script>
import { call, get } from 'vuex-pathify'

import { dictionarySection, dictionarySections } from '../api/types/section'
import { BaseButton, BaseCheckboxGroup } from './base'
import SearchInput from './modules/SearchInput.vue'
import { voiceText } from '../api/utilities/speech'

export default {
  name: 'ExpressionAdding',
  components: {
    BaseButton,
    BaseCheckboxGroup,
    SearchInput,
  },
  data: () => ({
    dictionarySections,
    selectedSections: [dictionarySection.LEXICON],
    searchText: '',
    translate: '',
    saving: false,
  }),
  computed: {
    ...get('expressions', {
      getExpressions: 'collection',
    }),
  },
  created() {
    this.fetchAll()
  },
  methods: {
    fetchTranslates(expression) {
      console.log(expression)
      // ToDo fetch from API
    },
    async addNewExpression() {
      this.saving = true
      await this.addExpression({
        target: this.searchText,
        translate: this.translate,
        sections: this.selectedSections,
      })
      this.searchText = ''
      this.saving = false
    },
    updateExpression(expression) {
      console.log(expression)
      // ToDo update
    },
    voiceText,
    ...call('expressions', ['addExpression', 'fetchAll']),
  },
}
</script>

<style>
.dictionary-sections .checkbox-group-option {
  width: 8rem;
}
</style>
