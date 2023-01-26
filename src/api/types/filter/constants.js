import { sortOption, groupOption, status, datePeriod } from './enums'

export const MAX_SORT_OPTIONS = 2

export const sortOptions = [
  {
    key: sortOption.DATE_ASC,
    label: 'Addition date',
    asc: true,
    connectionKey: sortOption.DATE_DESC,
  },
  {
    key: sortOption.DATE_DESC,
    label: 'Addition date',
    asc: false,
    connectionKey: sortOption.DATE_ASC,
  },
  {
    key: sortOption.ALPHABET_ASC,
    label: 'Alphabet',
    asc: true,
    connectionKey: sortOption.ALPHABET_DESC,
  },
  {
    key: sortOption.ALPHABET_DESC,
    label: 'Alphabet',
    asc: false,
    connectionKey: sortOption.ALPHABET_ASC,
  },
  {
    key: sortOption.RATE_ASC,
    label: 'Priority',
    asc: true,
    connectionKey: sortOption.RATE_DESC,
  },
  {
    key: sortOption.RATE_DESC,
    label: 'Priority',
    asc: false,
    connectionKey: sortOption.RATE_ASC,
  },
  {
    key: sortOption.ADDITION_COUNT_ASC,
    label: 'Count of addition',
    asc: true,
    connectionKey: sortOption.ADDITION_COUNT_DESC,
  },
  {
    key: sortOption.ADDITION_COUNT_DESC,
    label: 'Count of addition',
    asc: false,
    connectionKey: sortOption.ADDITION_COUNT_ASC,
  },
]

export const groupOptions = [
  {
    key: groupOption.DAY,
    label: 'Days',
  },
  {
    key: groupOption.WEEK,
    label: 'Weeks',
  },
  {
    key: groupOption.MONTH,
    label: 'Months',
  },
]

export const statuses = [
  {
    key: status.LEARNED,
    label: 'Learned',
    icon: '',
    filter: (collection, categories) => {
      return collection.filter(({ statistic }) => {
        const entries = Object.entries(statistic)
        const studiedCategories = entries.filter(([key, value]) => categories.includes(key) && value)
        const isLearned = studiedCategories.length === 0
        return isLearned
      })
    },
  },
  {
    key: status.STUDIED,
    label: 'Studied',
    icon: '',
    filter: (collection, categories) => {
      return collection.filter(({ statistic }) => {
        const entries = Object.entries(statistic)
        const studiedCategories = entries.filter(([key, value]) => categories.includes(key) && value)
        const atLeastOne = studiedCategories.length > 0
        return atLeastOne
      })
    },
  },
]

export const datePeriods = [
  {
    key: datePeriod.WEEK,
    label: 'Past week',
    getStartDate() {
      const days = -7
      const date = new Date()
      date.setDate(date.getDate() + days)
      return date
    },
  },
  {
    key: datePeriod.MONTH,
    label: 'Past month',
    getStartDate() {
      const months = -1
      const date = new Date()
      date.setMonth(date.getMonth() + months)
      return date
    },
  },
  {
    key: datePeriod.THREE_MONTHS,
    label: 'Past three month',
    getStartDate() {
      const months = -3
      const date = new Date()
      date.setMonth(date.getMonth() + months)
      return date
    },
  },
  {
    key: datePeriod.YEAR,
    label: 'Past year',
    getStartDate() {
      const months = -12
      const date = new Date()
      date.setMonth(date.getMonth() + months)
      return date
    },
  },
]
