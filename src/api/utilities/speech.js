import { random } from 'lodash-es'

const synth = window.speechSynthesis
const utteranceEn = new SpeechSynthesisUtterance()
const utteranceRu = new SpeechSynthesisUtterance()

export const voiceData = {
  get all() {
    return synth.getVoices()
  },
  get US() {
    return this.getVoicesByLang('us')
  },
  get GB() {
    return this.getVoicesByLang('gb')
  },
  get RU() {
    return this.getVoicesByLang('ru')
  },

  get activeEn() {
    return utteranceEn.voice
  },
  get activeRu() {
    return utteranceRu.voice
  },

  getVoicesByLang(langPrefix) {
    return this.all.filter(({ lang }) => lang.toLowerCase().includes(langPrefix))
  },
  onvoiceschanged: false,
  voiceschanged: false,
}
let previous = null

initializeUtterances()
if (speechSynthesis.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = () => {
    voiceData.onvoiceschanged = true
    initializeUtterances()
  }
}
synth.addEventListener('voiceschanged', () => {
  voiceData.voiceschanged = true
  initializeUtterances()
})

export function initializeUtterances() {
  initializeUtterance(utteranceEn, voiceData.US.length ? voiceData.US : voiceData.GB)
  initializeUtterance(utteranceRu, voiceData.RU)
}

function initializeUtterance(utterance, voices) {
  if (voices.length) {
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
}

function voiceText(text, utterance) {
  const trimmed = text.trim()
  if (!trimmed || (synth.speaking && previous === utterance && utterance.text === trimmed)) return
  utterance.text = trimmed
  synth.speak(utterance)
  previous = utterance
}

export const voiceEnText = (text) => voiceText(text, utteranceEn)
export const voiceRuText = (text) => voiceText(text, utteranceRu)
