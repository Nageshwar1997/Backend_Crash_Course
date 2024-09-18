const { getSingleProduct } = require("../../services/product.services");

const getSingleProductController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product id is required" });
    }
    const product = await getSingleProduct(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product, message: "Product fetched successfully" });
  } catch(error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getSingleProductController;
