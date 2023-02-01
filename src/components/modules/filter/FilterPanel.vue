<template>
  <div class="border-b border-gray-100 bg-gray-100 flex items-center gap-2 px-2 h-8">
    <SortingDropdown v-model="value.sorting" @update:modelValue="updateValue()" />
    <GroupingDropdown v-model="value.grouping" @update:modelValue="updateValue()" />
    <FiltrationDropdown v-model="value.filters" :collection="collection" @update:modelValue="updateValue()" />
    <va-divider vertical class="self-stretch" />
    <div class="flex items-center gap-1 overflow-x-auto scrollbar-w-none">
      <va-chip
        v-for="option in selectedSortOptions"
        :key="option.key"
        :icon="option.asc ? 'south' : 'north'"
        color="primary"
        size="small"
        square
        closeable
        class="shrink-0"
        @update:modelValue="updateSorting(option)"
      >
        {{ option.label }}
      </va-chip>
      <va-chip
        v-if="selectedGroupOption"
        color="info"
        icon="workspaces_filled"
        size="small"
        square
        closeable
        class="shrink-0"
        @update:modelValue="updateGrouping()"
      >
        {{ selectedGroupOption.label }}
      </va-chip>
      <va-chip
        v-for="option in selectedAuthors"
        :key="option._id"
        color="secondary"
        icon="face"
        size="small"
        square
        closeable
        class="shrink-0"
        @update:modelValue="updateFilters('authors', option._id)"
      >
        {{ option.name }}
      </va-chip>
      <va-chip
        v-for="option in value.filters.labels"
        :key="option"
        color="secondary"
        icon="folder"
        size="small"
        square
        closeable
        class="shrink-0"
        @update:modelValue="updateFilters('labels', option)"
      >
        {{ option }}
      </va-chip>
      <va-chip
        v-for="option in selectedCategories"
        :key="option.value"
        color="secondary"
        icon="grid_view"
        size="small"
        square
        closeable
        class="shrink-0"
        @update:modelValue="updateFilters('categories', option.value)"
      >
        {{ option.label }}
      </va-chip>
      <va-chip
        v-if="selectedStatus"
        color="secondary"
        icon="flaky"
        size="small"
        square
        closeable
        class="shrink-0"
        @update:modelValue="updateFilters('status')"
      >
        {{ selectedStatus.label }}
      </va-chip>
      <va-chip
        v-if="selectedDateRange"
        color="secondary"
        icon="date_range"
        size="small"
        square
        closeable
        class="shrink-0"
        @update:modelValue="updateDate()"
      >
        {{ selectedDateRange }}
      </va-chip>
    </div>
    <va-divider vertical class="ml-auto self-stretch" />
    <SettingsDropdown
      v-model:transcriptionShown="value.transcriptionShown"
      v-model:filterSavingEnabled="value.filterSavingEnabled"
      @update="updateValue()"
    />
  </div>
</template>

<script>
import { cloneDeep, uniq } from 'lodash-es'
import { get } from 'vuex-pathify'

import SettingsDropdown from './SettingsDropdown.vue'
import SortingDropdown from './SortingDropdown.vue'
import GroupingDropdown from './GroupingDropdown.vue'
import FiltrationDropdown from './FiltrationDropdown.vue'
import { sortOptions, groupOptions, statuses, datePeriods, dateSchema } from '../../../api/types/filter'
import { dictionaryCategories } from '../../../api/types/category'

export default {
  name: 'FilterPanel',
  components: {
    SettingsDropdown,
    SortingDropdown,
    GroupingDropdown,
    FiltrationDropdown,
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    collection: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  data: () => ({
    value: {},
  }),
  computed: {
    selectedSortOptions() {
      return this.value.sorting.map((key) => sortOptions.find((option) => option.key === key))
    },
    selectedGroupOption() {
      return groupOptions.find(({ key }) => key === this.value.grouping)
    },
    selectedAuthors() {
      return this.getAuthors.filter(({ _id }) => this.value.filters?.authors.includes(_id))
    },
    selectedStatus() {
      return statuses.find(({ key }) => key === this.value.filters?.status)
    },
    selectedCategories() {
      return dictionaryCategories.filter(({ value }) => this.value.filters?.categories.includes(value))
    },
    selectedDateRange() {
      if (this.value.filters?.date.period) {
        return datePeriods.find(({ key }) => key === this.value.filters?.date.period).label
      }
      if (this.value.filters?.date.range?.start) {
        return `${this.value.filters?.date.range?.start} - ${this.value.filters?.date.range?.end}`
      }
      return ''
    },
    getAuthors() {
      const authors = this.collection.flatMap(({ history }) => history.map(({ authorId }) => authorId))
      return uniq(authors).map((id) =>
        id ? this.teachers.find(({ _id }) => _id === id) : { ...this.currentUser, name: 'Me' }
      )
    },
    currentUser: get('users/user', false),
    teachers: get('users/teachers', false),
  },
  watch: {
    modelValue: {
      handler(newValue) {
        this.value = cloneDeep(newValue)
      },
      immediate: true,
    },
  },
  methods: {
    updateSorting({ key }) {
      this.value.sorting = this.value.sorting.filter((option) => option !== key)
      this.updateValue()
    },
    updateGrouping() {
      this.value.grouping = null
      this.updateValue()
    },
    updateFilters(key, option) {
      const selected = this.value.filters[key]
      if (option) {
        this.value.filters[key] = selected.filter((item) => item !== option)
      } else {
        this.value.filters[key] = null
      }
      this.updateValue()
    },
    updateDate() {
      this.value.filters.date = dateSchema()
      this.updateValue()
    },
    updateValue() {
      this.$emit('update:modelValue', this.value)
    },
  },
}
</script>

<style>
.scrollbar-w-none {
  scrollbar-width: none;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-w-none::-webkit-scrollbar {
  display: none;
}
</style>
