export const schema = (data = {}) => ({
  userIds: data.userIds || [],
  status: data.status || null,
  ...(data.studies && { studies: data.studies }),
})
