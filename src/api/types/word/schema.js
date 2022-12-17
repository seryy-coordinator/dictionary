export const schema = (data) => ({
  source: data.source || '',
  translate: data.translate || '',
  userId: data.userId || '',
  dictionaryId: data.dictionaryId || '',
  sections: data.sections || [],
})
