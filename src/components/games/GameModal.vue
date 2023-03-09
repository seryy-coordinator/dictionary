<template>
  <va-modal :model-value="!!game" fullscreen hide-default-actions @update:modelValue="$emit('close')">
    <template #header>
      <h1 class="h-12 text-3xl font-semibold text-gray-700">{{ game.title }}</h1>
    </template>
    <GameSettings v-if="!settings" :game="game" :collection="collection" @start="start" />
    <TotalResult
      v-else-if="total"
      :total="total"
      :game="game"
      @repeat="repeat()"
      @recommend="recommend()"
      @finish="$emit('close')"
    />
    <component
      v-else
      :is="game.componentName"
      :collection="sorted"
      :game="game"
      :settings="settings"
      :without-statistic="withoutStatistic"
      @finish="total = $event"
    />
  </va-modal>
</template>

<script>
import Cards from './types/Cards.vue'
import GameSettings from './modules/GameSettings.vue'
import TotalResult from './modules/TotalResult.vue'
import { toggleMobileFullScreen } from '../../api/utilities/device.js'

export default {
  name: 'GameModal',
  components: {
    Cards,
    GameSettings,
    TotalResult,
  },
  props: {
    collection: {
      type: Array,
      required: true,
    },
    game: {
      type: Object,
      default: null,
    },
  },
  emits: ['close', 'change-game'],
  data: () => ({
    sorted: [],
    total: null,
    settings: null,
    withoutStatistic: false,
  }),
  watch: {
    game(newValue) {
      toggleMobileFullScreen()
      if (newValue) {
        this.settings = null
        this.total = null
        this.withoutStatistic = false
        return
      }
      this.sorted = []
    },
  },
  methods: {
    initExpressions(expressions) {
      const collection = this.game.sortCollection?.(expressions) ?? expressions
      this.sorted = this.settings.number ? collection.slice(0, this.settings.number) : collection
    },
    repeat() {
      const expressions = this.total.find(({ repeat }) => repeat).expressions.map(({ expression }) => expression)
      this.initExpressions(expressions)
      this.total = null
      this.withoutStatistic = true
    },
    recommend() {
      this.$emit('change-game', this.game.recommend)
    },
    start(settings) {
      this.settings = settings
      this.initExpressions(this.collection)
    },
  },
}
</script>

<style>
.va-modal--fullscreen .va-modal__message {
  height: calc(100vh - var(--va-modal-padding-top) - var(--va-modal-padding-bottom) - 3rem);
}
.va-modal__dialog.va-modal--fullscreen {
  overflow: hidden;
}
</style>
