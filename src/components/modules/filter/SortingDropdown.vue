<template>
  <va-dropdown
    :close-on-content-click="false"
    :offset="[4, 0]"
    placement="bottom-start"
    color="primary"
    preset="plain"
    hide-icon
  >
    <template #anchor>
      <va-icon name="sort" color="primary" />
    </template>
    <va-dropdown-content class="w-52 py-1 px-0 cursor-auto">
      <p class="pt-1 px-2 text-center font-semibold text-xs">Sort by</p>
      <div
        v-for="option in sortOptions"
        :key="option.key"
        :class="{ 'text-blue-700': option.selected }"
        class="flex items-center gap-2 p-2 cursor-pointer my-1 hover:bg-blue-200"
        @click="sort(option)"
      >
        <va-icon :name="option.asc ? 'south' : 'north'" :color="option.asc ? 'success' : 'danger'" size="small" />
        {{ option.label }}
        <va-icon v-if="option.selected" name="check" size="small" class="ml-auto" />
      </div>
    </va-dropdown-content>
  </va-dropdown>
</template>

<script>
import { sortOptions, MAX_SORT_OPTIONS } from '../../../api/types/filter'

export default {
  name: 'SortingDropdown',
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    sortOptions() {
      return sortOptions.map((option) => ({
        ...option,
        selected: this.modelValue.includes(option.key),
      }))
    },
  },
  methods: {
    sort({ key, selected, connectionKey }) {
      let newValue = this.modelValue.filter((option) => option !== key && option !== connectionKey)
      if (!selected) {
        if (newValue.length === MAX_SORT_OPTIONS) {
          newValue = newValue.slice(1)
        }
        newValue = [...newValue, key]
      }
      this.updateValue(newValue)
    },
    updateValue(newValue) {
      this.$emit('update:modelValue', newValue)
    },
  },
}
</script>

<style></style>
