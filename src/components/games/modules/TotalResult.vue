<template>
  <div class="h-full flex flex-col justify-center select-none gap-2 max-w-md mx-auto">
    <div class="flex justify-center items-center gap-2 mb-8 bg-blue-50 py-4 px-2 rounded-sm border border-gray-100">
      <va-icon color="success" name="check_circle_outline" size="5rem" />
      <div>
        <p v-for="(item, index) in total" :key="index" class="flex items-center gap-1 my-1">
          <va-icon :color="item.color" :name="item.icon" />
          <strong class="mr-8">{{ item.label }}</strong>
          <va-chip :color="item.color" outline class="ml-auto">{{ item.value }}</va-chip>
        </p>
      </div>
    </div>
    <va-button @click="$emit('repeat')" block> Repeat game </va-button>
    <va-button v-if="recommended" preset="secondary" border-color="primary" block @click="$emit('recommend')">
      Run `{{ recommended.title }}` game
    </va-button>
  </div>
</template>

<script>
import { games } from '../../../api/types/game'

export default {
  name: 'TotalResult',
  props: {
    total: {
      type: Array,
      required: true,
    },
    game: {
      type: Object,
      default: null,
    },
  },
  emits: ['recommend', 'repeat'],
  computed: {
    recommended() {
      return this.game.recommend ? games.find((game) => game.key == this.game.recommend) : null
    },
  },
}
</script>

<style></style>
