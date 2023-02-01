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
import { cloneDeep, groupBy, uniq } from 'lodash-es'
import { get } from 'vuex-pathify'

import FilterPanel from './filter/FilterPanel.vue'
import { voiceText } from '../../api/utilities/speech'
import { schema, sortOptions, status, datePeriods, dateRangeSchema } from '../../api/types/filter'
import { toLocaleTime } from '../../api/utilities/date'

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
      const { authors, labels, categories, status, date } = this.config.filters || {}
      const startDate = date.range?.start ? new Date(date.range.start) : null
      const endDate = date.range?.end ? new Date(date.range.end) : null
      return this.getMapped.filter(
        (expression) =>
          (!authors?.length || authors.some((id) => expression.authors.includes(id))) &&
          (!labels?.length || labels.some((label) => expression.labels.includes(label))) &&
          (!categories?.length || categories.some((category) => expression.statistic[category])) &&
          (!status || expression.status === status) &&
          (!startDate || (expression.date >= startDate && expression.date <= endDate))
      )
    },
    getMapped() {
      const { categories } = this.config.filters || {}
      return this.getExpressions.map((expression) => {
        let statistic = Object.keys(expression.statistic).map((key) => ({ key, rate: expression.statistic[key].rate }))
        statistic = categories.length ? statistic.filter((item) => statistic.includes(item.key)) : statistic

        return {
          ...expression,
          authors: this.getAuthors(expression),
          date: toLocaleTime(expression.history[expression.history.length - 1].date),
          status: statistic.every(({ rate }) => !rate) ? status.LEARNED : status.STUDIED,
        }
      })
    },
    currentUser: get('users/user', false),
    getExpressions: get('expressions/collection', false),
  },
  created() {
    const config = schema(this.currentUser.configs?.dictionary ?? {})
    this.config = cloneDeep(config)

    if (this.config.filters.date.period) {
      const selectedPeriod = datePeriods.find(({ key }) => key === this.period)
      this.config.filters.date.range = dateRangeSchema({ start: selectedPeriod.getStartDate(), end: new Date() })
    }
  },
  methods: {
    getAuthors(expression) {
      const authors = expression.history.map(({ authorId }) => authorId)
      return uniq(authors).map((id) => id || this.currentUser._id)
    },
    voiceText,
  },
}
</script>

<style></style>
