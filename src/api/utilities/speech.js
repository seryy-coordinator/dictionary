const utterance = new SpeechSynthesisUtterance()

speechSynthesis.onvoiceschanged = () => {
  initializeUtterance()
}

function getVoice(name = 'Google UK English Female') {
  const voices = speechSynthesis.getVoices()
  return voices.find((voice) => voice.name === name)
}

function initializeUtterance() {
  const voice = getVoice()
  utterance.voice = voice
  utterance.lang = voice.lang
  utterance.volume = 1
  utterance.rate = 1
  utterance.pitch = 1
}

function voiceText(text) {
  const trimmed = text.trim()
  if (!trimmed) return
  utterance.text = trimmed
  speechSynthesis.speak(utterance)
}

export { voiceText }
