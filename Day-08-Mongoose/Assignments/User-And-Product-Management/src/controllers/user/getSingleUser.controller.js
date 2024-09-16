const { findUserById } = require("../../services/user.services");

const getSingleUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user, message: "User fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getSingleUserController;
