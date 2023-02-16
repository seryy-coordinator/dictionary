<template>
  <va-avatar :src="src" :size="getSize" :color="getAvatarColor" :class="{ [`va-avatar--${size}`]: size }">
    <template v-if="name">{{ getInitials }}</template>
  </va-avatar>
</template>

<script>
import { getAvatarColor } from '../../api/utilities'

export default {
  name: 'BaseAvatar',
  props: {
    size: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  computed: {
    getInitials() {
      const getName = this.name.trim().split(' ')
      const initials = getName.reduce((acc, cur, index) => {
        if (index === 0 || index === getName.length - 1) {
          acc = `${acc}${cur.charAt(0).toUpperCase()}`
        }
        return acc
      }, '')
      return initials
    },
    getSize() {
      return this.size === 'tiny' || this.size === 'huge' ? '' : this.size
    },
    getAvatarColor() {
      return getAvatarColor(this.name)
    },
  },
}
</script>

<style>
.va-avatar.va-avatar--tiny {
  font-size: 0.55rem !important;
  width: 1.2rem !important;
  min-width: 1.2rem !important;
  height: 1.2rem !important;
}
.va-avatar.va-avatar--huge {
  font-size: 3rem !important;
  width: 3rem !important;
  min-width: 6.5rem !important;
  height: 6.5rem !important;
}
</style>
