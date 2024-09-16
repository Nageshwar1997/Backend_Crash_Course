const UserModel = require("../../models/user.model");
const { findUserById } = require("../../services/user.services");

const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
      const user = await findUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = await UserModel.findByIdAndDelete(id);

    res.status(200).json({ deletedUser, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteUserController;
