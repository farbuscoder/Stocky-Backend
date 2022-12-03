const express = require("express");
const debug = require("debug")("app:server");
const path = require("path");
const { OAuth2Client } = require("google-auth-library");
const { Config } = require("./src/config/index.js");
const { ProductsAPI } = require("./src/products/index");
const { UsersAPI } = require("./src/users/index");
const { IndexApi, NotFoundApi } = require("./src/index/index.js");
const cors = require("cors");

const app = express();
dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

app.use(express.json());
app.use(cors());

IndexApi(app);
ProductsAPI(app);
UsersAPI(app);
NotFoundApi(app);

const users = [];

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);

  if (i > -1) array[i] = item;
  else array.push(item);
}

app.post("/api/google-login", async (req, res) => {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  const { name, email, picture } = ticket.getPayload();

  upsert(users, { name, email, picture });
  res.status(201);

  res.json({ name, email, picture });
});

// Modules

app.listen(Config.port, () => {
  debug(`Servidor escuchando en el puerto ${Config.port}`);
});
