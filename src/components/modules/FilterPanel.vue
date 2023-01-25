<template>
  <div class="border-b border-gray-100 bg-gray-100 flex items-center gap-2 px-2 h-8">
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
      <va-dropdown-content class="py-1 px-0 cursor-auto">
        <p class="pt-1 px-2 text-center font-semibold text-xs">Sort by</p>
        <div
          v-for="option in sortOptions"
          :key="option.key"
          :class="{ 'bg-blue-50': option.selected }"
          class="flex items-center gap-1 p-1 cursor-pointer my-1 hover:bg-gray-50"
          @click="sort(option)"
        >
          <div class="h-6 w-6">
            <va-icon v-if="option.selected" name="check" color="success" />
          </div>
          {{ option.label }}
          <va-icon :name="option.asc ? 'south' : 'north'" :color="option.asc ? 'success' : 'danger'" class="ml-auto" />
        </div>
      </va-dropdown-content>
    </va-dropdown>
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
      <va-dropdown-content class="w-24 py-1 px-0 cursor-auto">
        <p class="pt-1 px-2 text-center font-semibold text-xs">Group by</p>
        <div
          v-for="option in groupOptions"
          :key="option.key"
          :class="{ 'bg-blue-50': grouping === option.key }"
          class="flex items-center gap-1 p-1 cursor-pointer my-1 hover:bg-gray-50"
          @click="group(option)"
        >
          <div class="h-6 w-6">
            <va-icon v-if="grouping === option.key" name="check" color="success" />
          </div>
          {{ option.label }}
        </div>
      </va-dropdown-content>
    </va-dropdown>
    <va-dropdown
      :close-on-content-click="false"
      :offset="[4, 0]"
      placement="bottom-start"
      color="secondary"
      preset="plain"
      hide-icon
    >
      <template #anchor>
        <va-icon name="tune" color="secondary" />
      </template>
      <va-dropdown-content class="cursor-auto">Content </va-dropdown-content>
    </va-dropdown>
    <va-divider vertical class="self-stretch" />
    <div class="flex items-center gap-1 overflow-hidden">
      <va-chip
        v-for="option in selectedSortOptions"
        :key="option.key"
        :icon="option.asc ? 'south' : 'north'"
        color="primary"
        size="small"
        square
        closeable
        @update:modelValue="sort(option)"
      >
        {{ option.label }}
      </va-chip>
      <va-chip
        v-if="selectedGroupOption"
        color="info"
        size="small"
        square
        closeable
        @update:modelValue="grouping = null"
      >
        {{ selectedGroupOption.label }}
      </va-chip>
    </div>
    <va-divider vertical class="ml-auto self-stretch" />
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
        <va-checkbox v-model="transcriptionShown" label="Show transcription" />
        <hr class="my-2 border-gray-100" />
        <va-checkbox v-model="filterSavingEnabled" label="Enable filter saving" />
      </va-dropdown-content>
    </va-dropdown>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'
import { sortOptions, MAX_SORT_OPTIONS, groupOptions } from '../../api/types/filter'

export default {
  name: 'FilterPanel',
  data: () => ({
    transcriptionShown: false,
    filterSavingEnabled: false,
    sorting: [],
    grouping: null,
    groupOptions,
  }),
  computed: {
    sortOptions() {
      return sortOptions.map((option) => ({
        ...option,
        selected: this.sorting.includes(option.key),
      }))
    },
    selectedSortOptions() {
      return this.sortOptions.filter(({ selected }) => selected)
    },
    selectedGroupOption() {
      return this.groupOptions.find(({ key }) => key === this.grouping)
    },
    getExpressions: get('expressions/collection', false),
    currentUser: get('users/user', false),
  },
  methods: {
    sort({ key, selected }) {
      if (selected) {
        this.sorting = this.sorting.filter((option) => option !== key)
        return
      }
      if (this.sorting.length === MAX_SORT_OPTIONS) {
        this.sorting.shift()
      }
      this.sorting.push(key)
    },
    group({ key }) {
      this.grouping = this.grouping === key ? null : key
    },
  },
}
</script>

<style></style>
