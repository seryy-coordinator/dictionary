<template>
  <div class="h-full flex flex-col justify-center select-none gap-3 max-w-md mx-auto">
    <va-select
      v-if="numberVisible"
      v-model="settings.number"
      :options="getNumberOptions"
      label="Number of expressions"
    />
    <base-checkbox-group
      v-if="mutesVisible"
      v-model="settings.mutes"
      :options="getMuteOptions"
      label="Mute"
      size="sm"
      class="self-start"
    />
    <va-button block color="info" class="mt-20" @click="start()"> Start game </va-button>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash-es'
import { LocalStorage } from '../../../api/utilities/localStorage'

export default {
  name: 'GameSettings',
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
  emits: ['start'],
  data() {
    return {
      settings: LocalStorage[this.game.key] || cloneDeep(this.game.settings) || {},
    }
  },
  computed: {
    numberVisible() {
      return this.game.settings?.number
    },
    mutesVisible() {
      return this.game.settings?.number
    },
    getNumberOptions() {
      const options = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].filter((value) => value < this.collection.length)
      if (this.collection.length <= 100) {
        options.push(this.collection.length)
      }
      return options
    },
    getMuteOptions() {
      return [
        { key: 'term', label: 'Term' },
        { key: 'definition', label: 'Definition' },
      ]
    },
  },
  created() {
    if (this.numberVisible && !this.getNumberOptions.includes(this.settings.number)) {
      this.settings.number = this.game.settings.number
    }
  },
  methods: {
    start() {
      LocalStorage[this.game.key] = this.settings
      this.$emit('start', this.settings)
    },
  },
}
</script>

<style></style>
