<template>
  <va-modal :model-value="!!game" fullscreen hide-default-actions @update:modelValue="$emit('close')"> test </va-modal>
</template>

<script>
export default {
  name: 'GameModal',
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
