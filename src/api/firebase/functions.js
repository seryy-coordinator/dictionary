const urls = {
  getUrl(name, params) {
    const query = Object.entries(params).reduce((acc, [key, value]) => acc + `${key}=${value}&`, '')
    const isDev = process.env.NODE_ENV === 'development'
    const prefix = isDev
      ? 'http://localhost:5001/greydictionary/us-central1'
      : 'https://us-central1-greydictionary.cloudfunctions.net'
    return `${prefix}/${name}?${query}`
  },
  getMiniCardUrl(text) {
    return this.getUrl('getMiniCard', { text })
  },
  getMiniCardsUrl(text) {
    return this.getUrl('getMiniCards', { text })
  },
  getTranscriptionUrl(text) {
    return this.getUrl('getTranscription', { text })
  },
}

export async function getMiniCard(card) {
  const url = urls.getMiniCardUrl(card)
  const response = await fetch(url)
  return response.json()
}

export async function getMiniCards(card) {
  const url = urls.getMiniCardsUrl(card)
  const response = await fetch(url)
  return response.json()
}

export async function getTranscription(card) {
  const url = urls.getTranscriptionUrl(card)
  const response = await fetch(url)
  return response.text()
}
