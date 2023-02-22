<template>
  <va-modal :model-value="!!game" fullscreen hide-default-actions @update:modelValue="$emit('close')">
    <template #header>
      <h1 class="h-12 text-3xl font-semibold text-gray-700">{{ game.title }}</h1>
    </template>
    <GameSettings v-if="!settings" :game="game" :collection="collection" @start="start" />
    <TotalResult v-else-if="total" :total="total" :game="game" @repeat="repeat()" @recommend="recommend()" />
    <component
      v-else
      :is="game.componentName"
      :collection="sorted"
      :game="game"
      :settings="settings"
      @finish="total = $event"
    />
  </va-modal>
</template>

<script>
import Cards from './types/Cards.vue'
import GameSettings from './modules/GameSettings.vue'
import TotalResult from './modules/TotalResult.vue'

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
  }),
  watch: {
    game(newValue) {
      if (newValue) {
        this.settings = null
        this.total = null
        return
      }
      this.sorted = []
    },
  },
  methods: {
    initExpressions() {
      const collection = this.game.sortCollection?.(this.collection) ?? this.collection
      this.sorted = this.settings.number ? collection.slice(0, this.settings.number) : collection
    },
    repeat() {
      this.initExpressions()
      this.total = null
    },
    recommend() {
      this.$emit('change-game', this.game.recommend)
    },
    start(settings) {
      this.settings = settings
      this.initExpressions()
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
