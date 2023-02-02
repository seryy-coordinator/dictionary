import { optimize } from '../../utilities/objects'

export const dateRangeSchema = (data = {}) => ({
  start: data.start || undefined,
  end: data.end || undefined,
})

export const dateSchema = (data = {}) => ({
  range: dateRangeSchema(data.range),
  period: data.period || null,
})

export const schema = (data = {}, optimized = false) => {
  const date = dateSchema(data.filters?.dateRange)
  const value = {
    transcriptionShown: data.transcriptionShown || true,
    filterSavingEnabled: data.filterSavingEnabled || false,
    sorting: data.sorting || [],
    grouping: data.grouping || null,
    filters: {
      authors: data.filters?.authors || [],
      labels: data.filters?.labels || [],
      categories: data.filters?.categories || [],
      status: data.filters?.status || null,
      date,
    },
  }

  return optimized ? optimize(value) : value
}
