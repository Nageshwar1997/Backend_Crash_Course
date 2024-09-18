const express = require("express");
const getAllProductsController = require("../controllers/product/getAllProduct.controller");
const getSingleProductController = require("../controllers/product/getSingleProduct.controller");
const addProductController = require("../controllers/product/addProduct.controller");
const updateProductController = require("../controllers/product/updateProduct.controller");
const deleteProductController = require("../controllers/product/deleteProduct.controller");
const authenticate = require("../middlewares/auth.middleware");
const productRouter = express.Router();

productRouter.get("/", getAllProductsController);
productRouter.get("/:id", getSingleProductController);
// Private Routes
productRouter.post("/add", authenticate, addProductController);
productRouter.put("/update/:id", authenticate, updateProductController);
productRouter.delete("/delete/:id", authenticate, deleteProductController);
module.exports = productRouter;
