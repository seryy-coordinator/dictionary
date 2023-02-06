<template>
  <div class="flex flex-col items-center justify-center mt-[50%] -translate-y-1/2">
    <div class="flex w-[386px] mb-8">
      <va-chip square color="warning" size="small" class="w-12 font-semibold">{{ fails }}</va-chip>
      <p class="mx-auto">{{ activeIndex + 1 }}/{{ collection.length }}</p>
      <va-chip square color="success" size="small" class="w-12 font-semibold">{{ successes }}</va-chip>
    </div>
    <va-card square color="#eff6ff" class="mb-10">
      <va-card-title class="h-16">
        <div class="flex items-center gap-2">
          <voice-button :expression="getCurrent" size="medium" />
          <p>{{ getCurrent.transcription }}</p>
        </div>
      </va-card-title>
      <va-card-content class="pb-16 overflow-hidden">
        <div class="flex items-center -mx-9">
          <va-button
            color="warning"
            round
            icon="replay"
            class="opacity-0 hover:opacity-100 w-14"
            @click="setStatus(false)"
          />
          <div class="min-h-[64px] min-w-[250px] flex items-center justify-center text-lg">{{ getCurrent.target }}</div>
          <va-button
            color="success"
            round
            icon="done"
            class="opacity-0 hover:opacity-100 w-14"
            @click="setStatus(true)"
          />
        </div>
      </va-card-content>
    </va-card>
    <base-pagination v-model="activeIndex" :max="collection.length - 1" :focused="focusedIndex" />
  </div>
</template>

<script>
export default {
  name: 'Cards',
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
      return this.results.length - 2
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
      this.nextExpression()
    },
    nextExpression() {
      if (this.collection.length > this.activeIndex) {
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
