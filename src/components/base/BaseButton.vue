<template>
  <component
    :is="getTag"
    :class="[getTheme, { 'opacity-40 cursor-default': $attrs.disabled }]"
    class="inline-flex items-center font-bold gap-1"
    v-bind="getAttributes"
    @click="onClick()"
  >
    <div v-if="loading" class="inline-flex items-center">
      <svg class="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="text-gray-50" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path
          class="text-gray-500"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
    <BaseIcon v-if="icon" :name="icon" />
    <slot>{{ text }}</slot>
  </component>
</template>

<script>
import BaseIcon from './BaseIcon.vue'

export default {
  name: 'BaseButton',
  inheritAttrs: false,
  components: {
    BaseIcon,
  },
  props: {
    text: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    route: {
      type: String,
      default: '',
    },
  },
  computed: {
    getTheme() {
      switch (this.theme) {
        case 'primary':
        default:
          return 'text-white bg-blue-500 hover:bg-blue-600 rounded py-1 px-2'
        case 'link':
          return 'text-blue-500 hover:text-blue-600 rounded py-1 px-2'
        case 'reverse':
          return 'text-gray-300 bg-gray-600 hover:bg-gray-200 hover:text-gray-700 rounded py-1 px-2'
        case 'gray':
          return 'bg-gray-200 border border-gray-300 text-gray-700 hover:bg-gray-300 hover:border-gray-400 rounded py-1 px-2'
        case 'simple':
          return ''
      }
    },
    isExternalLink() {
      return this.route.includes('http')
    },
    getTag() {
      if (!this.route) {
        return 'button'
      } else if (this.isExternalLink) {
        return 'a'
      }
      return 'router-link'
    },
    getAttributes() {
      const attributes = this.isExternalLink ? { href: this.route } : { to: this.route }
      return {
        ...this.$attrs,
        ...attributes,
      }
    },
  },
  methods: {
    onClick() {
      if (!this.route) {
        this.$emit('click')
      }
    },
  },
}
</script>

<style></style>
