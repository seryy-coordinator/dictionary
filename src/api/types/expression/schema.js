export const schema = (data = {}) => ({
  target: data.target || '',
  translate: data.translate || '',
  transcription: data.transcription || '',
  ownerId: data.ownerId || '',
  categories: data.categories || [],
  labels: data.labels || [],
})
