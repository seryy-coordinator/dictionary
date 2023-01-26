<template>
  <va-date-input
    v-model="range"
    v-model:isOpen="isOpen"
    mode="range"
    label="Date range"
    clearable
    class="base-date-range"
    @update:modelValue="setRange()"
  >
    <template #prependInner>
      <va-dropdown
        :close-on-content-click="false"
        :offset="[6, 0]"
        placement="bottom-start"
        color="primary"
        preset="plain"
        hide-icon
        @click="closeDatePicker"
      >
        <template #anchor>
          <va-icon name="list" color="primary" />
        </template>
        <va-dropdown-content class="w-48 py-1 px-0 cursor-auto">
          <div
            v-for="option in datePeriods"
            :key="option.key"
            :class="{ 'text-blue-700': period === option.key }"
            class="flex items-center justify-between gap-2 p-2 cursor-pointer my-1 hover:bg-blue-200"
            @click="selectPeriod(option)"
          >
            {{ option.label }}
            <va-icon v-if="period === option.key" name="check" size="small" />
          </div>
        </va-dropdown-content>
      </va-dropdown>
    </template>
  </va-date-input>
</template>

<script>
import { datePeriods, dateRangeSchema } from '../../api/types/filter'
import { getShortDate } from '../../api/utilities/date'

export default {
  name: 'BaseDateRange',
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  data: () => ({
    range: {},
    period: null,
    datePeriods,
    isOpen: false,
  }),
  watch: {
    modelValue: {
      handler(newValue) {
        this.period = newValue.period
        if (this.period) {
          const selectedPeriod = datePeriods.find(({ key }) => key === this.period)
          this.range = dateRangeSchema({ start: selectedPeriod.getStartDate(), end: new Date() })
          return
        }
        this.range = newValue.range?.start
          ? {
              start: new Date(newValue.range.start),
              end: new Date(newValue.range.end),
            }
          : null
      },
      immediate: true,
    },
  },
  methods: {
    selectPeriod({ key }) {
      this.period = key
      this.updateValue()
    },
    updateValue() {
      this.$emit('update:modelValue', {
        period: this.period,
        range: this.range,
      })
    },
    setRange() {
      this.period = null
      this.range = dateRangeSchema({
        start: getShortDate(this.range.start),
        end: getShortDate(this.range.end),
      })
      this.updateValue()
    },
    closeDatePicker(event) {
      if (!this.isOpen) {
        event.stopPropagation()
      }
    },
  },
}
</script>

<style>
.base-date-range .va-input-wrapper__field {
  overflow: inherit;
}
</style>
