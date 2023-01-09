const functions = require("firebase-functions");
const axios = require("axios");

const getCard = ({ Heading, Translation, Type }) => ({ target: Heading, translate: Translation, type: Type });

const apiKey = "YzUxMjI1N2EtYTM2NS00N2EzLWJhOTktNDgyMGFlYzU0YmMyOmFlZDU3MTE2Mzk3NDQ4ZWNhM2JlOWU2MWQ1NGZiN2Q3";

const serviceURL = "https://developers.lingvolive.com/";
const urls = {
  authenticate: `${serviceURL}api/v1.1/authenticate`,
  getMiniCardUrl: ({ text, srcLang, dstLang }) =>
    `${serviceURL}api/v1/Minicard?text=${text}&srcLang=${srcLang}&dstLang=${dstLang}`,
};

let token = null;

async function authenticate() {
  const headers = {
    Authorization: `Basic ${apiKey}`,
  };
  const result = await axios.post(urls.authenticate, null, { headers });
  token = result.data;
  functions.logger.log(`authenticate: 'token' = ${token}`);
}

// ToDo will implemented later
function getTranslation() {}

async function getMiniCard({ text }) {
  if (!token) {
    await authenticate();
  }
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const url = urls.getMiniCardUrl({ text, srcLang: 1033, dstLang: 1049 });
  const result = await axios.get(url, { headers });
  return getCard(result.data.Translation);
}

// ToDo will implemented later
function getSuggest() {}

module.exports = {
  getMiniCard,
};
