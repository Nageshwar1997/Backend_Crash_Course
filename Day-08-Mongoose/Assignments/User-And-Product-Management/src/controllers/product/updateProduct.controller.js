const { updateProduct } = require("../../services/product.services");

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product id is required" });
    }
    let {
      title,
      brand,
      category,
      sellingPrice,
      originalPrice,
      description,
      color,
      images,
      rating,
      stock,
    } = req.body;
    const updatingProduct = {};
    if (title) {
      updatingProduct.title = title.trim().toLowerCase();
    }
    if (brand) {
      updatingProduct.brand = brand.trim().toLowerCase();
    }
    if (category) {
      updatingProduct.category = category.trim().toLowerCase();
    }
    if (sellingPrice) {
      updatingProduct.sellingPrice = sellingPrice;
    }
    if (originalPrice) {
      updatingProduct.originalPrice = originalPrice;
    }
    if (description) {
      updatingProduct.description = description.trim().toLowerCase();
    }
    if (color) {
      updatingProduct.color = color.trim().toLowerCase();
    }
    if (images) {
      updatingProduct.images = images.filter(
        (image) => image.trim().length > 0
      );
    }
    if (rating) {
      updatingProduct.rating = rating;
    }
    if (stock) {
      updatingProduct.stock = stock;
    }
    if (sellingPrice && originalPrice && parseInt(sellingPrice) <= parseInt(originalPrice)) {
      updatingProduct.discount = `${Math.floor(
        ((parseInt(originalPrice) - parseInt(sellingPrice)) / parseInt(originalPrice)) * 100
      )}%`;
    }

    const updatedProduct = await updateProduct(id, updatingProduct);

    res
      .status(200)
      .json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to update product" });
  }
};

module.exports = updateProductController;
