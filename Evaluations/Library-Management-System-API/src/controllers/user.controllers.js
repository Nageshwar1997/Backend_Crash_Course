var bcrypt = require("bcryptjs");

const UserModel = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
      res.status(404).send("User Not Found");
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, password, name, email } = req.body;
    const { id } = req.params;
    const updatedUser = {};
    if (username) {
      updatedUser.username = username;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password.trim(), 10);
      updatedUser.password = hashedPassword;
    }
    if (name) {
      updatedUser.name = name;
    }
    if (email) {
      updatedUser.email = email;
    }

    const isUserExist = await UserModel.findById(id);
    if (!isUserExist) {
      return res.status(404).send("User not found");
    }

    const user = await UserModel.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });

    const savedUser = await user.save();

    res.status(201).json({
      message: "User Updated Successfully",
      user: {
        name: savedUser.name,
        email: savedUser.email,
        username: savedUser.username,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const isUserExist = await UserModel.findById(id);
    if (!isUserExist) {
      return res.status(404).send("User not found");
    }

    const deletedUser = await UserModel.findByIdAndDelete(id);

    res.status(202).json({
      message: "User Deleted successfully",
      deletedUser: deletedUser.username,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
