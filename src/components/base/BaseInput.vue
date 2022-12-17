<template>
  <div :class="['relative flex items-center py-2', { 'text-red-400': errorMessage }]">
    <BaseIcon v-if="icon" :name="icon" class="absolute" />
    <input
      v-model="modelValue"
      v-bind="$attrs"
      :class="['w-full text-inherit placeholder:text-inherit py-1 pr-5 focus:outline-none', icon ? 'pl-8' : 'pl-1']"
      @keyup.enter="$emit('enter')"
    />
    <BaseIcon
      v-if="errorMessage"
      :title="errorMessage"
      name="error"
      class="absolute right-0 text-base cursor-pointer"
    />
  </div>
</template>

<script>
import BaseIcon from './BaseIcon.vue'

export default {
  name: 'BaseInput',
  inheritAttrs: false,
  components: {
    BaseIcon,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  },
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>

<style lang="postcss" scoped></style>
