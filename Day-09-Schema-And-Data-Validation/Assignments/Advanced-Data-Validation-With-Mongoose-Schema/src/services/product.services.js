const ProductModel = require("../models/product.model");

const addProductService = async (data) => {
  try {
    const product = await ProductModel.create(data);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getAllProductsService = async () => {
  try {
    const products = await ProductModel.find();
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getSingleProductService = async (productId) => {
  try {
    // const product = await ProductModel.findOne({ _id: productId }) // OR
    const product = await ProductModel.findById(productId);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};
const updateProductService = async (productId, updatedData) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      productId,
      updatedData,
      {
        new: true,
      }
    );
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
};
const deleteProductService = async (productId) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    return deletedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  addProductService,
  getAllProductsService,
  getSingleProductService,
  updateProductService,
  deleteProductService,
};
