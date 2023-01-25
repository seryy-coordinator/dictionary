<template>
  <div>
    <FilterPanel />
    <ul class="py-2 px-8">
      <li
        v-for="expression in getExpressions"
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
import { get } from 'vuex-pathify'

import FilterPanel from './FilterPanel.vue'
import { voiceText } from '../../api/utilities/speech'

export default {
  name: 'ExpressionList',
  components: {
    FilterPanel,
  },
  computed: {
    ...get('expressions', { getExpressions: 'collection' }, false),
  },
  methods: {
    voiceText,
  },
}
</script>

<style></style>
