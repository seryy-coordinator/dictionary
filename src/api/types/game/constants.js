import { game } from './enums'
import { dictionaryCategory } from '../category'

export const games = [
  {
    key: game.CARD,
    title: 'Card',
    description: 'Watch repeat and remember',
    icon: 'style',
    categories: [dictionaryCategory.TERM],
  },
  {
    key: game.MEMORIZATION,
    title: 'Memorization',
    description: 'bla bla bla',
    icon: 'psychology',
    notImplemented: true,
  },
  {
    key: game.SPELLING_AFTER_AUDIO,
    title: 'Spelling (audio)',
    description: 'bla bla bla',
    icon: 'keyboard',
    notImplemented: true,
    exam: true,
    categories: [dictionaryCategory.SPELLING],
  },
  {
    key: game.SPELLING_AFTER_TRANSLATE,
    title: 'Spelling',
    description: 'bla bla bla',
    icon: 'keyboard',
    notImplemented: true,
    exam: true,
    categories: [dictionaryCategory.SPELLING, dictionaryCategory.DEFINITION],
  },
  {
    key: game.QUESTION,
    title: 'Question generator',
    description: 'bla bla bla',
    icon: 'quiz',
    notImplemented: true,
  },
  {
    key: game.READING,
    title: 'Reading',
    description: 'bla bla bla',
    icon: 'auto_stories',
    notImplemented: true,
  },
]
