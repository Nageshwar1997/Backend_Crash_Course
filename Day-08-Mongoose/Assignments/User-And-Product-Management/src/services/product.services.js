const ProductModel = require("../models/product.model");

const addProduct = async (product) => {
  try {
    // const newProduct = await ProductModel.create(product); // OR
    const newProduct = new ProductModel(product);
    await newProduct.save();

    return newProduct;
  } catch (error) {
    throw new Error(error.message || "Failed to add product");
  }
};

const getAllProducts = async () => {
  try {
    const products = await ProductModel.find();
    if (!products) {
      throw new Error("No products found");
    }
    return products;
  } catch (error) {
    throw new Error(error.message || "Failed to get products");
  }
};
const getSingleProduct = async (id) => {
  try {
    const product = await ProductModel.findOne({ _id: id }); // OR
    //   const product = await ProductModel.findById(id);
    console.log("product", product);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error(error.message || "Failed to get product");
  }
};

const updateProduct = async (id, updatedData) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error(error.message || "Failed to update product");
  }
};

const deleteProduct = async (id) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new Error("Product not found");
    }
    return deletedProduct;
  } catch (error) {
    throw new Error(error.message || "Failed to delete product");
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
