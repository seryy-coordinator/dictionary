<template>
  <span class="base-icon select-none material-icons pointer-events-none">
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

<style>
.base-icon.material-icons {
  font-size: inherit;
}
</style>
