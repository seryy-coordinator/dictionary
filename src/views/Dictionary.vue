<template>
  <div>
    <ExpressionAdding />
    <Education />
    <ExpressionList />
  </div>
</template>

<script>
import { call } from 'vuex-pathify'

import Education from '../components/common/Education.vue'
import ExpressionAdding from '../components/dictionary/ExpressionAdding.vue'
import ExpressionList from '../components/dictionary/ExpressionList.vue'

export default {
  name: 'Dictionary',
  components: {
    Education,
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
