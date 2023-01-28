const functions = require("firebase-functions");
const lingvoService = require("./services/lingvoService.js");

/**
 * Get full information about translation.
 * @param {function} serviceMethod The service method that should be called.
 * @return {function} HTTPS function.
 */
function constructGETRequest(serviceMethod) {
  return functions.https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET");
    res.set("Access-Control-Allow-Headers", "Content-Type");
    try {
      const result = await serviceMethod(req.query);
      res.send(result);
    } catch (error) {
      functions.logger.log(`Error = ${error}!`);
      // ToDo we need logs
      res.send(null);
    }
  });
}

exports.getMiniCard = constructGETRequest(lingvoService.getMiniCard);

exports.getMiniCards = constructGETRequest(lingvoService.getMiniCards);

exports.getTranscription = constructGETRequest(lingvoService.getTranscription);
