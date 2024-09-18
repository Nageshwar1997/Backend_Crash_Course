const { addProduct } = require("../../services/product.services");

const addProductController = async (req, res) => {
  try {
    const {
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
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!brand) {
      return res.status(400).json({ message: "Brand is required" });
    }
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }
    if (!sellingPrice) {
      return res.status(400).json({ message: "Selling Price is required" });
    }
    if (!originalPrice) {
      return res.status(400).json({ message: "Original Price is required" });
    }
    if (!description) {
      return res.status(400).json({ message: "Description is required" });
    }
    if (!color) {
      return res.status(400).json({ message: "Color is required" });
    }
    if (!images || images.length === 0) {
      return res.status(400).json({ message: "Images are required" });
    }
    if (!rating) {
      return res.status(400).json({ message: "Rating is required" });
    }
    if (!stock) {
      return res.status(400).json({ message: "Stock is required" });
    }

    const newProduct = await addProduct({
      title: title.trim().toLowerCase(),
      brand: brand.trim().toLowerCase(),
      category: category.trim().toLowerCase(),
      sellingPrice,
      originalPrice,
      discount: `${Math.floor(
        ((originalPrice - sellingPrice) / originalPrice) * 100
      )}%`,
      description: description.trim().toLowerCase(),
      color: color.trim().toLowerCase(),
      images: images.filter((image) => image.trim().length > 0),
      rating,
      stock,
    });

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
module.exports = addProductController;
