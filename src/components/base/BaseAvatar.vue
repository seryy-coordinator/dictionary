<template>
  <va-avatar :src="src" :size="size">
    <template v-if="name">{{ getInitials }}</template>
  </va-avatar>
</template>

<script>
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
  },
}
</script>

<style></style>
