const { listenerCount } = require("../models/product.model");
const { addProductService } = require("../services/product.services");

const addProductController = async (req, res) => {
  try {
    let { productName, price, category, stock, SKU, tags } = req.body;
    if (!productName) {
      return res.status(400).json({ message: "Product name is required" });
    }
    if (productName && productName.length > 50) {
      return res
        .status(400)
        .json({ message: "Product name should be less than 50 characters" });
    }
    if (!price) {
      return res.status(400).json({ message: "Product price is required" });
    }
    if (price && price < 1) {
      return res.status(400).json({
        message: "Product price should be positive number and greater than 0",
      });
    }

    if (!category) {
      return res.status(400).json({ message: "Product category is required" });
    }
    if (
      category &&
      !["Electronics", "Clothing", "Books", "Home Appliances"].includes(
        category
      )
    ) {
      return res.status(400).json({ message: "Invalid category" });
    }
    if (!stock) {
      return res.status(400).json({ message: "Product stock is required" });
    }
    if (stock && stock < 0) {
      return res.status(400).json({
        message: "Product stock should be positive number",
      });
    }
    if (!SKU) {
      return res.status(400).json({ message: "Product SKU is required" });
    }
    if (SKU && typeof SKU === "string") {
      if (!SKU.match(/^PROD-[a-zA-Z0-9]{4}$/)) {
        return res.status(400).json({
          message:
            "Product SKU must follow the pattern PROD-XXXX & not contain special characters",
        });
      }
    }

    if (!tags || tags.length === 0) {
      return res.status(400).json({ message: "Product tags are required" });
    }

    if (tags.length > 0) {
      if (tags.some((tag) => !/^[a-zA-Z0-9]+$/.test(tag))) {
        return res.status(400).json({
          message:
            "Product tags must be an array of unique strings and not contain special characters, space or empty string",
        });
      }
    }

    productName = productName.trim();
    const newProduct = await addProductService({
      productName,
      price,
      category,
      stock,
      SKU,
      tags,
    });

    res
      .status(201)
      .json({ product: newProduct, message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = addProductController;
