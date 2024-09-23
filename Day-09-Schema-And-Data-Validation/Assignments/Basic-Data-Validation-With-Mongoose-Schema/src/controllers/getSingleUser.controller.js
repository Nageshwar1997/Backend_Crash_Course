const UserModel = require("../models/user.model");

const getSingleUserController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    res.status(200).json({ user, message: "User fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getSingleUserController;
