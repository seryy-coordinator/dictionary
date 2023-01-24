<template>
  <va-navbar color="primary" shape>
    <template #left>
      <va-navbar-item class="font-semibold text-2xl">LOGO</va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item>
        <router-link to="/students" class="flex items-center gap-1">
          <va-icon name="school" />
          <p>Students</p>
        </router-link>
      </va-navbar-item>
      <va-navbar-item>
        <router-link to="/contacts" class="flex items-center gap-1">
          <va-icon name="people" />
          <p>Contacts</p>
        </router-link>
      </va-navbar-item>
      <va-navbar-item>
        <router-link v-if="currentUser" :to="`/profile/${currentUser._id}`" class="ml-4">
          <BaseAvatar :src="currentUser.picture" :name="currentUser.name" />
        </router-link>
      </va-navbar-item>
    </template>
  </va-navbar>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  name: 'TopBar',
  computed: {
    currentUser: get('users/user', false),
  },
}
</script>

<style></style>
