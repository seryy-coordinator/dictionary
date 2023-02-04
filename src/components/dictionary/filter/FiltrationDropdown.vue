<template>
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
    <va-dropdown-content class="cursor-auto">
      <p class="mb-2 pt-1 px-2 text-center font-semibold text-xs">Filter by</p>
      <div class="grid grid-cols-2 gap-3">
        <va-select
          v-show="getAuthors.length > 1"
          v-model="value.authors"
          :options="getAuthors"
          :max-visible-options="1"
          label="Author"
          multiple
          clearable
          text-by="name"
          value-by="_id"
          @update:modelValue="updateValue()"
        />
        <va-select
          v-show="getLabels.length > 1"
          v-model="value.labels"
          :options="getLabels"
          :max-visible-options="1"
          label="Folder"
          multiple
          clearable
          @update:modelValue="updateValue()"
        />
        <va-select
          v-show="getCategories.length > 1"
          v-model="value.categories"
          :options="getCategories"
          :max-visible-options="1"
          label="Category"
          multiple
          clearable
          text-by="label"
          value-by="value"
          @update:modelValue="updateValue()"
        />
        <va-select
          v-model="value.status"
          :options="statuses"
          label="Status"
          clearable
          text-by="label"
          value-by="key"
          @update:modelValue="updateValue()"
        />
        <base-date-range v-model="value.date" class="col-span-2" @update:modelValue="updateValue()" />
      </div>
    </va-dropdown-content>
  </va-dropdown>
</template>

<script>
import { cloneDeep, uniq } from 'lodash-es'
import { get } from 'vuex-pathify'

import { statuses } from '../../../api/types/filter'
import { dictionaryCategories } from '../../../api/types/category'

export default {
  name: 'FiltrationDropdown',
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
    statuses,
  }),
  computed: {
    getAuthors() {
      const authors = this.collection.flatMap(({ history }) => history.map(({ author }) => author))
      return uniq(authors).map((id) =>
        id ? this.teachers.find(({ _id }) => _id === id) : { ...this.currentUser, name: 'Me' }
      )
    },
    getLabels() {
      const labels = this.collection.flatMap(({ labels }) => labels)
      return uniq(labels)
    },
    getCategories() {
      const categories = this.collection.flatMap(({ statistic }) => Object.keys(statistic))
      return uniq(categories).map((val) => dictionaryCategories.find(({ key }) => key === val))
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
    updateValue() {
      this.$emit('update:modelValue', this.value)
    },
  },
}
</script>

<style></style>
