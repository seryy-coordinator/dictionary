<template>
  <div class="flex items-center gap-1 mx-auto border border-gray-100 p-1">
    <div
      v-for="option in dictionaryCategories"
      :key="option.key"
      :class="[
        modelValue === option
          ? 'bg-blue-400 text-white border-blue-500'
          : 'bg-gray-300 hover:bg-gray-400 opacity-20 border-transparent',
      ]"
      class="flex flex-col items-center p-1 cursor-pointer font-bold border sm:w-24 w-20"
      @click="$emit('update:modelValue')"
    >
      <va-icon :name="option.icon" />
      <span class="sm:text-xs text-[11px]"> {{ option.label }}</span>
    </div>
  </div>
</template>

<script>
import { dictionaryCategories } from '../../api/types/category'

export default {
  name: 'CategoryRadio',
  props: {
    modelValue: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    dictionaryCategories,
  }),
}
</script>

<style></style>
