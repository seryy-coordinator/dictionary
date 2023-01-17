<template>
  <div>
    <ExpressionAdding />
    <hr class="my-1" />
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
    ...call('expressions', ['fetchAll']),
  },
}
</script>

<style></style>
