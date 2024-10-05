const UserModel = require("../models/user.model");

const createUserController = async (req, res) => {
  try {
    const { name, email, age, password, isMarried, gender } = req.body;

    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = new UserModel({
      name,
      email,
      age,
      password,
      isMarried,
      gender,
    });
    const savedUser = await user.save();
    res
      .status(201)
      .json({ user: savedUser, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const query = req.query;
    let users = [];
    if (Object.keys(query).length > 0) {
      users = await UserModel.find(query);
    } else {
      users = await UserModel.find();
    }
    res.status(200).json({ users, message: "Users fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user, message: "User fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const user = await UserModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.save();

    res.status(200).json({ user, message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUserController,
  getAllUsersController,
  getSingleUserController,
  updateUserController,
  deleteUserController,
};
