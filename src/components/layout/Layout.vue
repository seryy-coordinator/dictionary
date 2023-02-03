<template>
  <div class="flex flex-col h-screen bg-white">
    <TopBar class="flex-shrink-0" />
    <router-view class="flex-grow overflow-auto" />
    <TabBar class="mx-auto" />
    <div class="absolute bottom-10 right-8">
      <va-alert
        v-for="notification in getNotifications"
        :key="notification.timeStamp"
        :color="notification.type"
        border="left"
        closeable
        @update:modelValue="removeNotification(notification)"
      >
        <p v-html="notification.text"></p>
      </va-alert>
    </div>
  </div>
</template>

<script>
import { call, get } from 'vuex-pathify'

import TabBar from './TabBar.vue'
import TopBar from './TopBar.vue'

export default {
  name: 'Layout',
  components: {
    TabBar,
    TopBar,
  },
  computed: {
    getNotifications: get('notification/collection', false),
  },
  methods: {
    removeNotification: call('notification/removeNotification'),
  },
}
</script>

<style></style>
