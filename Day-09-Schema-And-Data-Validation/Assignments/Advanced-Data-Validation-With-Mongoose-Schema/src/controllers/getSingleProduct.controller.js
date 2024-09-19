const { getSingleProductService } = require("../services/product.services");

const getSingleProductController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "Please provide a valid id" });
    }
    const product = await getSingleProductService(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product fetched successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = getSingleProductController;
