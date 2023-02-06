<template>
  <va-button color="info" preset="plain" icon="volume_up" :size="size" @click="voiceText()" />
</template>

<script>
import { voiceEnText } from '../../api/utilities/speech'

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
      }
    },
  },
}
</script>
