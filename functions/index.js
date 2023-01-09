const functions = require("firebase-functions");
const { getMiniCard } = require("./lingvo-api.js");

exports.getMiniCard = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  try {
    const result = await getMiniCard(req.query);
    res.send(result);
  } catch (error) {
    functions.logger.log(`translateCard: Error = ${error}!`);
    res.status(400).send(error);
  }
});
