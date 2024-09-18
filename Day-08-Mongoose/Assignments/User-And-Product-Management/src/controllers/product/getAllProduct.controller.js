const { getAllProducts } = require("../../services/product.services");

const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProducts();
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }

    res
      .status(200)
      .json({ products, message: "Products fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllProductsController;
