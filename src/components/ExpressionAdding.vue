<template>
  <div>
    <div class="flex flex-col items-center p-4 gap-2">
      <BaseCheckboxGroup v-model="selectedSections" :options="dictionarySections" class="dictionary-sections" />
      <SearchInput :collection="getExpressions" @select-new="addNewExpression" @select="updateExpression" />
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
    suggestions: [],
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
    async addNewExpression({ target, translate }) {
      this.saving = true
      await this.addExpression({
        target,
        translate,
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
