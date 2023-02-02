<template>
  <div class="flex items-center gap-1">
    <div v-if="label" class="mr-1 font-medium text-sm">{{ label }}:</div>
    <span v-if="icon" class="mr-1 material-icons">{{ icon }}</span>
    <div
      v-for="option in getOptions"
      :key="option.key"
      :class="[
        optionClasses,
        modelValue.includes(option.key)
          ? 'bg-blue-400 text-white border-blue-500'
          : 'bg-gray-300 hover:bg-gray-400 opacity-20 border-transparent',
      ]"
      class="flex flex-col items-center p-1 cursor-pointer font-bold border"
      @click="select(option)"
    >
      <span v-if="option.icon" :class="getIconStyles" class="material-icons">{{ option.icon }}</span>
      <img
        v-else-if="option.image"
        :src="option.image"
        :alt="option.label || option.key"
        :class="[getImageClasses, { 'filter-white': modelValue.includes(option.key) }]"
      />
      <span v-if="option.label" :class="labelClasses"> {{ option.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCheckboxGroup',
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'md',
    },
  },
  emits: ['update:modelValue'],
  computed: {
    getOptions() {
      return this.options.map((option) => ({
        ...option,
        image: option.image && require(`@/assets/images/${option.image}`),
      }))
    },
    getIconStyles() {
      switch (this.size) {
        case 'sm':
          return 'font-size: 24px;'
        case 'lg':
          return 'font-size: 40px'
        case 'md':
        default:
          return 'font-size: 32px'
      }
    },
    getImageClasses() {
      switch (this.size) {
        case 'sm':
          return 'w-12 h-12'
        case 'lg':
          return 'w-9 h-9'
        case 'md':
        default:
          return 'w-6 h-6'
      }
    },
    labelClasses() {
      switch (this.size) {
        case 'sm':
          return 'sm:text-xs text-[11px]'
        case 'lg':
          return 'text-base'
        case 'md':
        default:
          return 'text-sm'
      }
    },
    optionClasses() {
      switch (this.size) {
        case 'sm':
          return 'sm:w-24 w-20'
        case 'lg':
          return 'w-32'
        case 'md':
        default:
          return 'w-28'
      }
    },
  },
  methods: {
    select(option) {
      const value = this.modelValue.includes(option.key)
        ? this.modelValue.filter((key) => key !== option.key)
        : [...this.modelValue, option.key]
      this.$emit('update:modelValue', value)
    },
  },
}
</script>

<style>
.filter-white {
  filter: invert(100%) sepia(4%) saturate(0%) hue-rotate(263deg) brightness(103%) contrast(106%);
}
</style>
