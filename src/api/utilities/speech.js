import { random } from 'lodash-es'

const utteranceEn = new SpeechSynthesisUtterance()

speechSynthesis.onvoiceschanged = initializeUtterances

export function initializeUtterances() {
  initializeUtterance(utteranceEn, 'en-US')
}

function getVoicesByLang(langPrefix) {
  const voices = speechSynthesis.getVoices()
  return voices.filter(({ lang }) => lang.includes(langPrefix))
}

function initializeUtterance(utterance, langPrefix) {
  const voices = getVoicesByLang(langPrefix)
  if (voices.length > 1) {
    /* eslint-disable no-constant-condition */
    while (true) {
      const index = random(0, voices.length - 1)
      const voice = voices[index]
      if (utterance.voice !== voice) {
        utterance.voice = voice
        break
      }
    }
  } else {
    utterance.voice = voices[0]
  }
  utterance.lang = utterance.voice.lang
  utterance.volume = 1
  utterance.rate = 1
  utterance.pitch = 1
}

export function voiceEnText(text) {
  const trimmed = text.trim()
  if (!trimmed) return
  utteranceEn.text = trimmed
  speechSynthesis.speak(utteranceEn)
}
