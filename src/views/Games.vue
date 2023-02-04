<template>
  <div>
    <div class="flex flex-col gap-2 p-4">
      <CategoryRadio v-model="selectedGame" />
      <va-button color="info" preset="plainOpacity" icon="tune" size="large" />
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

export default {
  name: 'Games',
  components: {
    CategoryRadio,
    Education,
    GameList,
  },
  data: () => ({
    selectedCategory: null,
    selectedGame: null,
  }),
  computed: {
    getExpressions: get('expressions/getExpressions', false),
  },
}
</script>

<style></style>
