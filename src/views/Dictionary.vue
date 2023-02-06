<template>
  <div>
    <ExpressionAdding />
    <education />
    <ExpressionList />
  </div>
</template>

<script>
import ExpressionAdding from '../components/dictionary/ExpressionAdding.vue'
import ExpressionList from '../components/dictionary/ExpressionList.vue'

export default {
  name: 'Dictionary',
  components: {
    ExpressionAdding,
    ExpressionList,
  },
}
</script>

<style></style>
