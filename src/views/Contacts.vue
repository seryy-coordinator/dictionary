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
      <li v-for="item in getContacts" :key="item.contactId">
        <div
          v-if="item.contact"
          :class="{ 'hover:bg-blue-50 cursor-pointer': !item.especially }"
          class="flex items-center gap-2 bg-gray-50 py-2 px-3 rounded font-medium my-2"
          @click="!item.especially && openProfile(item.contactId)"
        >
          <div :class="{ 'opacity-40': item.especially && !item.incoming }" class="flex items-center gap-2 mr-auto">
            <va-chip
              v-if="item.especially"
              :color="item.statusDetails.color"
              :icon="item.statusDetails.icon"
              size="small"
              square
              class="va-chip--icon"
            />
            <base-avatar :src="item.contact.picture" :name="item.contact.name" size="small" />
            <span>{{ item.contact.name }}</span>
          </div>

          <div class="flex items-center gap-1">
            <template v-if="item.especially && item.incoming">
              <va-button icon="check_circle_outline" size="small" color="success" @click.stop="approve(item)" />
              <va-button icon="highlight_off" size="small" color="warning" @click.stop="reject(item)" />
            </template>
            <va-button
              v-else
              icon="delete_forever"
              size="small"
              color="danger"
              preset="plainOpacity"
              @click.stop="openConfirmModal(item.contact)"
            />
          </div>
        </div>
      </li>
    </ul>
    <va-modal ref="modal" stateful message="Are you sure?" title="Contact removing" @ok="remove()" />
  </div>
</template>

<script>
import { call, get } from 'vuex-pathify'
import { relationStatus, relationStatuses } from '../api/types/relation'

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
    currentUserDisabled() {
      return this.currentRelationship?.key === relationStatus.DISABLED
    },
    getContacts() {
      return this.activeContactRelations.slice(this.startPosition, this.startPosition + this.size).map((item) => {
        const contact = this.users.find(({ _id }) => _id === item.contactId)
        const statusDetails = relationStatuses.find(({ key }) => key === item.status)
        return {
          ...item,
          contact,
          statusDetails,
          especially: item.status !== relationStatus.APPROVE,
        }
      })
    },
    searchDisabled() {
      return !this.email || this.currentUser.email === this.email
    },
    currentUser: get('users/user', false),
    ...get('relations', ['activeContactRelations', 'getContactRelations', 'users', 'loading'], false),
  },
  watch: {
    email() {
      this.notFound = false
    },
  },
  async created() {
    this.loaded = true
    await this.loading
    await this.loadContacts()
    this.loaded = false
  },
  methods: {
    async findContacts() {
      this.newContact = await this.findUserByEmail(this.email)
      this.notFound = !this.newContact
    },
    add() {
      this.addRelation(this.newContact)
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
    approve(relation) {
      this.updateRelation({ _id: relation._id, status: relationStatus.APPROVE })
    },
    reject(relation) {
      this.updateRelation({ _id: relation._id, status: relationStatus.REJECT })
    },
    ...call('relations', ['loadContacts', 'addRelation', 'removeContact', 'updateRelation']),
    ...call('users', ['findUserByEmail']),
  },
}
</script>

<style>
.va-chip--icon .va-chip__content {
  display: none;
}
</style>
