module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    quotes: ["error", "double"],
    "quote-props": ["error", "as-needed"],
    "object-curly-spacing": ["error", "always", { objectsInObjects: false }],
    "max-len": ["error", { code: 120 }],
  },
};
