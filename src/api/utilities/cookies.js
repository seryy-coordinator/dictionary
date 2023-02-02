export const Cookies = new Proxy(
  {},
  {
    get: (_, prop) => {
      const key = prop.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1')
      const matches = document.cookie.match(new RegExp(`(?:^|; )${key}=([^;]*)`))
      return matches ? decodeURIComponent(matches[1]) : undefined
    },
    set: (_, prop, value) => {
      document.cookie = `${prop}=${value}`
    },
    deleteProperty: (_, prop) => {
      document.cookie = `${prop}=; max-age=0`
    },
    has: (_, prop) => {
      const key = prop.replace(/([.$?*|{}()[]\\\/\+^])/g, '\\$1')
      return new RegExp(`(?:^|; )(${key}=)([^;]*)`).test(document.cookie)
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
