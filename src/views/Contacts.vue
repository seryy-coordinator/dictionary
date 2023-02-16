<template>
  <div>
    <div class="relative flex flex-col w-96 mb-4 mx-auto">
      <div class="my-4 font-bold text-4xl text-gray-700">Contacts</div>
      <div class="flex flex-col gap-1 p-1 border border-gray-100">
        <va-input v-model="email" label="User email">
          <template #append>
            <va-button :disabled="!email" icon="search" @click="findContacts()" />
          </template>
        </va-input>
      </div>
      <div v-if="newContact || notFound" class="bg-white border border-gray-100 absolute top-full w-full">
        <div v-if="notFound" class="p-2">Not result :(</div>
        <div v-else class="flex items-center gap-2 my-1 py-1 px-3 hover:bg-gray-50">
          <base-avatar :src="newContact.picture" :name="newContact.name" size="small" />
          <div class="mr-auto">
            <p class="leading-4">{{ newContact.name }}</p>
            <p class="text-xs text-gray-600">{{ newContact.email }}</p>
          </div>
          <va-icon
            v-if="currentRelationship"
            :name="currentRelationship.icon"
            :color="currentRelationship.color"
            size="large"
          />
          <va-button v-else icon="person_add" color="info" preset="plainOpacity" size="large" @click="add()" />
        </div>
      </div>
    </div>
    <education class="my-4" />
    <ul>
      <li v-for="contact in getContacts" :key="contact._id">
        <div class="flex items-center gap-2 bg-blue-50 border border-blue-100 py-2 px-3 rounded font-medium my-2">
          <base-avatar :src="contact.picture" :name="contact.name" />
          <span>{{ contact.email }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { call, get } from 'vuex-pathify'
import { contactStatuses } from '../api/types/contact'

export default {
  name: 'Contacts',
  data: () => ({
    email: '',
    newContact: null,
    notFound: false,
  }),
  computed: {
    currentRelationship() {
      if (this.newContact) {
        const relationship = this.relationships.find(({ userIds }) => userIds.includes(this.newContact._id))
        console.log(relationship)
        if (relationship) {
          return contactStatuses.find(({ key }) => key === relationship.status)
        }
      }
      return null
    },
    relationships: get('contacts/collection', false),
    getContacts: get('contacts/getContacts', false),
  },
  watch: {
    email() {
      this.notFound = false
    },
  },
  mounted() {
    this.fetchAll()
  },
  methods: {
    async findContacts() {
      this.newContact = await this.findUserByEmail(this.email)
      this.notFound = !this.newContact
    },
    add() {
      this.addContact(this.newContact)
      this.$vaToast.init({
        message: `A request to add to contacts was sent to the user '${this.newContact.name}'.`,
        position: 'bottom-right',
        offsetX: 30,
        offsetY: 40,
        duration: 3000,
        color: 'success',
      })
      this.newContact = null
      this.email = ''
    },
    ...call('contacts', ['fetchAll', 'addContact']),
    ...call('users', ['findUserByEmail']),
  },
}
</script>

<style></style>
