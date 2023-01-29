<template>
  <div>
    <FilterPanel v-model="config" :collection="getExpressions" />
    <ul class="py-2 px-8">
      <li v-for="(group, key) in getGrouped" :key="key">
        <ul>
          <li
            v-for="expression in group"
            :key="expression._id"
            class="flex items-center my-1 p-1 gap-1 hover:bg-gray-50"
          >
            <strong class="font-medium">{{ expression.target }}</strong>
            <va-button
              color="info"
              preset="plain"
              icon="volume_up"
              size="small"
              @click="voiceText(expression.target)"
            />
            <span class="mx-1">-</span>
            <span class="text-gray-600">{{ expression.translate }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!-- <va-divider orientation="center">
          <span class="px-2">January</span>
        </va-divider> -->
  </div>
</template>

<script>
import { cloneDeep, groupBy } from 'lodash-es'
import { get } from 'vuex-pathify'

import FilterPanel from './filter/FilterPanel.vue'
import { voiceText } from '../../api/utilities/speech'
import { schema, sortOptions } from '../../api/types/filter'

export default {
  name: 'ExpressionList',
  components: {
    FilterPanel,
  },
  data: () => ({
    config: null,
  }),
  computed: {
    getGrouped() {
      const grouping = this.config.grouping || ''
      return groupBy(this.getSorted, grouping)
    },
    getSorted() {
      return this.config.sorting
        ? this.config.sorting.reduce(
            (acc, key) => {
              const { iteratee } = sortOptions.find((option) => option.key === key)
              return acc.sort(iteratee)
            },
            [...this.getFiltered]
          )
        : this.getFiltered
    },
    getFiltered() {
      // TODO: will implement later
      return this.getExpressionsWithHistory
    },
    getExpressionsWithHistory() {
      return this.config.grouping
        ? this.getExpressions.flatMap((expression) => expression.history.map((item) => ({ ...expression, ...item })))
        : this.getExpressions
    },
    currentUser: get('users/user', false),
    getExpressions: get('expressions/collection', false),
  },
  created() {
    const config = schema(this.currentUser.configs?.dictionary ?? {})
    this.config = cloneDeep(config)
  },
  methods: {
    voiceText,
  },
}
</script>

<style></style>
