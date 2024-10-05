const ProductModel = require("../models/product.model");

const createProductController = async (req, res) => {
  try {
    const { name, price, brand, description, hasWarranty, rating, reviews } =
      req.body;
    const product = new ProductModel({
      name,
      price,
      brand,
      description,
      hasWarranty,
      rating,
      reviews,
    });

    const savedProduct = await product.save();

    res.status(201).json({
      product: savedProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProductsController = async (req, res) => {
  try {
    const query = req.query;
    let products = [];
    if (Object.keys(query).length > 0) {
      products = await ProductModel.find(query);
    } else {
      products = await ProductModel.find();
    }
    res
      .status(200)
      .json({ products, message: "Products fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product, message: "Product fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const product = await ProductModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.save();

    res.status(200).json({ product, message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProductController,
  getAllProductsController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
};
