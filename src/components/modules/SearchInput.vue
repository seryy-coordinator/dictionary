<template>
  <div class="relative w-80">
    <div class="flex flex-col gap-1 p-1 border border-gray-100">
      <BaseInput v-model="enText" class="h-10 border border-gray-300" @input="search" @blur="loadAfterBlur()">
        <template #left>
          <p class="absolute left-1 font-semibold text-gray-800">En:</p>
        </template>
        <template #right>
          <BaseLoading v-if="loading" class="mr-2" />
        </template>
      </BaseInput>
      <div class="flex items-center justify-center h-10">
        <BaseInput v-model="ruText" id="ruText" class="h-full border border-gray-300 w-80">
          <template #left>
            <p class="absolute left-1 font-semibold text-gray-800">Ru:</p>
          </template>
        </BaseInput>
        <BaseButton :disabled="!enText || !ruText || disabled" icon="add" class="h-full px-2" @click="add()" />
      </div>
    </div>
    <ul
      v-show="getExpressions.length"
      class="bg-white border border-gray-100 max-h-64 overflow-auto absolute top-full w-full"
    >
      <li
        v-for="expression in getExpressions"
        :key="expression._id"
        :class="{ 'hover:bg-gray-50 cursor-pointer': !disabled }"
        class="my-1 py-1 px-3"
        @mousedown="selectExpression(expression)"
      >
        <p v-if="expression.target" class="leading-4">{{ expression.target }}</p>
        <p class="text-xs text-gray-600">{{ expression.translate }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { debounce } from 'lodash-es'
import { BaseButton, BaseInput, BaseLoading } from '../base'
import { getMiniCards, getTranscription } from '../../api/firebase/functions'

export default {
  name: 'SearchInput',
  components: {
    BaseButton,
    BaseInput,
    BaseLoading,
  },
  props: {
    collection: {
      type: Array,
      default: () => [],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    enText: '',
    ruText: '',
    selected: null,
    suggestions: [],
    loading: false,
  }),
  computed: {
    getTranslates() {
      const suggestion = this.suggestions.find(({ target }) => target === this.enText)
      if (suggestion) {
        const suggestions = suggestion.translate.split(/[;,]+/)
        const translates = suggestions.length > 1 ? [suggestion.translate, ...suggestions] : suggestion.translate
        return translates.filter((translate) => translate.includes(this.ruText)).map((translate) => ({ translate }))
      }
      return []
    },
    getCoincidences() {
      return this.enText ? this.collection.filter(({ target }) => target.includes(this.enText)) : []
    },
    getExpressions() {
      if (!this.selected) {
        return [...this.getCoincidences, ...this.suggestions]
      }
      if (!this.selected.translate) {
        return this.getTranslates
      }
      return []
    },
  },
  created() {
    this.debounceLoading = debounce(this.loadSuggestions, 500)
  },
  methods: {
    async add() {
      if (this.selected._id) {
        this.$emit('select', this.selected)
      } else {
        const transcription = await this.transcriptionRequest
        const selected = { ...this.selected, transcription }
        this.$emit('select-new', selected)
      }
      this.clear()
    },
    selectExpression(expression) {
      if (expression._id) {
        this.selected = expression
        this.enText = expression.target
        this.ruText = expression.translate
      } else if (expression.target) {
        this.selected = {
          target: expression.target,
          translate: '',
        }
        this.enText = expression.target
        this.ruText = ''
        requestAnimationFrame(() => {
          document.getElementById('ruText').focus()
        })
      } else {
        this.selected.translate = expression.translate
        this.ruText = expression.translate
      }
    },
    async loadSuggestions() {
      if (this.enText && this.enText !== this.selected?.target) {
        this.loading = true
        this.suggestions = await getMiniCards(this.enText)
        this.loading = false
      }
    },
    async getTranscription() {
      this.transcriptionRequest = getTranscription(this.enText)
    },
    loadAfterBlur() {
      if (!this.selected) {
        this.loadSuggestions()
        this.selected = {
          target: this.enText,
          translate: '',
        }
      }
      if (!this.selected?._id) {
        this.getTranscription()
      }
    },
    search(enText) {
      this.suggestions = []
      this.selected = null
      if (enText.length > 3) {
        this.debounceLoading()
      }
    },
    clear() {
      this.loading = false
      this.enText = ''
      this.ruText = ''
      this.selected = null
      this.suggestions = []
    },
  },
}
</script>

<style></style>
