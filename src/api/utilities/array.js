import { get, uniq } from 'lodash-es'

export function priorityShuffle(collection, properties, defaultFactor = 0.1) {
  const mappedProperties = properties.map((path) => (typeof path === 'string' ? { path, priority: 1 } : path))
  const rates = Object.fromEntries(
    mappedProperties.map(({ path }) => [path, uniq(collection.map((item) => get(item, path) || 0)).sort()])
  )
  return collection
    .map((item) => {
      const priority = mappedProperties.reduce((prev, { path, priority }) => {
        const index = rates[path].findIndex((value) => value === (get(item, path) || 0))
        return prev + index * priority
      }, 0)
      const random = priority * defaultFactor + Math.random()
      return { item, random }
    })
    .sort((a, b) => a.random - b.random)
    .map(({ item }) => item)
}
