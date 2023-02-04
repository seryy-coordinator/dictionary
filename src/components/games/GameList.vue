<template>
  <ul class="flex flex-wrap justify-center gap-2 p-4">
    <li
      v-for="game in games"
      :key="game.key"
      :class="game.notImplemented ? 'opacity-50' : 'cursor-pointer'"
      class="w-[230px] flex gap-1 p-2 bg-blue-50 border border-blue-100 rounded select-none"
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
      type: String,
      default: null,
    },
    category: {
      type: Number,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  data: () => ({
    selectedGame: null,
    games,
  }),
  computed: {
    getGames() {
      return this.games.filter(({ categories }) => !categories || categories.includes(this.category))
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
