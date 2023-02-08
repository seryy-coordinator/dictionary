<template>
  <div class="relative w-80 z-10">
    <div class="flex flex-col gap-1 p-1 border border-gray-100">
      <va-input v-model="enText" :loading="loading" label="En" @update:modelValue="search()" @blur="loadAfterBlur()" />
      <va-input v-model="ruText" label="Ru" id="ruText" @update:modelValue="clearTranslate()">
        <template #append>
          <va-button
            :disabled="!getEnText || !getRuText || disabled"
            :icon="selected && selected._id ? 'upgrade' : 'add'"
            @click="add()"
          />
        </template>
      </va-input>
    </div>
    <ul
      v-show="getExpressions.length"
      class="bg-white border border-gray-100 max-h-64 overflow-auto absolute top-full w-full"
    >
      <li
        v-for="expression in getExpressions"
        :key="expression._id || expression.target"
        :class="{ 'hover:bg-gray-50 cursor-pointer': !disabled, 'bg-blue-50': expression._id }"
        class="flex items-center justify-between gap-1 my-1 py-1 px-3"
        @mousedown="selectExpression(expression)"
      >
        <div>
          <p v-if="expression.target" class="leading-4">{{ expression.target }}</p>
          <p class="text-xs text-gray-600">{{ expression.translate }}</p>
        </div>
        <div v-if="expression._id" class="text-[10px] text-black text-right">
          <div class="flex items-center justify-end">
            <base-avatar
              v-if="expression.author"
              :src="expression.author.picture"
              :name="expression.author.name"
              size="tiny"
              class="mr-1"
            />
            <div class="ml-auto">
              <va-icon
                v-for="{ structure, rate } in expression.categories"
                :key="structure.key"
                :name="structure.icon"
                size="small"
                :color="rate ? 'danger' : 'success'"
              />
            </div>
          </div>
          <p>{{ expression.formattedDate }}</p>
          <!-- ToDo labels -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { debounce } from 'lodash-es'
import { getMiniCards, getTranscription } from '../../api/firebase/functions'
import { getShortDate } from '../../api/utilities/date'

export default {
  name: 'SearchInput',
  props: {
    collection: {
      type: Array,
      default: () => [],
    },
    phrase: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['select', 'select-new', 'pre-select'],
  data: () => ({
    enText: '',
    ruText: '',
    selected: null,
    suggestions: [],
    loading: false,
  }),
  computed: {
    getEnText() {
      return this.enText.replace(/\s+/g, ' ')
    },
    getRuText() {
      return this.ruText.replace(/\s+/g, ' ')
    },
    getTranslates() {
      const suggestion = this.suggestions.find(({ target }) => target === this.getEnText)
      if (suggestion) {
        const suggestions = suggestion.translate.split(/[;,]+/)
        const translates = suggestions.length > 1 ? [suggestion.translate, ...suggestions] : [suggestion.translate]
        return translates.filter((translate) => translate.includes(this.getRuText)).map((translate) => ({ translate }))
      }
      return []
    },
    getCoincidences() {
      if (this.getEnText) {
        return this.collection
          .filter(({ target }) => target.includes(this.getEnText))
          .map((item) => {
            return {
              ...item,
              author: item.isPersonal ? null : item.authors[item.authors.length - 1],
              formattedDate: getShortDate(item.date),
            }
          })
      }
      return []
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
  watch: {
    phrase(newValue) {
      if (!this.selected?._id && this.getEnText && !newValue) {
        this.getTranscription()
      }
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
        const transcription = this.phrase ? '' : await this.transcriptionRequest
        const selected = {
          ...this.selected,
          transcription,
          translate: this.getRuText,
        }
        this.$emit('select-new', selected)
      }
      this.clear()
    },
    selectExpression(expression) {
      if (expression._id) {
        this.selected = expression
        this.enText = expression.target
        this.ruText = expression.translate
        this.$emit('pre-select', expression)
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
      if (this.getEnText && this.getEnText !== this.selected?.target) {
        this.loading = true
        this.suggestions = await getMiniCards(this.getEnText)
        this.loading = false
      }
    },
    async getTranscription() {
      this.transcriptionRequest = getTranscription(this.getEnText)
    },
    loadAfterBlur() {
      if (!this.selected) {
        this.loadSuggestions()
        this.selected = {
          target: this.getEnText,
          translate: '',
        }
      }
      if (!this.selected?._id && this.getEnText && !this.phrase) {
        this.getTranscription()
      }
    },
    search() {
      this.suggestions = []
      this.selected = null
      if (this.getEnText.length > 3) {
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
    clearTranslate() {
      if (this.selected) {
        this.selected.translate = ''
      }
    },
  },
}
</script>

<style></style>
