export const schema = (data = {}) => ({
  target: data.target || '',
  translate: data.translate || '',
  ownerId: data.ownerId || '',
  statistic: data.statistic || {},
  history: data.history || [],
  transcription: data.transcription || '',
  labels: data.labels || [],
})
