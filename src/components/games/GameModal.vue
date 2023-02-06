<template>
  <va-modal :model-value="!!game" fullscreen hide-default-actions @update:modelValue="$emit('close')">
    <template #header>
      <h1 class="mb-4 text-3xl font-semibold text-gray-700">{{ game.title }}</h1>
    </template>
    <component :is="game.componentName" :collection="collection" :game="game" />
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
}
</script>

<style></style>
