const { getAllProductsService } = require("../services/product.services");

const getAllProductsController = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res
      .status(200)
      .json({ products, message: "Products fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllProductsController;
