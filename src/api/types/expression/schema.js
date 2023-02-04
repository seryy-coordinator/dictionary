export const historySchema = (data = {}) => ({
  categories: data.categories || [],
  date: data.date || '',
  authorId: data.authorId || '',
})

export const statisticSchema = (data = {}) => ({
  rate: data.rate || false,
  ready: data.ready || false,
  fails: data.fails || 0,
})

export const schema = (data = {}) => ({
  target: data.target || '',
  translate: data.translate || '',
  ownerId: data.ownerId || '',
  statistic: data.statistic || {},
  history: data.history || [],
  transcription: data.transcription || '',
  labels: data.labels || [],
  phrase: data.phrase || false,
})
