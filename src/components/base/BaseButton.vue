<template>
  <component
    :is="getTag"
    :class="[getTheme, { 'opacity-40 cursor-default': $attrs.disabled, rounded: rounded }]"
    class="inline-flex items-center font-bold gap-1"
    v-bind="getAttributes"
    @click="onClick()"
  >
    <BaseLoading v-if="loading" />
    <BaseIcon v-if="icon" :name="icon" />
    <slot>{{ text }}</slot>
  </component>
</template>

<script>
import BaseIcon from './BaseIcon.vue'
import BaseLoading from './BaseLoading.vue'

export default {
  name: 'BaseButton',
  inheritAttrs: false,
  components: {
    BaseIcon,
    BaseLoading,
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
    rounded: {
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
          return 'text-white bg-blue-500 hover:bg-blue-600 py-1 px-2'
        case 'link':
          return 'text-blue-500 hover:text-blue-600 py-1 px-2'
        case 'reverse':
          return 'text-gray-300 bg-gray-600 hover:bg-gray-200 hover:text-gray-700 py-1 px-2'
        case 'gray':
          return 'bg-gray-200 border border-gray-300 text-gray-700 hover:bg-gray-300 hover:border-gray-400 py-1 px-2'
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
