<template>
  <div v-show="getPageIndexes.length > 1" class="flex items-center gap-[1px]">
    <div
      v-for="index in getPageIndexes"
      :key="index"
      :class="modelValue === index ? 'bg-blue-500' : 'bg-gray-300 hover:bg-blue-400'"
      class="h-2 w-16 cursor-pointer"
      @click="updateValue(index)"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'BasePagination',
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 3,
    },
    offset: {
      type: Number,
      default: 0,
    },
    focused: {
      type: Number,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    getPageIndexes() {
      const middle = this.focused === null ? this.modelValue + this.offset : this.focused
      const startPosition = middle - Math.floor((this.size - 1) / 2)
      const indexes = []
      for (let index = 0; index < this.size; index++) {
        const value = startPosition + index
        if (value >= this.min && value <= this.max) {
          indexes.push(value)
        }
      }
      return indexes
    },
  },
  methods: {
    updateValue(value) {
      this.$emit('update:modelValue', value)
    },
  },
}
</script>

<style>
.va-avatar.va-avatar--tiny {
  font-size: 0.55rem !important;
  width: 1.2rem !important;
  min-width: 1.2rem !important;
  height: 1.2rem !important;
}
</style>
