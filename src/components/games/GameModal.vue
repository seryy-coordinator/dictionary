<template>
  <va-modal :model-value="!!game" fullscreen hide-default-actions @update:modelValue="$emit('close')">
    <template #header>
      <h1 class="h-12 text-3xl font-semibold text-gray-700">{{ game.title }}</h1>
    </template>
    <TotalResult v-if="total" :total="total" :game="game" @repeat="repeat()" @recommend="recommend()" />
    <component v-else :is="game.componentName" :collection="sorted" :game="game" @finish="total = $event" />
  </va-modal>
</template>

<script>
import Cards from './types/Cards.vue'
import TotalResult from './modules/TotalResult.vue'

export default {
  name: 'GameModal',
  components: {
    Cards,
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
  }),
  watch: {
    game(newValue) {
      if (newValue) {
        this.initExpressions()
        return
      }
      this.sorted = []
    },
  },
  methods: {
    initExpressions() {
      this.sorted = this.game.sortCollection?.(this.collection) ?? this.collection
    },
    repeat() {
      this.initExpressions()
      this.total = null
    },
    recommend() {
      this.$emit('change-game', this.game.recommend)
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
