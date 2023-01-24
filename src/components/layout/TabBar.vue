<template>
  <va-button-group color="info" icon-color="warning">
    <va-button
      v-for="tab in tabs"
      :key="tab.route"
      :to="tab.route"
      :icon="tab.icon"
      :disabled="tab.route === $route.path"
      class="rounded-b-none"
    >
      {{ tab.label }}
    </va-button>
  </va-button-group>
</template>

<script>
const tabs = [
  {
    label: 'Dictionary',
    route: '/',
    icon: 'menu_book',
  },
  {
    label: 'Games',
    route: '/games',
    icon: 'extension',
  },
  {
    label: 'Settings',
    route: '/settings',
    icon: 'manage_accounts',
  },
]

export default {
  name: 'TabBar',
  data: () => ({
    tabs,
  }),
}
</script>

<style></style>
