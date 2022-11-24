const debug = require("debug")("app:module-users-controller");
const createError = require("http-errors");

const { UsersService } = require("./services");
const { Response } = require("../common/response");

module.exports.UsersController = {
  getUsers: async (req, res) => {
    try {
      let users = await UsersService.getAll();
      Response.success(res, 200, "Lista de Usuarios", users);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;

      let user = await UsersService.getById(id);
      if (!user) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `User ${id}`, user);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createUser: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await UsersService.create(body);
        Response.success(res, 201, "Usuario agregado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  //Update
  modUser: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const modifiedUser = await UsersService.modById(id, body);
        Response.success(
          res,
          201,
          { message: `User ${id} fue modificado` },
          modifiedUser
        );
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  //Delete

  deleteUser: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;

      let user = await UsersService.deleteById(id, body);
      if (!user) {
        Response.error(res, new createError.BadRequest());
      } else {
        Response.success(res, 200, `User ${id} was delete`, "");
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
