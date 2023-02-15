<template>
  <va-card
    v-swipe="{ onStart: startDragging, onDrag: drag, onStop: stopDragging }"
    :style="positionStyles"
    :class="{ 'transition-all duration-300': animationEnds }"
    class="relative"
    square
    color="#eff6ff"
    ref="card"
  >
    <div
      :class="tempStatus ? 'bg-green-300' : 'bg-yellow-200'"
      class="absolute inset-0 flex items-center justify-center"
    >
      <va-icon :color="tempStatus ? 'success' : 'warning'" :name="tempStatus ? 'done' : 'replay'" size="4rem" />
    </div>
    <va-card-content :style="contentStyles" class="relative pb-8 bg-blue-50 overflow-hidden">
      <div class="h-8 flex items-center">
        <voice-button :expression="expression" size="medium" />
        <p class="text-sm font-medium">{{ expression.transcription }}</p>
      </div>
      <div class="flex items-center gap-1 -mx-9">
        <va-button
          color="warning"
          round
          icon="replay"
          class="opacity-20 hover:opacity-100 w-14 z-10 transition-opacity"
          @mousedown.stop="setStatus(false)"
          @touchstart.stop
        />
        <div class="flex-grow">
          <div class="min-h-[64px] flex items-center justify-center text-center text-lg text-gray-600">
            {{ expression.target }}
          </div>
          <div
            class="relative min-h-[64px] flex items-center justify-center text-center border border-blue-100 text-black rounded-sm"
          >
            <voice-button :expression="expression" locale="ru" size="medium" @click.stop />
            {{ expression.translate }}
            <div
              :class="show ? 'h-0 transition-all mt-1' : 'h-full'"
              class="absolute inset-0 bg-blue-100"
              @click="!animationEnds && showAnswer()"
            >
              <div class="absolute -inset-1 bg-blue-50 animate-full-pulse"></div>
            </div>
          </div>
        </div>
        <va-button
          color="success"
          round
          icon="done"
          class="opacity-20 hover:opacity-100 w-14 z-10 transition-opacity"
          @mousedown.stop="setStatus(true)"
          @touchstart.stop
        />
      </div>
    </va-card-content>
  </va-card>
</template>

<script>
import { voiceEnText, voiceRuText } from '@/api/utilities/speech'
import swipe from '@/directives/swipe'

export default {
  name: 'Card',
  directives: {
    swipe,
  },
  props: {
    expression: {
      type: Object,
      required: true,
    },
    mute: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['set-status', 'animation-finished'],
  data: () => ({
    show: false,
    startPosition: null,
    currentPosition: null,
    animationEnds: false,
  }),
  computed: {
    positionStyles() {
      const { x = 0, y = 0 } = this.startPosition || {}
      const left = this.currentPosition ? this.currentPosition.x - x : 0
      const top = this.currentPosition ? this.currentPosition.y - y : 0
      return {
        left: `${left}px`,
        top: `${top}px`,
      }
    },
    contentStyles() {
      if (this.startPosition && this.currentPosition && Math.abs(this.currentPosition.x - this.startPosition.x) > 100) {
        const { left, width } = this.$refs.card.$el.parentElement.getBoundingClientRect()
        const landingX = this.tempStatus ? window.innerWidth : -width
        const newX = landingX - left
        const opacity = 0.8 - (this.currentPosition.x - this.startPosition.x) / newX
        return {
          opacity,
        }
      }
      return {}
    },
    tempStatus() {
      return this.currentPosition && this.startPosition ? this.currentPosition.x - this.startPosition.x > 0 : false
    },
  },
  watch: {
    expression: {
      handler() {
        this.startPosition = null
        this.currentPosition = null
        this.show = false
        this.animationEnds = false
        this.voiceTarget()
      },
      immediate: true,
    },
  },
  methods: {
    showAnswer() {
      if (!this.show && !this.mute) {
        voiceRuText(this.expression.translate)
      }
      this.show = true
    },
    setStatus(success) {
      this.landOutside(success)
      this.$emit('set-status', success)
      setTimeout(() => {
        this.$emit('animation-finished')
      }, 300)
    },
    voiceTarget() {
      if (!this.mute) {
        voiceEnText(this.expression.target)
      }
    },
    startDragging({ x, y }) {
      this.animationEnds = false
      this.startPosition = { x, y }
    },
    drag({ x, y }) {
      this.currentPosition = { x, y }
    },
    stopDragging({ x, y }) {
      const deltaX = Math.abs(x - this.startPosition.x)
      const deltaY = Math.abs(y - this.startPosition.y)
      if (deltaX < 5 && deltaY < 5) {
        this.startPosition = null
        this.currentPosition = null
        return
      } else if (deltaX > 100) {
        const success = x - this.startPosition.x > 0
        this.setStatus(success)
      } else {
        this.animationEnds = true
        this.startPosition = null
        this.currentPosition = null
      }
    },
    landOutside(success) {
      const { left, width } = this.$refs.card.$el.parentElement.getBoundingClientRect()
      const landingX = success ? window.innerWidth : -width
      const newX = landingX - left
      if (this.currentPosition) {
        this.currentPosition.y =
          (this.currentPosition.y - this.startPosition.y) * (newX / (this.currentPosition.x - this.startPosition.x))
        this.currentPosition.x = newX
      } else {
        this.currentPosition = { x: newX, y: 0 }
      }
      this.startPosition = null
      this.animationEnds = true
    },
  },
}
</script>

<style></style>
