import { random } from 'lodash-es'

const utteranceEn = new SpeechSynthesisUtterance()
const utteranceRu = new SpeechSynthesisUtterance()
let previous = null

speechSynthesis.onvoiceschanged = initializeUtterances

export function initializeUtterances() {
  initializeUtterance(utteranceEn, 'en-US')
  initializeUtterance(utteranceRu, 'ru-RU')
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

function voiceText(text, utterance) {
  const trimmed = text.trim()
  if (!trimmed || (speechSynthesis.speaking && previous === utterance && utterance.text === trimmed)) return
  utterance.text = trimmed
  speechSynthesis.speak(utterance)
  previous = utterance
}

export const voiceEnText = (text) => voiceText(text, utteranceEn)
export const voiceRuText = (text) => voiceText(text, utteranceRu)
