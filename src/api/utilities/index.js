export function getAvatarColor(name) {
  const colors = [
    '#f6364e',
    '#f636a2',
    '#b036f6',
    '#6336f6',
    '#3648f6',
    '#3683f6',
    '#36b0f6',
    '#36f6eb',
    '#36f68c',
    '#d4f636',
    '#f6b436',
    '#f67a36',
  ]
  let hash = 0
  if (name.length === 0) {
    return hash
  }
  for (let i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
    hash &= hash
  }
  hash = ((hash % colors.length) + colors.length) % colors.length
  return colors[hash]
}
