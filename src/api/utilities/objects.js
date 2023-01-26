export function optimize(data) {
  return Object.keys(data).reduce((acc, key) => {
    const value = data[key]
    if (typeof value === 'object' && !Object.keys(value).length) {
      acc[key] = optimize(value)
    } else if ((value?.isArray() && !value.length) || value) {
      acc[key] = value
    }
    return acc
  }, {})
}
