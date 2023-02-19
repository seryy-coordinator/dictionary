<template>
  <va-button
    :size="size"
    color="info"
    preset="plain"
    icon="volume_up"
    class="va-button--thin"
    @mousedown.stop
    @touchstart.stop
    @click="voiceText()"
  />
</template>

<script>
import { voiceEnText, voiceRuText } from '../../api/utilities/speech'

export default {
  name: 'VoiceButton',
  props: {
    expression: {
      type: Object,
      required: true,
    },
    locale: {
      type: String,
      default: 'en',
    },
    size: {
      type: String,
      default: 'small',
    },
  },
  methods: {
    voiceText() {
      if (this.locale === 'en') {
        voiceEnText(this.expression.target)
      } else if (this.locale === 'ru') {
        voiceRuText(this.expression.translate)
      }
    },
  },
}
</script>

<style>
.va-button--thin .va-button__content {
  padding: 0 !important;
}
</style>
