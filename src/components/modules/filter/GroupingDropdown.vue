<template>
  <va-dropdown
    :close-on-content-click="false"
    :offset="[4, 0]"
    placement="bottom-start"
    color="info"
    preset="plain"
    hide-icon
  >
    <template #anchor>
      <va-icon name="workspaces_filled" color="info" />
    </template>
    <va-dropdown-content class="w-28 py-1 px-0 cursor-auto">
      <p class="pt-1 px-2 text-center font-semibold text-xs">Group by</p>
      <div
        v-for="option in groupOptions"
        :key="option.key"
        :class="{ 'text-blue-700': modelValue === option.key }"
        class="flex items-center justify-between gap-2 p-2 cursor-pointer my-1 hover:bg-blue-200"
        @click="group(option)"
      >
        {{ option.label }}
        <va-icon v-if="modelValue === option.key" name="check" size="small" />
      </div>
    </va-dropdown-content>
  </va-dropdown>
</template>

<script>
import { groupOptions } from '../../../api/types/filter'

export default {
  name: 'FilterPanelGrouping',
  props: {
    modelValue: {
      type: Number,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  data: () => ({
    groupOptions,
  }),
  methods: {
    group({ key }) {
      const newValue = this.modelValue === key ? null : key
      this.updateValue(newValue)
    },
    updateValue(newValue) {
      this.$emit('update:modelValue', newValue)
    },
  },
}
</script>

<style></style>
