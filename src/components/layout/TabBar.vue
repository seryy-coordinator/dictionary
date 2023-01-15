<template>
  <ul class="flex items-center">
    <li v-for="tab in tabs" :key="tab.route">
      <router-link
        :to="tab.route"
        :class="tab.route === $route.path ? 'bg-green-200' : 'hover:bg-gray-300 bg-gray-200'"
        class="px-3 py-2"
        >{{ tab.label }}</router-link
      >
    </li>
  </ul>
</template>

<script>
const tabs = [
  {
    label: 'Dictionary',
    route: '/dictionary',
    icon: '',
  },
  {
    label: 'Games',
    route: '/games',
    icon: '',
  },
  {
    label: 'Settings',
    route: '/settings',
    icon: '',
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
