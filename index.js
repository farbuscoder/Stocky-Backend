const express = require("express");
const debug = require("debug")("app:server");

const { Config } = require("./src/config/index.js");
const { ProductsAPI } = require("./src/products/index");
const { UsersAPI } = require("./src/users/index");
const { IndexApi, NotFoundApi } = require("./src/index/index.js");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

IndexApi(app);
ProductsAPI(app);
UsersAPI(app);
NotFoundApi(app);

// Modules

app.listen(Config.port, () => {
  debug(`Servidor escuchando en el puerto ${Config.port}`);
});
