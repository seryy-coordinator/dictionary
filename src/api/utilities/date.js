export function getUTCTimeString() {
  return new Date().toLocaleString('en-US', { timeZone: 'UTC' })
}

export function toLocaleTime(dateStr) {
  const date = new Date(dateStr)
  const userTimezoneOffset = date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - userTimezoneOffset)
}

export function getShortDate(date) {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
  }
  return date.toLocaleString('en-US', options)
}
