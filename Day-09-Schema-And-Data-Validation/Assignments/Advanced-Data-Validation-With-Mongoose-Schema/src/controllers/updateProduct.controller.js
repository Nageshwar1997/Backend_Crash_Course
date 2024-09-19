const {
  getSingleProductService,
  updateProductService,
} = require("../services/product.services");

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "Please provide a valid id" });
    }
    const product = await getSingleProductService(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { productName, price, category, stock, SKU, tags } = req.body;

    const updatingProduct = {};

    if (productName) {
      if (typeof productName === "string" && productName.length < 50) {
        updatingProduct.productName = productName.trim();
      } else {
        return res
          .status(400)
          .json({ message: "Product name should be less than 50 characters" });
      }
    }
    if (price) {
      if (price === "number" && price > 0) {
        updatingProduct.price = price;
      } else {
        return res.status(400).json({
          message: "Product price should be positive number and greater than 0",
        });
      }
    }
    if (category && typeof category === "string") {
      if (
        ["Electronics", "Clothing", "Books", "Home Appliances"].includes(
          category
        )
      ) {
        updatingProduct.category = category;
      } else {
        return res.status(400).json({ message: "Invalid category" });
      }
    }
    if (stock && typeof stock === "number") {
      if (stock > 0) {
        updatingProduct.stock = stock;
      } else {
        return res.status(400).json({
          message: "Product stock should be positive number",
        });
      }
    }
    if (SKU && typeof SKU === "string") {
      if (SKU.match(/^PROD-[a-zA-Z0-9]{4}$/)) {
        updatingProduct.SKU = SKU;
      } else {
        return res.status(400).json({
          message:
            "Product SKU must follow the pattern PROD-XXXX & not contain special characters",
        });
      }
    }
    if (tags && tags.length > 0 && Array.isArray(tags)) {
      if (tags.some((tag) => /^[a-zA-Z0-9]+$/.test(tag))) {
        updatingProduct.tags = tags;
      } else {
        return res.status(400).json({
          message:
            "Product tags must be an array of unique strings and not contain special characters, space or empty string",
        });
      }
      }
    const updatedProduct = await updateProductService(id, updatingProduct);
    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateProductController;
