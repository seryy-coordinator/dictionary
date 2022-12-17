<template>
  <div>
    <div class="flex flex-col items-center p-4 gap-2">
      <BaseCheckboxGroup v-model="selectedSections" :options="dictionarySections" class="dictionary-sections" />
      <div class="flex items-center justify-center gap-2">
        <BaseInput v-model="searchText" class="border border-gray-300" @enter="addNewExpression()" />
        <BaseButton @click="addNewExpression()">Add</BaseButton>
      </div>
    </div>
    <hr class="my-1" />
    <ul>
      <li v-for="expression in getExpressions" :key="expression._id">{{ expression.target }}</li>
    </ul>
  </div>
</template>

<script>
import { call, get } from 'vuex-pathify'

import { dictionarySection, dictionarySections } from '../api/types/section'
import BaseButton from './base/BaseButton.vue'
import BaseInput from './base/BaseInput.vue'
import BaseCheckboxGroup from './base/BaseCheckboxGroup.vue'

export default {
  name: 'ExpressionAdding',
  components: {
    BaseButton,
    BaseInput,
    BaseCheckboxGroup,
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
    ...call('expressions', ['addExpression', 'fetchAll']),
  },
}
</script>

<style>
.dictionary-sections .checkbox-group-option {
  width: 8rem;
}
</style>
