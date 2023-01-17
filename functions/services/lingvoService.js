const {
  authenticate,
  getMiniCard,
  getWordList,
  getArticle,
  getSuggest,
  getTranslation,
} = require("../api/lingvo-api.js");
const { languageCodes } = require("../api/enums");

const findMarkup = (markup, node) => {
  for (let i = 0; i < markup.length; i++) {
    const selected = markup[i];
    if (selected.Node === node) {
      return selected;
    }
    return findMarkup(selected.Markup, node);
  }
};

module.exports = {
  async getMiniCard({ text, srcLang = languageCodes.RUS, dstLang = languageCodes.ENG }) {
    const token = await authenticate();
    const result = await getMiniCard(token, { text, srcLang, dstLang });
    const { Heading: target, Translation: translate } = result.Translation;
    return {
      target,
      translate,
    };
  },
  async getMiniCards({ text, srcLang = languageCodes.RUS, dstLang = languageCodes.ENG }) {
    const token = await authenticate();
    const pageSize = 10;
    const result = await getWordList(token, { prefix: text, srcLang, dstLang, pageSize });
    return result.Headings.map(({ Heading: target, Translation: translate }) => ({
      target,
      translate,
    }));
  },
  async getTranscription({ text, srcLang = languageCodes.RUS, dstLang = languageCodes.ENG }) {
    const token = await authenticate();
    const dict = "LingvoUniversal (En-Ru)";
    const result = await getArticle(token, { heading: text, srcLang, dstLang, dict });
    const transcription = findMarkup(result.Body, "Transcription");
    return transcription?.Text ?? null;
  },
  async getSuggest({ text, srcLang = languageCodes.RUS, dstLang = languageCodes.ENG }) {
    const token = await authenticate();
    const result = await getSuggest(token, { text, srcLang, dstLang });
    return result;
  },
  async getTranslation({ text, srcLang = languageCodes.RUS, dstLang = languageCodes.ENG }) {
    const token = await authenticate();
    const result = await getTranslation(token, { text, srcLang, dstLang });
    return result;
  },
};
