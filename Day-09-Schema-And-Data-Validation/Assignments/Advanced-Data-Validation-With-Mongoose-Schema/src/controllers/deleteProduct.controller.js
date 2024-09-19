const {
  getSingleProductService,
  deleteProductService,
} = require("../services/product.services");

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "Please provide a valid id" });
    }

    const product = await getSingleProductService(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const deletedProduct = await deleteProductService(id);

    res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteProductController;
