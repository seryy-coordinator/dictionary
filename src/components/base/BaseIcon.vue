<template>
  <span class="select-none material-icons pointer-events-none">
    <slot>{{ name }}</slot>
  </span>
</template>

<script>
export default {
  name: 'BaseIcon',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="postcss" scoped></style>
