const UserModel = require("../models/user.model");

const getAllUsersController = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ users, message: "Users fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllUsersController;
