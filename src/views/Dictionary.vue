<template>
  <div>
    <ExpressionAdding />
    <Education />
    <ExpressionList />
  </div>
</template>

<script>
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
}
</script>

<style></style>
