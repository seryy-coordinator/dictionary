import { Cookies } from './cookies'

export const LocalStorage = new Proxy(
  {},
  {
    get: (_, prop) => {
      const result = typeof Storage !== 'undefined' ? localStorage[prop] : Cookies[prop]
      return result && JSON.parse(result)
    },
    set: (_, prop, value) => {
      if (typeof Storage !== 'undefined') {
        const json = JSON.stringify(value)
        localStorage.setItem(prop, json)
      } else {
        Cookies[prop] = value
      }
      return true
    },
    deleteProperty: (_, prop) => {
      if (typeof Storage !== 'undefined') {
        localStorage.removeItem(prop)
      } else {
        delete Cookies[prop]
      }
    },
    has: (target, prop) => {
      return target[prop] !== undefined
    },
    ownKeys: () => {
      const reg = /(?:^|; )([^;]*)=[^;]*/g
      const keys = []
      let matches
      do {
        matches = reg.exec(document.cookie)
        if (matches) {
          keys.push(matches[1])
        }
      } while (matches)
      return keys
    },
    getOwnPropertyDescriptor: () => {
      return {
        enumerable: true,
        configurable: true,
      }
    },
  }
)
