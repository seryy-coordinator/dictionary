<template>
  <aside>
    <div
      v-if="src && imageLocated"
      class="flex items-center justify-center bg-cover"
      :style="{ width: getSize, height: getSize }"
    >
      <img @error="onImageLoadFailure($event)" class="h-full rounded-full" :src="src" />
    </div>
    <div
      v-else
      class="flex items-center justify-center rounded-full bg-blue-500 text-white"
      :style="{ width: getSize, height: getSize }"
    >
      <p :class="`text-[${textSize}]`">{{ getInitials }}</p>
    </div>
  </aside>
</template>

<script>
const sizes = { sm: '24px', default: '40px', lg: '64px' }
const textSizes = { sm: '16px', default: '20px', lg: '24px' }

export default {
  name: 'GumAvatar',
  props: {
    size: {
      type: String,
      validator(value) {
        return Object.keys(sizes).includes(value)
      },
      default: 'default',
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
  data: () => ({
    imageLocated: true,
  }),
  computed: {
    getSize() {
      return sizes[this.size]
    },
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
    textSize() {
      return textSizes[this.size]
    },
  },
  methods: {
    onImageLoadFailure() {
      this.imageLocated = false
    },
  },
}
</script>

<style></style>
