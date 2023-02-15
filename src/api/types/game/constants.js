import { game } from './enums'
import { dictionaryCategory } from '../category'
import { priorityShuffle } from '../../utilities/array'

export const games = [
  {
    key: game.CARDS,
    title: 'Cards',
    description: 'Watch repeat and remember',
    icon: 'style',
    categories: [dictionaryCategory.TERM],
    statisticId: dictionaryCategory.TERM,
    componentName: 'Cards',
    sortCollection: (collection) =>
      priorityShuffle(collection, [
        `statistic[${dictionaryCategory.TERM}].rate`,
        `statistic[${dictionaryCategory.TERM}].fails`,
      ]),
    // recommend: game.MEMORIZATION,
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
