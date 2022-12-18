export const schema = (data = {}) => ({
  name: data.name || '',
  role: data.role || '',
  email: data.email || '',
  picture: data.picture || '',
})
