<template>
  <div>
    <div class="relative flex flex-col max-w-[400px] px-2 mb-4 mx-auto">
      <div class="my-4 font-bold text-4xl text-gray-700">Contacts</div>
      <div class="flex flex-col gap-1 p-1 border border-gray-100">
        <va-input v-model="email" label="User email">
          <template #append>
            <va-button :disabled="searchDisabled" icon="search" @click="findContacts()" />
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
    <ul class="flex flex-col max-w-[400px] mx-auto px-2">
      <li v-for="{ contactId, contact, relationStatus } in getContacts" :key="contactId">
        <div
          v-if="contact"
          class="flex items-center gap-2 bg-gray-50 hover:bg-blue-50 py-2 px-3 rounded font-medium my-2"
          @click="openProfile(contactId)"
        >
          <base-avatar :src="contact.picture" :name="contact.name" size="small" />
          <span>{{ contact.name }}</span>
          <va-chip :color="relationStatus.color" :icon="relationStatus.icon" size="small" square class="mr-auto" />

          <va-button
            icon="delete_forever"
            size="small"
            color="danger"
            preset="plainOpacity"
            @click.stop="openConfirmModal(contact)"
          />
        </div>
      </li>
    </ul>
    <va-modal ref="modal" stateful message="Are you sure?" title="Contact removing" @ok="remove()" />
  </div>
</template>

<script>
import { call, get } from 'vuex-pathify'
import { relationStatuses } from '../api/types/relation'

export default {
  name: 'Contacts',
  data: () => ({
    email: '',
    newContact: null,
    notFound: false,
    loaded: false,
    selected: null,
    startPosition: 0,
    size: 10,
  }),
  computed: {
    currentRelationship() {
      if (this.newContact) {
        const relationship = this.getContactRelations.find(({ contactId }) => contactId === this.newContact._id)
        if (relationship) {
          return relationStatuses.find(({ key }) => key === relationship.status)
        }
      }
      return null
    },
    getContacts() {
      return this.activeContactRelations
        .slice(this.startPosition, this.startPosition + this.size)
        .map(({ contactId, status }) => {
          const contact = this.users.find(({ _id }) => _id === contactId)
          const relationStatus = relationStatuses.find(({ key }) => key === status)
          return {
            contact,
            contactId,
            status,
            relationStatus,
          }
        })
    },
    searchDisabled() {
      return !this.email || this.currentUser.email === this.email
    },
    currentUser: get('users/user', false),
    ...get('relations', ['activeContactRelations', 'getContactRelations', 'users'], false),
  },
  watch: {
    email() {
      this.notFound = false
    },
  },
  async created() {
    this.loaded = true
    await this.fetchAllRelations()
    await this.loadContacts()
    this.loaded = false
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
    openProfile(contactId) {
      this.$router.push(`/profile/${contactId}`)
    },
    openConfirmModal(contact) {
      this.selected = contact
      this.$refs.modal.show()
    },
    remove() {
      this.removeContact(this.selected)
    },
    ...call('relations', ['fetchAllRelations', 'loadContacts', 'addContact', 'removeContact']),
    ...call('users', ['findUserByEmail']),
  },
}
</script>

<style></style>
