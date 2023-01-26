<template>
  <div>
    <FilterPanel v-model="config" :collection="getExpressions" />
    <ul class="py-2 px-8">
      <li
        v-for="expression in getGrouped"
        :key="expression._id"
        class="flex items-center my-1 p-1 gap-1 hover:bg-gray-50"
      >
        <strong class="font-medium">{{ expression.target }}</strong>
        <va-button color="info" preset="plain" icon="volume_up" size="small" @click="voiceText(expression.target)" />
        <span class="mx-1">-</span>
        <span class="text-gray-600">{{ expression.translate }}</span>
      </li>
    </ul>
    <!-- <va-divider orientation="center">
          <span class="px-2">January</span>
        </va-divider> -->
  </div>
</template>

<script>
import { cloneDeep } from 'lodash-es'
import { get } from 'vuex-pathify'

import FilterPanel from './filter/FilterPanel.vue'
import { voiceText } from '../../api/utilities/speech'
import { schema } from '../../api/types/filter'

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
      // TODO: will implement later
      return this.getSorted
    },
    getSorted() {
      // TODO: will implement later
      return this.getFiltered
    },
    getFiltered() {
      // TODO: will implement later
      return this.getExpressions
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
