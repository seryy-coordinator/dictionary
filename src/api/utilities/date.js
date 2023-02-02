import { format, startOfWeek, endOfWeek, addDays, addMonths, startOfDay } from 'date-fns'
export { addDays, addMonths }

import { groupOption } from '../types/filter'

const defaultLocale = 'en-US'
const defaultWeekStartsOn = 1

export function getUTCTimeString() {
  return new Date().toLocaleString(defaultLocale, { timeZone: 'UTC' })
}

export function toLocaleTime(dateStr) {
  const date = new Date(dateStr)
  const userTimezoneOffset = date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - userTimezoneOffset)
}

export function getShortDate(date) {
  const shortFormat = 'MM/dd/yyyy'
  return format(date, shortFormat)
}

export function getDateWithWeekDay(date) {
  return format(date, 'EEE, MM/dd/yyyy')
}

export function getMonthString(date) {
  return {
    key: format(date, 'yyyyMM'),
    label: format(date, 'MMMM, yyyy'),
  }
}

export function getDayString(date) {
  const start = startOfDay(date).getTime()
  const formatted = getDateWithWeekDay(date)
  const today = startOfDay(new Date()).getTime()
  const yesterday = startOfDay(addDays(new Date(), -1)).getTime()
  if (start === today) {
    return { key: start, label: 'Today' }
  }
  if (start === yesterday) {
    return { key: start, label: 'Yesterday' }
  }
  return { key: start, label: formatted }
}

export function getWeekString(date) {
  const startDate = startOfWeek(date, { weekStartsOn: defaultWeekStartsOn })
  const startTimestamp = startDate.getTime()
  const start = getShortDate(startDate)
  const endDate = endOfWeek(date, { weekStartsOn: defaultWeekStartsOn })
  const end = getShortDate(endDate)

  const thisWeekStart = getShortDate(startOfWeek(new Date(), { weekStartsOn: defaultWeekStartsOn }))
  const previousWeekStart = getShortDate(startOfWeek(addDays(new Date(), -7), { weekStartsOn: defaultWeekStartsOn }))

  if (thisWeekStart === start) {
    return { key: startTimestamp, label: 'This week' }
  }
  if (previousWeekStart === start) {
    return { key: startTimestamp, label: 'Previous week' }
  }
  return { key: startTimestamp, label: `${start} - ${end}` }
}

export function getGroup(date, grouping) {
  if (grouping === groupOption.DAY) {
    return getDayString(date)
  }
  if (grouping === groupOption.WEEK) {
    return getWeekString(date)
  }
  if (grouping === groupOption.MONTH) {
    return getMonthString(date)
  }
  return ''
}
