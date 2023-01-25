import { sortOption, groupOption } from './enums'

export const MAX_SORT_OPTIONS = 2

export const sortOptions = [
  {
    key: sortOption.DATE_ASC,
    label: 'Addition date',
    asc: true,
  },
  {
    key: sortOption.DATE_DESC,
    label: 'Addition date',
    asc: false,
  },
  {
    key: sortOption.ALPHABET_ASC,
    label: 'Alphabet',
    asc: true,
  },
  {
    key: sortOption.ALPHABET_DESC,
    label: 'Alphabet',
    asc: false,
  },
  {
    key: sortOption.RATE_ASC,
    label: 'Priority',
    asc: true,
  },
  {
    key: sortOption.RATE_DESC,
    label: 'Priority',
    asc: false,
  },
  {
    key: sortOption.ADDITION_COUNT_ASC,
    label: 'Count of addition',
    asc: true,
  },
  {
    key: sortOption.ADDITION_COUNT_DESC,
    label: 'Count of addition',
    asc: false,
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
