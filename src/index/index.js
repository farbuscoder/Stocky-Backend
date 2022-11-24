const express = require("express");
const createError = require("http-errors");

const { Response } = require("../common/response");

module.exports.IndexApi = (app) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    const menu = {
      products: `https://${req.headers.host}/api/products`,
    };

    Response.success(res, 200, "API inventario", menu);
  });

  app.use("/", router);
};

module.exports.NotFoundApi = (app) => {
  const router = express.Router();

  router.all("*", (req, res) => {
    Response.error(res, new createError.NotFound());
  });

  app.use("/", router);
};
