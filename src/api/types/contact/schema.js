export const schema = (data = {}) => ({
  userIds: data.userIds || [],
  status: data.status || '',
})
