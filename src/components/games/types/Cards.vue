<template>
  <div class="h-full flex flex-col items-center justify-center select-none overflow-hidden">
    <div class="flex w-96 mb-8">
      <va-chip square color="warning" size="small" class="w-12 font-semibold">{{ fails }}</va-chip>
      <p class="mx-auto">{{ activeIndex + 1 }}/{{ collection.length }}</p>
      <va-chip square color="success" size="small" class="w-12 font-semibold">{{ successes }}</va-chip>
    </div>
    <div class="relative bg-gray-100 rounded mb-10" ref="cardWrapper">
      <va-card
        :style="positionStyles"
        :class="{ 'transition-all duration-300': animationEnds }"
        class="relative"
        square
        color="#eff6ff"
        @mousedown="startDragging"
      >
        <va-card-content class="pb-8 overflow-hidden">
          <div class="h-8 flex items-center">
            <voice-button :expression="getCurrent" size="medium" @click.stop />
            <p class="text-sm font-medium">{{ getCurrent.transcription }}</p>
          </div>
          <div class="flex items-center gap-1 -mx-9">
            <va-button
              color="warning"
              round
              icon="replay"
              class="opacity-0 hover:opacity-100 w-14 z-10 transition-opacity"
              @click.stop="setStatus(false)"
            />
            <div class="w-64">
              <div class="min-h-[64px] flex items-center justify-center text-center text-lg text-gray-600">
                {{ getCurrent.target }}
              </div>
              <div
                class="relative min-h-[64px] flex items-center justify-center text-center border border-blue-100 text-black rounded-sm"
              >
                <voice-button :expression="getCurrent" locale="ru" size="medium" @click.stop />
                {{ getCurrent.translate }}
                <div :class="show ? 'h-0 transition-all mt-1' : 'h-full'" class="absolute inset-0 bg-blue-100">
                  <div class="absolute -inset-1 bg-blue-50 animate-full-pulse"></div>
                </div>
              </div>
            </div>
            <va-button
              color="success"
              round
              icon="done"
              class="opacity-0 hover:opacity-100 w-14 z-10 transition-opacity"
              @click.stop="setStatus(true)"
            />
          </div>
        </va-card-content>
      </va-card>
    </div>
    <base-pagination v-model="activeIndex" :max="collection.length - 1" :focused="focusedIndex" />
  </div>
</template>

<script>
import { voiceEnText, voiceRuText } from '@/api/utilities/speech'

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
    show: false,
    settings: {
      autoplay: false,
      mute: false,
    },
    startPosition: null,
    currentPosition: null,
    animationEnds: false,
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
    tempStatus() {
      return this.currentPosition.x - this.startPosition.x > 0
    },
    positionStyles() {
      const { x = 0, y = 0 } = this.startPosition || {}
      const left = this.currentPosition ? this.currentPosition.x - x : 0
      const top = this.currentPosition ? this.currentPosition.y - y : 0
      return {
        left: `${left}px`,
        top: `${top}px`,
      }
    },
  },
  mounted() {
    this.voiceTarget()
  },
  methods: {
    showAnswer() {
      if (!this.show && !this.settings.mute) {
        voiceRuText(this.getCurrent.translate)
      }
      this.show = true
    },
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
      if (this.collection.length - 1 > this.activeIndex) {
        this.show = false
        this.activeIndex++
        this.voiceTarget()
      } else {
        this.finish()
      }
    },
    finish() {
      // ToDo show results
    },
    voiceTarget() {
      if (!this.settings.mute) {
        voiceEnText(this.getCurrent.target)
      }
    },
    startDragging(event) {
      this.animationEnds = false
      this.startPosition = { x: event.x, y: event.y }
      window.addEventListener('mouseup', this.stopDragging)
      window.addEventListener('mousemove', this.drag)
    },
    drag(event) {
      this.currentPosition = { x: event.x, y: event.y }
    },
    stopDragging(event) {
      const deltaX = Math.abs(event.x - this.startPosition.x)
      const deltaY = Math.abs(event.y - this.startPosition.y)
      if (deltaX < 5 && deltaY < 5) {
        this.showAnswer()
      } else if (deltaX > 100) {
        this.setStatus(this.tempStatus)
        this.animationEnds = true
        this.landOutside()
      } else {
        this.animationEnds = true
        this.startPosition = null
        this.currentPosition = null
      }
      window.removeEventListener('mouseup', this.stopDragging)
      window.removeEventListener('mousemove', this.drag)
    },
    landOutside() {
      const { left, width } = this.$refs.cardWrapper.getBoundingClientRect()
      const landingX = this.tempStatus ? window.innerWidth : -width
      const newX = landingX - left
      this.currentPosition.y =
        (this.currentPosition.y - this.startPosition.y) * (newX / (this.currentPosition.x - this.startPosition.x))
      this.currentPosition.x = newX
      this.startPosition = null
    },
  },
}
</script>

<style></style>
