const express = require("express");

const router = express.Router();

const { ProductsController } = require("./controller");

module.exports.ProductsAPI = (app) => {
  router
    .get("/", ProductsController.getProducts)
    .get("/report", ProductsController.generateReport)
    .get("/categoria/:category", ProductsController.getProductByCategory)
    .get("/marca/:brand", ProductsController.getProductByBrand)
    .get("/cantidad/:cantidad", ProductsController.getProductByQty)
    .get("/precio/:precio", ProductsController.getProductByPrice)
    .get("/:id", ProductsController.getProduct)
    .post("/", ProductsController.createProducts)
    .put("/:id", ProductsController.modifyProduct)
    .delete("/:id", ProductsController.deleteProduct);

  app.use("/api/products", router);
};
