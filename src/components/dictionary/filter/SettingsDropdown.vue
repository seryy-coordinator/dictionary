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
      <hr class="my-2 border-gray-100" />
      <va-button icon-right="volume_up" class="flex ml-auto" size="small" @click="updateVoices()">
        Change voices
      </va-button>
    </va-dropdown-content>
  </va-dropdown>
</template>

<script>
import { initializeUtterances } from '../../../api/utilities/speech'

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
  methods: {
    updateVoices() {
      initializeUtterances()
      this.$vaToast.init({
        message: 'Voices updated!',
        position: 'bottom-right',
        offsetX: 30,
        offsetY: 40,
        duration: 3000,
        color: 'success',
      })
    },
  },
}
</script>

<style></style>
