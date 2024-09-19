const { Router } = require("express");
const addProductController = require("../controllers/addProduct.controller");
const getAllProductsController = require("../controllers/getAllProducts.controller");
const getSingleProductController = require("../controllers/getSingleProduct.controller");
const updateProductController = require("../controllers/updateProduct.controller");
const deleteProductController = require("../controllers/deleteProduct.controller");

const router = Router();

router.post("/add", addProductController);
router.get("/", getAllProductsController);
router.get("/:id", getSingleProductController);
router.put("/update/:id", updateProductController);
router.delete("/delete/:id", deleteProductController);

module.exports = router;
