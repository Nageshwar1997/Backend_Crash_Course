const { model } = require("mongoose");
const productSchema = require("../schemas/product.schema");

const ProductModel = model("Product", productSchema);

module.exports = ProductModel;
