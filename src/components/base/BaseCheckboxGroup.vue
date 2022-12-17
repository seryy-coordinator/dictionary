<template>
  <div class="flex items-center gap-1">
    <div v-if="label" class="mr-1 font-medium text-sm">{{ label }}:</div>
    <span v-if="icon" class="mr-1 material-icons">{{ icon }}</span>
    <div
      v-for="option in getOptions"
      :key="option.value"
      :class="
        value.includes(option.value)
          ? 'bg-blue-400 text-white border-blue-500'
          : 'bg-gray-300 hover:bg-gray-400 opacity-20 border-transparent'
      "
      class="flex flex-col items-center p-1 cursor-pointer font-bold border checkbox-group-option"
      @click="select(option)"
    >
      <span v-if="option.icon" class="material-icons font-size-40">{{ option.icon }}</span>
      <img
        v-else-if="option.image"
        :src="option.image"
        :alt="option.label || option.value"
        :class="{ 'filter-white': value.includes(option.value) }"
        class="w-12 h-12"
      />
      <span v-if="option.label"> {{ option.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCheckboxGroup',
  props: {
    value: {
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
  },
  computed: {
    getOptions() {
      return this.options.map((option) => ({
        ...option,
        image: option.image && require(`@/assets/images/${option.image}`),
      }))
    },
  },
  methods: {
    select(option) {
      const value = this.value.includes(option.value)
        ? this.value.filter((key) => key !== option.value)
        : [...this.value, option.value]
      this.$emit('input', value)
    },
  },
}
</script>

<style>
.font-size-40 {
  font-size: 40px !important;
}
.filter-white {
  filter: invert(100%) sepia(4%) saturate(0%) hue-rotate(263deg) brightness(103%) contrast(106%);
}
</style>
