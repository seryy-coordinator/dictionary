<template>
  <div class="flex flex-col h-screen bg-white">
    <TopBar class="flex-shrink-0" />
    <router-view class="flex-grow overflow-auto" />
    <TabBar class="mx-auto" />
  </div>
</template>

<script>
import TabBar from './TabBar.vue'
import TopBar from './TopBar.vue'

export default {
  name: 'Layout',
  components: {
    TabBar,
    TopBar,
  },
}
</script>

<style></style>
