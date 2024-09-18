const { deleteProduct } = require("../../services/product.services");

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product id is required" });
    }
    const deletedProduct = await deleteProduct(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

module.exports = deleteProductController;
