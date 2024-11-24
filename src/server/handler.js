const predictClassification = require("../services/inferenceService.js");
const crypto = require("crypto");
const storeData = require("../services/storeData.js");
const predictionsData = require("../services/predictionsData.js");

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { confidenceScore, label, suggestion } = await predictClassification(
    model,
    image
  );
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    result: label,
    suggestion: suggestion,
    createdAt: createdAt,
  };

  await storeData(id, data);

  const response = h.response({
    status: "success",
    message: "Model is predicted successfully",
    data,
  });
  response.code(201);
  return response;
}

async function predictHistoryHandler(request, h) {
  const predictions = await predictionsData();
  const formatData = [];
  predictions.forEach((doc) => {
    const data = doc.data();
    formatData.push({
      id: doc.id,
      history: {
        result: data.result,
        createdAt: data.createdAt,
        suggestion: data.suggestion,
        id: doc.id,
      },
    });
  });
  const response = h.response({
    status: "success",
    data: formatData,
  });
  return response;
}
module.exports = { postPredictHandler, predictHistoryHandler };
