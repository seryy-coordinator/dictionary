<template>
  <ul class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 p-4">
    <li
      v-for="game in getGames"
      :key="game.key"
      :class="game.notImplemented ? 'opacity-50' : 'cursor-pointer'"
      class="flex gap-1 p-2 bg-blue-50 border border-blue-100 rounded select-none"
      @click="selectGame(game)"
    >
      <va-icon :name="game.icon" size="3rem" color="info" />
      <div>
        <strong class="text-lg">{{ game.title }}</strong>
        <p class="text-sm text-gray-700">{{ game.description }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { games } from '../../api/types/game'

export default {
  name: 'GameList',
  props: {
    modelValue: {
      type: Object,
      default: null,
    },
    category: {
      type: String,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  data: () => ({
    selectedGame: null,
  }),
  computed: {
    getGames() {
      return games.filter(({ categories }) => !categories || categories.includes(this.category))
    },
  },
  methods: {
    selectGame(game) {
      if (!game.notImplemented) {
        this.$emit('update:modelValue', game)
      }
    },
  },
}
</script>

<style></style>
