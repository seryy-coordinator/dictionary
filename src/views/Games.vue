<template>
  <div>
    <!-- <FilterPanel v-model="config" :collection="getExpressions" @update:modelValue="saveConfig()" /> -->
    <div>
      <!-- Categories -->
    </div>
    <div class="flex gap-1">
      <div></div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash-es'

import FilterPanel from '../components//modules/filter/FilterPanel.vue'
import { schema, datePeriods, dateRangeSchema } from '../api/types/filter'
import { LocalStorage } from '../api/utilities/localStorage'

export default {
  name: 'Games',
  components: { FilterPanel },
  data: () => ({
    config: null,
  }),
  created() {
    const config = schema(LocalStorage.gamesConfig || {})
    this.config = cloneDeep(config)

    if (this.config.filters.date.period) {
      const selectedPeriod = datePeriods.find(({ key }) => key === this.period)
      this.config.filters.date.range = dateRangeSchema({ start: selectedPeriod.getStartDate(), end: new Date() })
    }
  },
}
</script>

<style></style>
