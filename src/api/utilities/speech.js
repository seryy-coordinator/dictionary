const U = new SpeechSynthesisUtterance()

let voices = speechSynthesis.getVoices()

speechSynthesis.onvoiceschanged = () => {
  voices = speechSynthesis.getVoices()
  initializeSpeech()
}

function initializeSpeech() {
  const voice = voices.find((voice) => voice.name === 'Google UK English Female')
  U.voice = voice
  U.lang = voice.lang
  U.volume = 1
  U.rate = 1
  U.pitch = 1
}

function voiceText(text) {
  const trimmed = text.trim()
  if (!trimmed) return
  U.text = trimmed
  speechSynthesis.speak(U)
}

export { voiceText }
