<template>
  <div>
    <div>Contacts</div>
    <va-input v-model="email" label="Contact email">
      <template #append>
        <va-button :disabled="!email" icon="search" @click="findContacts()" />
      </template>
    </va-input>
  </div>
</template>

<script>
import { call } from 'vuex-pathify'

export default {
  name: 'Contacts',
  data: () => ({
    email: '',
  }),
  mounted() {
    this.fetchAll()
  },
  methods: {
    async findContacts() {
      const user = await this.findUserByEmail(this.email)
      await this.addContact(user)
    },
    ...call('contacts', ['fetchAll', 'addContact']),
    ...call('users', ['findUserByEmail']),
  },
}
</script>

<style></style>
