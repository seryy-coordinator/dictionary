<template>
  <va-dropdown
    :close-on-content-click="false"
    :offset="[4, 0]"
    placement="bottom-end"
    color="secondary"
    preset="plain"
    hide-icon
  >
    <template #anchor>
      <va-icon name="settings" />
    </template>
    <va-dropdown-content class="cursor-auto">
      <va-checkbox
        :model-value="transcriptionShown"
        label="Show transcription"
        @update:modelValue="$emit('update:transcriptionShown', $event), $emit('update')"
      />
      <hr class="my-2 border-gray-100" />
      <va-checkbox
        :model-value="filterSavingEnabled"
        label="Enable filter saving"
        @update:modelValue="$emit('update:filterSavingEnabled', $event), $emit('update')"
      />
    </va-dropdown-content>
  </va-dropdown>
</template>

<script>
export default {
  name: 'SettingsDropdown',
  props: {
    transcriptionShown: {
      type: Boolean,
      required: true,
    },
    filterSavingEnabled: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:transcriptionShown', 'update:filterSavingEnabled', 'update'],
}
</script>

<style></style>
