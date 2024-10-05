const express = require("express");
const {
  createProductController,
  getAllProductsController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
} = require("../controllers/product.controllers");

const productRouter = express.Router();

productRouter.post("/create", createProductController);

productRouter.get("/all", getAllProductsController);

productRouter.get("/product/:id", getSingleProductController);

productRouter.patch("/update/:id", updateProductController);

productRouter.delete("/delete/:id", deleteProductController);

module.exports = productRouter;
