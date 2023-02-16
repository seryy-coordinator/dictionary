<template>
  <div>
    <div class="flex justify-center">
      <div class="flex flex-col gap-2 py-4">
        <CategoryRadio v-model="selectedCategory" />
        <Filters v-model:dateValue="date" v-model:labelsValue="selectedLabels" v-model:authorsValue="selectedAuthors" />
      </div>
    </div>
    <education />
    <GameList v-model="selectedGame" :category="selectedCategory" />
    <GameModal :collection="getFiltered" :game="selectedGame" @change-game="changeGame" @close="selectedGame = null" />
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

import CategoryRadio from '../components/games/CategoryRadio.vue'
import GameList from '../components/games/GameList.vue'
import Filters from '../components/games/Filters.vue'
import GameModal from '../components/games/GameModal.vue'

import { dateSchema } from '../api/types/filter'
import { dictionaryCategory } from '../api/types/category'
import { games } from '../api/types/game'

export default {
  name: 'Games',
  components: {
    CategoryRadio,
    GameList,
    Filters,
    GameModal,
  },
  data: () => ({
    selectedCategory: dictionaryCategory.TERM,
    selectedGame: null,
    date: dateSchema(),
    selectedLabels: [],
    selectedAuthors: [],
  }),
  computed: {
    getFiltered() {
      const startDate = this.date.range?.start ? new Date(this.date.range.start) : null
      return this.getExpressions.filter(({ statistic, labels, authors, date, notImportant }) => {
        return (
          !notImportant &&
          (!this.selectedAuthors.length || authors.some(({ _id }) => this.selectedAuthors.includes(_id))) &&
          (!this.selectedLabels.length || labels.some((label) => this.selectedLabels.includes(label))) &&
          (!this.selectedCategory || statistic[this.selectedCategory]) &&
          (!startDate || (date >= startDate && date <= this.getEndDate))
        )
      })
    },
    getEndDate() {
      if (this.date.range?.end) {
        return this.date.period ? new Date() : new Date(this.date.range.end)
      }
      return null
    },
    getExpressions: get('expressions/getExpressions', false),
  },
  methods: {
    changeGame(key) {
      this.selectedGame = games.find((game) => game.key == key)
    },
  },
}
</script>

<style></style>
