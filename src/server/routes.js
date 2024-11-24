const { postPredictHandler, predictHistoryHandler } = require("./handler.js");

const routes = [
  {
    path: "/predict",
    method: "POST",
    handler: postPredictHandler,
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
      },
    },
  },
  {
    path: "/predict/histories",
    method: "GET",
    handler: predictHistoryHandler,
  },
];

module.exports = routes;
