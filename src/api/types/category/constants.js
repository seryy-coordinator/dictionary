import { dictionaryCategory } from './enums'

export const dictionaryCategories = [
  {
    value: dictionaryCategory.TERM,
    label: 'Term',
    icon: 'move_up',
    image: '',
    description: 'Foreign words and short phrases that you cannot translate into your native language',
  },
  {
    value: dictionaryCategory.DEFINITION,
    label: 'Definition',
    icon: 'move_down',
    image: '',
    description: "Words you can't translate into a foreign language",
  },
  {
    value: dictionaryCategory.PRONUNCIATION,
    label: 'Pronunciation',
    icon: 'headphones',
    image: '',
    description: 'Foreign words that you find difficult to pronounce',
  },
  {
    value: dictionaryCategory.SPELLING,
    label: 'Spelling',
    icon: 'text_fields',
    image: '',
    description: 'Foreign words that you find difficult to write',
  },
  // {
  //   value: dictionaryCategory.PHRASE,
  //   label: 'Phrase',
  //   icon: 'translate',
  //   image: '',
  //   description: 'Long phrases',
  // },
]
