const { findAllUsers } = require("../../services/user.services");

const getAllUsersController = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.status(200).json({
      users,
      total: users.length,
      message: "users fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllUsersController;
