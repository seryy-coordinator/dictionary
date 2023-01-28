<template>
  <va-checkbox :class="getSizeClass" />
</template>

<script>
export default {
  name: 'BaseCheckbox',
  props: {
    size: {
      type: String,
      default: '',
    },
  },
  computed: {
    getSizeClass() {
      return this.size ? `va-checkbox--${this.size}` : ''
    },
  },
}
</script>

<style>
.va-checkbox--small .va-checkbox__square {
  min-width: 1rem;
  width: 1rem;
  height: 1rem;
}

.va-checkbox--small .va-checkbox__icon {
  font-size: 0.88rem !important;
}

.va-checkbox--small .va-checkbox__label {
  padding-left: 0.3rem !important;
  font-size: 0.8rem;
}
</style>
