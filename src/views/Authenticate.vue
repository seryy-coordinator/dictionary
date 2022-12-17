<template>
  <div class="flex flex-col items-center justify-center h-screen gap-8">
    <h1 class="text-4xl font-bold">Authenticate</h1>
    <BaseButton @click="signIn()">Login</BaseButton>
  </div>
</template>

<script>
import { call } from 'vuex-pathify'
import BaseButton from '../components/base/BaseButton.vue'

export default {
  name: 'Authenticate',
  components: {
    BaseButton,
  },
  methods: {
    ...call('users', ['signIn']),
  },
}
</script>
