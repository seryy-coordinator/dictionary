<template>
  <div class="flex flex-col items-center z-10">
    <va-button
      :icon="isExpanded ? 'expand_less' : 'tune'"
      color="info"
      preset="plainOpacity"
      size="large"
      @click="isExpanded = !isExpanded"
    />
    <div v-if="isExpanded" class="flex flex-col items-center justify-center gap-2 mt-2">
      <div v-if="getLabels.length" class="flex flex-wrap items-center gap-1">
        <va-chip
          v-for="label in getLabels"
          :key="label"
          :color="selectedLabels.includes(label) ? 'info' : 'secondary'"
          icon="folder"
          size="small"
          square
          class="shrink-0 cursor-pointer"
          @click="updateLabels(label)"
        >
          {{ label }}
        </va-chip>
      </div>
      <div v-if="getAuthors.length > 1" class="flex flex-wrap items-center justify-center gap-1">
        <va-chip
          v-for="author in getAuthors"
          :key="author._id"
          :color="selectedAuthors.includes(author) ? 'primary' : 'backgroundPrimary'"
          square
          class="px-0 shrink-0 cursor-pointer"
          @click="updateAuthors(author)"
        >
          <base-avatar :src="author.picture" :name="author.name" size="tiny" />
          <span class="ml-1">{{ author.title || author.name }}</span>
        </va-chip>
      </div>
      <base-date-range :modelValue="dateValue" @update:modelValue="$emit('update:dateValue', $event)" />
    </div>
  </div>
</template>

<script>
import { uniq, uniqBy } from 'lodash-es'
import { get } from 'vuex-pathify'

export default {
  name: 'Filters',
  props: {
    dateValue: {
      type: Object,
      default: null,
    },
    labelsValue: {
      type: Array,
      default: null,
    },
    authorsValue: {
      type: Array,
      default: null,
    },
  },
  data: () => ({
    isExpanded: false,
  }),
  computed: {
    getAuthors() {
      const authors = this.getExpressions.flatMap(({ authors }) => authors)
      return uniqBy(authors, '_id')
    },
    getLabels() {
      const labels = this.getExpressions.flatMap(({ labels }) => labels)
      return uniq(labels)
    },
    getExpressions: get('expressions/getExpressions', false),
  },
  methods: {
    updateLabels(label) {
      const value = this.labelsValue.includes(label)
        ? this.labelsValue.filter((item) => item !== label)
        : [...this.labelsValue, label]
      this.$emit('update:labelsValue', value)
    },
    updateAuthors({ _id }) {
      const value = this.authorsValue.includes(_id)
        ? this.authorsValue.filter((item) => item !== _id)
        : [...this.authorsValue, _id]
      this.$emit('update:authorsValue', value)
    },
  },
}
</script>

<style></style>
