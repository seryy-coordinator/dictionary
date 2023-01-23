<template>
  <div class="border-b border-gray-100 bg-gray-100 flex px-2 h-8">
    <BaseButton theme="simple" icon="settings" class="text-xl text-gray-600 hover:text-gray-700" />
    <BaseButton theme="simple" icon="tune" class="ml-auto text-xl text-gray-600 hover:text-gray-700" />
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

import { BaseButton } from '../base'

export default {
  name: 'FilterPanel',
  components: {
    BaseButton,
  },
  computed: {
    ...get('expressions', { getExpressions: 'collection' }),
  },
}
</script>

<style></style>
