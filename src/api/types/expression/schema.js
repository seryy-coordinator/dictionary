export const schema = (data = {}) => ({
  target: data.target || '',
  translate: data.translate || '',
  userId: data.userId || '',
  dictionaryId: data.dictionaryId || '',
  sections: data.sections || [],
})
