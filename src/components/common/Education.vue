<template>
  <div class="mt-1 border-t border-b border-gray-100 bg-gray-50 flex justify-end px-2 h-5">
    <va-button color="info" preset="plainOpacity" icon="help" size="small" @click="showEducation()" />
  </div>
</template>

<script>
export default {
  name: 'Education',
  props: {
    hints: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    showEducation() {
      // TODO: will be implemented later
    },
  },
}
</script>
