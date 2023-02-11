<template>
  <va-modal :model-value="!!game" fullscreen hide-default-actions @update:modelValue="$emit('close')">
    <template #header>
      <h1 class="h-12 text-3xl font-semibold text-gray-700">{{ game.title }}</h1>
    </template>
    <component :is="game.componentName" :collection="sorted" :game="game" />
  </va-modal>
</template>

<script>
import Cards from './types/Cards.vue'

export default {
  name: 'GameModal',
  components: {
    Cards,
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
  emits: ['close'],
  computed: {
    sorted() {
      return this.game.sortCollection?.(this.collection) ?? this.collection
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
