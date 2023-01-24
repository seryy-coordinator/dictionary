<template>
  <div class="border-b border-gray-100 bg-gray-100 flex px-2 h-8">
    <va-button-dropdown color="secondary" preset="plain" hide-icon>
      <template #label>
        <va-icon name="settings" />
      </template>
      Content
    </va-button-dropdown>
    <va-button-dropdown color="secondary" preset="plain" hide-icon class="ml-auto">
      <template #label>
        <va-icon name="tune" />
      </template>
      Content
    </va-button-dropdown>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: 'FilterPanel',
  computed: {
    ...get('expressions', { getExpressions: 'collection' }, false),
  },
}
</script>

<style></style>
