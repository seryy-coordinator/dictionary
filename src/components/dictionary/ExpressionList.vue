<template>
  <div>
    <FilterPanel v-model="config" :collection="getExpressions" @update:modelValue="saveConfig()" />
    <ul class="py-2 px-8">
      <li v-for="[key, group] in getGrouped" :key="key">
        <va-divider v-if="key" orientation="center">
          <span class="px-2">{{ key }}</span>
        </va-divider>
        <ul>
          <li
            v-for="expression in group"
            :key="expression._id"
            class="flex items-center my-1 p-2 gap-1 bg-gray-50 hover:bg-gray-100"
          >
            <div :class="{ 'opacity-40': expression.notImportant }" class="flex items gap-1">
              <strong class="font-medium">{{ expression.target }}</strong>
              <span v-show="config.transcriptionShown && expression.transcription" class="text-gray-600">
                [{{ expression.transcription }}]
              </span>
              <voice-button :expression="expression" />
              <span class="mx-1">-</span>
              <span class="text-gray-600">{{ expression.translate }}</span>
            </div>
            <div class="ml-auto text-[10px] text-black text-right">
              <div class="flex items-center gap-1 justify-end">
                <div v-if="!expression.isPersonal" class="relative z-0">
                  <base-avatar
                    v-for="(author, index) in expression.authors"
                    :key="author._id"
                    :src="author.picture"
                    :name="author.name"
                    size="tiny"
                    class="mr-1 hover:z-10 relative"
                    :style="`left:${-10 * index}px`"
                  />
                </div>
                <div class="w-16 ml-auto">
                  <template v-for="{ structure, rate } in expression.categories">
                    <va-icon
                      v-if="rate"
                      :key="structure.key"
                      :name="structure.icon"
                      size="small"
                      class="text-gray-500"
                    />
                  </template>
                </div>
              </div>
              <div class="flex items-center gap-1">
                <p v-for="label in expression.labels" :key="label" class="bg-blue-100 rounded-sm">{{ label }}</p>
              </div>
            </div>
            <va-button
              icon="delete_forever"
              size="small"
              color="danger"
              preset="plainOpacity"
              @click="openConfirmModal(expression)"
            />
          </li>
        </ul>
      </li>
    </ul>
    <va-modal ref="modal" stateful message="Are you sure?" title="Expression removing" @ok="remove()" />
  </div>
</template>

<script>
import { cloneDeep, groupBy } from 'lodash-es'
import { call, get } from 'vuex-pathify'

import FilterPanel from './filter/FilterPanel.vue'
import { schema, sortOption, sortOptions, status, datePeriods, dateRangeSchema } from '../../api/types/filter'
import { getGroup } from '../../api/utilities/date'
import { LocalStorage } from '../../api/utilities/localStorage'

export default {
  name: 'ExpressionList',
  components: {
    FilterPanel,
  },
  data: () => ({
    config: null,
    selected: null,
  }),
  computed: {
    getGrouped() {
      const { grouping = null, sorting = [] } = this.config
      const isAsc = sorting.includes(sortOption.DATE_ASC)
      const direction = isAsc ? 1 : -1
      const mapped = this.getSorted.map((item) => ({ ...item, group: getGroup(item.date, grouping) }))
      const grouped = groupBy(mapped, 'group.key')
      return Object.entries(grouped)
        .sort(([a], [b]) => (a > b ? 1 * direction : -1 * direction))
        .map(([_, items]) => [items[0].group?.label, items])
    },
    getSorted() {
      const sorting = this.config.sorting.length ? this.config.sorting : [sortOption.DATE_DESC]
      return sorting.reduce(
        (acc, key) => {
          const { iteratee } = sortOptions.find((option) => option.key === key)
          return acc.sort(iteratee)
        },
        [...this.getFiltered]
      )
    },
    getFiltered() {
      const { authors, labels, categories, status, date } = this.config.filters || {}
      const startDate = date.range?.start ? new Date(date.range.start) : null
      return this.getMapped.filter(
        (expression) =>
          (!authors?.length || expression.authors.some(({ _id }) => authors.includes(_id))) &&
          (!labels?.length || labels.some((label) => expression.labels.includes(label))) &&
          (!categories?.length || categories.some((category) => expression.statistic[category])) &&
          (!status || expression.status === status) &&
          (!startDate || (expression.date >= startDate && expression.date <= this.getEndDate))
      )
    },
    getMapped() {
      const { categories } = this.config.filters || {}
      return this.getExpressions.map((expression) => {
        const statistic = categories.length
          ? expression.categories.filter((item) => categories.includes(item.key))
          : expression.categories

        return {
          ...expression,
          status: statistic.every(({ rate }) => !rate) ? status.LEARNED : status.STUDIED,
        }
      })
    },
    getEndDate() {
      const { date } = this.config.filters || {}
      if (date.range?.end) {
        return date.period ? new Date() : new Date(date.range.end)
      }
      return null
    },
    currentUser: get('users/user', false),
    getExpressions: get('expressions/getExpressions', false),
  },
  created() {
    const config = schema(LocalStorage.dictionaryConfig || {})
    this.config = cloneDeep(config)

    if (this.config.filters.date.period) {
      const selectedPeriod = datePeriods.find(({ key }) => key === this.period)
      this.config.filters.date.range = dateRangeSchema({ start: selectedPeriod.getStartDate(), end: new Date() })
    }
  },
  methods: {
    saveConfig() {
      if (this.config.filterSavingEnabled) {
        LocalStorage.dictionaryConfig = this.config
      } else if (LocalStorage.dictionaryConfig) {
        delete LocalStorage.dictionaryConfig
      }
    },
    openConfirmModal(expression) {
      this.selected = expression
      this.$refs.modal.show()
    },
    remove() {
      this.removeExpression(this.selected)
    },
    removeExpression: call('expressions/removeExpression'),
  },
}
</script>

<style></style>
