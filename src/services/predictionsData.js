const { Firestore } = require("@google-cloud/firestore");

async function predictionsData() {
  const db = new Firestore();
  const predictCollection = db.collection("predictions");

  const predictions = await predictCollection.get();
  return predictions;
}
module.exports = predictionsData;
