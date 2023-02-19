<template>
  <div class="h-full flex flex-col justify-center select-none gap-2 max-w-md mx-auto">
    <va-button @click="start()" block> Start game </va-button>
  </div>
</template>

<script>
export default {
  name: 'GameSettings',
  props: {
    game: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      settings: this.game.initSettings ? {} : {},
    }
  },
  emits: ['start'],
  methods: {
    start() {
      this.$emit('start', this.settings)
    },
  },
}
</script>

<style></style>
