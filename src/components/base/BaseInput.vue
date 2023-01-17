<template>
  <div :class="['relative flex items-center', { 'text-red-400': errorMessage }]">
    <slot name="left">
      <BaseIcon v-if="leftIcon" :name="leftIcon" class="absolute left-1" />
    </slot>
    <input
      :value="value"
      v-bind="$attrs"
      :class="[
        'w-full text-inherit placeholder:text-inherit py-1 pr-8 focus:outline-none',
        hasLeftContent ? 'pl-8' : 'pl-1',
        hasRightContent ? 'pr-8' : 'pr-1',
      ]"
      v-on="inputListeners"
      @keyup.enter="$emit('enter')"
    />
    <slot name="right">
      <BaseIcon v-if="rightIcon" :name="rightIcon" class="absolute right-2" />
      <BaseIcon
        v-if="!rightIcon && errorMessage"
        :title="errorMessage"
        name="error"
        class="absolute right-2 text-base cursor-pointer"
      />
    </slot>
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
    leftIcon: {
      type: String,
      default: '',
    },
    rightIcon: {
      type: String,
      default: '',
    },
  },
  computed: {
    hasLeftContent() {
      return this.leftIcon || this.$slots.left
    },
    hasRightContent() {
      return this.rightIcon || this.errorMessage || this.$slots.right
    },
    inputListeners() {
      return {
        ...this.$listeners,
        input: (event) => {
          this.$emit('input', event.target.value)
        },
      }
    },
  },
}
</script>

<style lang="postcss" scoped></style>
