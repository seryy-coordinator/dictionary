<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-50">
    <h1 class="text-blue-500 text-6xl mb-6">Welcome</h1>
    <h2 class="text-grey-800 text-4xl mb-3">Please login below to access this resource</h2>
    <p class="text-grey-600 mb-6">Authenticate with your @google.com email to access this resource</p>
    <va-button :loading="authenticating" color="gray-200" border-color="gray-300" icon="add" @click="signIn()">
      <template #prepend>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18" class="w-5 mr-1">
          <path
            fill="#4285F4"
            fill-rule="evenodd"
            d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62Z"
            clip-rule="evenodd"
          />
          <path
            fill="#34A853"
            fill-rule="evenodd"
            d="M9 18a8.6 8.6 0 0 0 5.96-2.18l-2.91-2.26a5.41 5.41 0 0 1-8.09-2.85h-3v2.33A9 9 0 0 0 9 18Z"
            clip-rule="evenodd"
          />
          <path
            fill="#FBBC05"
            fill-rule="evenodd"
            d="M3.96 10.71A5.41 5.41 0 0 1 3.68 9c0-.6.1-1.17.28-1.71V4.96h-3A9 9 0 0 0 0 9a9 9 0 0 0 .96 4.04l3-2.33Z"
            clip-rule="evenodd"
          />
          <path
            fill="#EA4335"
            fill-rule="evenodd"
            d="M9 3.58c1.32 0 2.5.45 3.44 1.34l2.58-2.58A8.64 8.64 0 0 0 9 0 9 9 0 0 0 .96 4.96l3 2.33A5.36 5.36 0 0 1 9 3.58Z"
            clip-rule="evenodd"
          />
        </svg>
      </template>
      Login With Google
    </va-button>
  </div>
</template>

<script>
import { call, get } from 'vuex-pathify'

export default {
  name: 'Authenticate',
  data: () => ({
    authenticating: false,
  }),
  computed: {
    currentUser: get('users/user', false),
  },
  methods: {
    async signIn() {
      this.authenticating = true
      await this.signInWithPopup()
      this.authenticating = false
      if (this.currentUser) {
        const route = this.currentUser.role ? '/dictionary' : '/settings'
        this.$router.push(route)
      }
    },
    ...call('users', ['signInWithPopup']),
  },
}
</script>

<style></style>
