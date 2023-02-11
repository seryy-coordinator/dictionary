<template>
  <div class="h-full flex flex-col items-center justify-center select-none">
    <div class="flex w-96 max-w-full mb-8">
      <va-chip square color="warning" size="small" class="w-12 font-semibold">{{ fails }}</va-chip>
      <p class="mx-auto">{{ activeIndex + 1 }}/{{ collection.length }}</p>
      <va-chip square color="success" size="small" class="w-12 font-semibold">{{ successes }}</va-chip>
    </div>
    <div class="relative w-96 max-w-full bg-gray-100 rounded mb-10">
      <Card
        :expression="getCurrent"
        :mute="settings.mute"
        @animation-finished="nextExpression()"
        @set-status="setStatus"
      />
    </div>
    <base-pagination v-model="activeIndex" :max="collection.length - 1" :focused="focusedIndex" />
  </div>
</template>

<script>
import Card from '../modules/Card.vue'

export default {
  name: 'Cards',
  components: {
    Card,
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
  data: () => ({
    activeIndex: 0,
    results: [],
    settings: {
      autoplay: false,
      mute: false,
    },
  }),
  computed: {
    getCurrent() {
      return this.collection[this.activeIndex]
    },
    fails() {
      return this.results.filter(({ fail }) => fail).length
    },
    successes() {
      return this.results.length - this.fails
    },
    focusedIndex() {
      return this.results.length - 1
    },
  },
  methods: {
    setStatus(success) {
      const result = { expression: this.getCurrent, fail: !success }
      if (this.results[this.activeIndex]) {
        this.results[this.activeIndex] = result
      } else {
        this.results.push(result)
      }
    },
    nextExpression() {
      if (this.collection.length - 1 > this.activeIndex) {
        this.activeIndex++
      } else {
        this.finish()
      }
    },
    finish() {
      // ToDo show results
    },
  },
}
</script>

<style></style>
