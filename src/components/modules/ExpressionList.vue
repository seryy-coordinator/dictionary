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
        <BaseButton
          theme="simple"
          icon="volume_up"
          class="text-blue-400 hover:text-blue-500"
          @click="voiceText(expression.target)"
        />
        <span class="mx-1">-</span>
        <span class="text-gray-600">{{ expression.translate }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

import { BaseButton } from '../base'
import FilterPanel from './FilterPanel.vue'
import { voiceText } from '../../api/utilities/speech'

export default {
  name: 'ExpressionList',
  components: {
    BaseButton,
    FilterPanel,
  },
  computed: {
    ...get('expressions', { getExpressions: 'collection' }),
  },
  methods: {
    voiceText,
  },
}
</script>

<style></style>
