const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError.js");

async function predictClassification(model, image) {
  try {
    if (image.length > 1024 * 1024) {
      throw new InputError(
        "Payload content length greater than maximum allowed: 1000000"
      );
    }
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    if (confidenceScore > 1) {
      const label = "Cancer";
      const suggestion = "Segera periksa ke dokter!";
      return { confidenceScore, label, suggestion };
    }

    const label = "Non-cancer";
    const suggestion = "Penyakit kanker tidak terdeteksi.";

    return { confidenceScore, label, suggestion };
  } catch (error) {
    throw new InputError("Terjadi kesalahan dalam melakukan prediksi");
  }
}
module.exports = predictClassification;
