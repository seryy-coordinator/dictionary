<template>
  <div>
    <div class="flex flex-col items-center p-4 gap-2">
      <BaseCheckboxGroup v-model="selectedSections" :options="dictionarySections" class="dictionary-sections" />
      <div class="flex items-center justify-center gap-2">
        <BaseInput v-model="newWord" class="border border-gray-300" @enter="addNewWord()" />
        <BaseButton @click="addNewWord()">Add</BaseButton>
      </div>
    </div>
    <hr class="my-1" />
    <ul>
      <li v-for="word in dictionary" :key="word">{{ word }}</li>
    </ul>
  </div>
</template>

<script>
import { WordsCollection } from '../api/collections'
import { dictionarySection, dictionarySections } from '../api/types/section'

import BaseButton from './base/BaseButton.vue'
import BaseInput from './base/BaseInput.vue'
import BaseCheckboxGroup from './base/BaseCheckboxGroup.vue'

export default {
  name: 'WordAdding',
  components: {
    BaseButton,
    BaseInput,
    BaseCheckboxGroup,
  },
  data: () => ({
    dictionarySections,
    selectedSections: [dictionarySection.LEXICON],
    newWord: '',
    selectedTranslate: '',
    dictionary: [],
    saving: false,
  }),
  methods: {
    async addNewWord() {
      this.saving = true

      const data = {
        word: this.newWord,
        user: 'Serg',
        sections: [],
      }
      // use fibonacci number for rate
      const word = await WordsCollection.create(data)
      this.dictionary.push(word)
      this.newWord = ''
      this.saving = false
    },
  },
}
</script>

<style>
.dictionary-sections .checkbox-group-option {
  width: 8rem;
}
</style>
