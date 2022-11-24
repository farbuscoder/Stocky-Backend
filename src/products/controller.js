const debug = require("debug")("app:module-products-controller");
const createError = require("http-errors");

const { ProductsService } = require("./services");
const { Response } = require("../common/response");

module.exports.ProductsController = {
  getProducts: async (req, res) => {
    try {
      let products = await ProductsService.getAll();
      Response.success(res, 200, "Lista de Productos", products);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getProduct: async (req, res) => {
    try {
      const {
        params: { id },
      } = req;

      let product = await ProductsService.getById(id);
      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Producto ${id}`, product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  getProductByCategory: async (req, res) => {
    try {
      const {
        params: { category },
      } = req;

      let product = await ProductsService.getByCategory(category);

      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Producto ${category}`, product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  getProductByBrand: async (req, res) => {
    try {
      const {
        params: { brand },
      } = req;

      let product = await ProductsService.getByBrand(brand);

      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Productos de la marca: ${brand}`, product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  getProductByQty: async (req, res) => {
    try {
      const {
        params: { cantidad },
      } = req;

      let qty = Number(cantidad);

      let product = await ProductsService.getByQty(qty);

      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(
          res,
          200,
          `Productos con cantidad menor a: ${cantidad}`,
          product
        );
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  getProductByPrice: async (req, res) => {
    try {
      const {
        params: { precio },
      } = req;

      let price = Number(precio);

      let product = await ProductsService.getByPrice(price);

      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(
          res,
          200,
          `Productos con precio menor a: ${precio}`,
          product
        );
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  createProducts: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const insertedId = await ProductsService.create(body);
        Response.success(res, 201, "Producto agregado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  //Update

  modifyProduct: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        const modifiedId = await ProductsService.modify(id, body);
        Response.success(
          res,
          201,
          `Producto ${id} fue correctamente modificado`,
          body
        );
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  //Delete

  deleteProduct: async (req, res) => {
    try {
      const {
        body,
        params: { id },
      } = req;

      let product = await ProductsService.deleteById(id, body);
      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(
          res,
          200,
          `Producto ${id} eliminado correctamente`,
          product
        );
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },

  generateReport: (req, res) => {
    try {
      ProductsService.generateReport("Inventario", res);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
