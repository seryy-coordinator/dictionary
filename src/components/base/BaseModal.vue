<template>
  <div
    class="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center bg-gray-50 bg-opacity-50"
    role="dialog"
    aria-modal="true"
  >
    <div class="bg-white border border-gray-100 p-1 rounded">
      <div class="flex justify-end">
        <span class="material-icons cursor-pointer" @click="$emit('close')">close</span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',
}
</script>
