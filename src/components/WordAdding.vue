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
import BaseButton from './base/BaseButton.vue'
import BaseInput from './base/BaseInput.vue'
import BaseCheckboxGroup from './base/BaseCheckboxGroup.vue'

const dictionarySection = {
  LEXICON: 'lexicon',
  PHRASE: 'phrase',
  PRONUNCIATION: 'pronunciation',
}

const dictionarySections = [
  {
    value: dictionarySection.LEXICON,
    label: 'Lexicon',
    icon: 'psychology',
    image: '',
  },
  {
    value: dictionarySection.PHRASE,
    label: 'Phrase',
    icon: 'translate',
    image: '',
  },
  {
    value: dictionarySection.PRONUNCIATION,
    label: 'Pronunciation',
    icon: 'headphones',
    image: '',
  },
]

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
    dictionary: [],
  }),
  methods: {
    addNewWord() {
      this.dictionary.push(this.newWord)
      this.newWord = ''
    },
  },
}
</script>

<style>
.dictionary-sections .checkbox-group-option {
  width: 8rem;
}
</style>
