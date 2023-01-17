<template>
  <div>
    <ExpressionAdding />
    <div class="my-1 border-t border-b border-gray-100 bg-gray-50 flex justify-end px-2 h-7">
      <BaseButton
        theme="simple"
        icon="info"
        class="text-lg text-blue-600 hover:text-blue-700"
        @click="showEducation()"
      />
    </div>
    <ExpressionList />
  </div>
</template>

<script>
import { call } from 'vuex-pathify'

import { BaseButton } from '../components/base'
import ExpressionAdding from '../components/modules/ExpressionAdding.vue'
import ExpressionList from '../components/modules/ExpressionList.vue'

export default {
  name: 'Dictionary',
  components: {
    BaseButton,
    ExpressionAdding,
    ExpressionList,
  },
  created() {
    this.fetchAll()
  },
  methods: {
    showEducation() {
      // TODO: will be implemented later
    },
    ...call('expressions', ['fetchAll']),
  },
}
</script>

<style></style>
