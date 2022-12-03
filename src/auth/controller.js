const dotenv = require("dotenv");

const { OAuth2Client } = require("google-auth-library");

dotenv.config();
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const users = [];

function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);

  if (i > -1) array[i] = item;
  else array.push(item);
}

module.exports.AuthController = {
  authUser: async (req, res) => {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();

    upsert(users, { name, email, picture });
    res.status(201);

    res.json({ name, email, picture });
  },
};
