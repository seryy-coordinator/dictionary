<template>
  <li class="flex flex-wrap items-center my-1 p-2 gap-1 bg-gray-50 hover:bg-gray-100">
    <strong :class="{ 'opacity-40': expression.notImportant }" class="font-medium"> {{ expression.target }}</strong>
    <span :class="{ 'opacity-40': expression.notImportant }" class="inline-flex items-center mx-1">
      <span v-if="transcriptionVisible" class="text-gray-600"> [{{ expression.transcription }}] </span>
      <voice-button :expression="expression" />
    </span>
    <span :class="{ 'opacity-40': expression.notImportant }" class="text-gray-600">
      {{ expression.translate }}
    </span>
    <div v-if="detailsVisible" class="flex items-center gap-1 ml-auto text-[10px] text-black">
      <div v-if="!expression.isPersonal" class="relative z-0">
        <base-avatar
          v-for="(author, index) in expression.authors"
          :key="author._id"
          :src="author.picture"
          :name="author.name"
          size="tiny"
          class="mr-1 hover:z-10 relative"
          :style="`left:${-10 * index}px`"
        />
      </div>
      <template v-for="{ structure, rate } in expression.categories">
        <va-icon v-if="rate" :key="structure.key" :name="structure.icon" size="small" class="text-gray-500" />
      </template>
      <p v-for="label in expression.labels" :key="label" class="bg-blue-100 rounded-sm">{{ label }}</p>
    </div>
    <va-button
      :class="{ 'ml-auto': !detailsVisible }"
      icon="delete_forever"
      size="small"
      color="danger"
      preset="plainOpacity"
      @click="openConfirmModal(expression)"
    />
  </li>
</template>

<script>
export default {
  name: 'ExpressionListItem',
  props: {
    expression: {
      type: Object,
      required: true,
    },
    transcriptionShown: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    transcriptionVisible() {
      return this.transcriptionShown && this.expression.transcription
    },
    detailsVisible() {
      return !this.expression.isPersonal || this.expression.labels.length || this.expression.categories.length
    },
  },
}
</script>

<style></style>
