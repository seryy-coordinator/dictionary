<template>
  <div>
    <ExpressionAdding />
    <div class="mt-1 border-t border-b border-gray-100 bg-gray-50 flex justify-end px-2 h-5">
      <va-button color="info" preset="plainOpacity" icon="help" size="small" @click="showEducation()" />
    </div>
    <ExpressionList />
  </div>
</template>

<script>
import { call } from 'vuex-pathify'

import ExpressionAdding from '../components/modules/ExpressionAdding.vue'
import ExpressionList from '../components/modules/ExpressionList.vue'

export default {
  name: 'Dictionary',
  components: {
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
