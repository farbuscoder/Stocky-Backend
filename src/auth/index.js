const express = require("express");

const router = express.Router();

const { AuthController } = require("./controller");

module.exports.AuthAPI = (app) => {
  router.post("/", AuthController.authUser);

  app.use("/api/google-login", router);
};
