<template>
  <div class="flex items-center">
    <BaseButton route="/students" theme="simple" icon="school" class="text-gray-500 hover:text-gray-700" />
    <BaseButton route="/contacts" theme="simple" icon="people" class="text-gray-500 hover:text-gray-700 mx-2" />
    <router-link :to="`/profile/${currentUser._id}`" class="ml-4">
      <BaseAvatar :src="currentUser.picture" :name="currentUser.name"
    /></router-link>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'
import { BaseAvatar, BaseButton } from '../base'

export default {
  name: 'TopBar',
  components: {
    BaseAvatar,
    BaseButton,
  },
  computed: {
    currentUser: get('users/user'),
  },
}
</script>

<style></style>
