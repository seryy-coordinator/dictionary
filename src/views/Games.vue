<template>
  <div>
    <div class="flex flex-col gap-2 p-4">
      <CategoryRadio v-model="selectedGame" />
      <Filters v-model:dateValue="date" v-model:labelsValue="selectedLabels" v-model:authorsValue="selectedAuthors" />
    </div>
    <Education />
    <GameList v-model="selectedGame" :category="selectedCategory" />
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

import CategoryRadio from '../components/games/CategoryRadio.vue'
import Education from '../components/common/Education.vue'
import GameList from '../components/games/GameList.vue'
import Filters from '../components/games/Filters.vue'

import { dateSchema } from '../api/types/filter'

export default {
  name: 'Games',
  components: {
    CategoryRadio,
    Education,
    GameList,
    Filters,
  },
  data: () => ({
    selectedCategory: null,
    selectedGame: null,
    date: dateSchema(),
    selectedLabels: [],
    selectedAuthors: [],
  }),
  computed: {
    getFiltered() {
      const startDate = this.date.range?.start ? new Date(this.date.range.start) : null
      return this.getExpressions.filter(({ statistic, labels, authors, date }) => {
        return (
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
}
</script>

<style></style>
