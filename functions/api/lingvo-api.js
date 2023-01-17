const axios = require("axios");
const { lingvoApiKey } = require("./.config");

const urls = {
  authenticate: "https://developers.lingvolive.com/api/v1.1/authenticate",
  getUrl: (action) => `https://developers.lingvolive.com/api/v1/${action}`,
};

/**
 * HTTP get request.
 * @param {string} token The authorization token.
 * @param {string} action The action name for URL.
 * @param {object} options The options for GET request.
 * @return {object} The api response.
 */
async function httpGet(token, action, options) {
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const url = urls.getUrl(action);
  const result = await axios.get(url, { headers, params: options });
  return result.data;
}

/**
 * Authenticate to Lingvo API.
 * @return {string} The authorization token.
 */
async function authenticate() {
  const headers = {
    Authorization: `Basic ${lingvoApiKey}`,
  };
  const result = await axios.post(urls.authenticate, null, { headers });
  return result.data;
}

/**
 * Get full information about translation.
 * @param {string} token The authorization token.
 * @param {{ text, srcLang, dstLang }} options The options for GET request.
 * @return {object} The full information.
 */
const getTranslation = (token, options) => httpGet(token, "Translation", options);

/**
 * Get short information about translation.
 * @param {string} token The authorization token.
 * @param {{ text, srcLang, dstLang }} options The options for GET request.
 * @return {object} The short information.
 */
const getMiniCard = (token, options) => httpGet(token, "Minicard", options);

/**
 * Get short information about translation.
 * @param {string} token The authorization token.
 * @param {{ text, srcLang, dstLang }} options The options for GET request.
 * @return {array} The suggested words.
 */
const getSuggest = (token, options) => httpGet(token, "Suggests", options);

/**
 * Get full information about translation from article.
 * @param {string} token The authorization token.
 * @param {{ heading, srcLang, dstLang, dict }} options The options for GET request.
 * @return {object} The full information from article.
 */
const getArticle = (token, options) => httpGet(token, "Article", options);

/**
 * Get word list.
 * @param {string} token The authorization token.
 * @param {{ prefix, srcLang, dstLang, pageSize }} options The options for GET request.
 * @return {array} The word list.
 */
const getWordList = (token, options) => httpGet(token, "WordList", options);

module.exports = {
  authenticate,
  getMiniCard,
  getSuggest,
  getTranslation,
  getArticle,
  getWordList,
};
