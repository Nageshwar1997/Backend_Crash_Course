const mongoose = require("mongoose");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { getUserIdFromToken } = require("../providers/jwt.provider");

const findUserByEmail = async (email) => {
  try {
    const user = await UserModel.findOne({ email });

    return user;
  } catch (error) {
    throw new Error(error.message || error);
  }
};
const findUserByPhone = async (phone) => {
  try {
    const user = await UserModel.findOne({ phone });

    return user;
  } catch (error) {
    throw new Error(error.message || error);
  }
};

const createUser = async (user) => {
  try {
    // const newUser = await UserModel.create(user); // OR
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(error.message || error);
  }
};

const findAllUsers = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    throw new Error(error.message || error);
  }
};

const findUserById = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    return user;
  } catch (error) {
    throw new Error(error.message || error);
  }
};

const findUserByToken = async (token) => {
  try {
    const userId = await getUserIdFromToken(token);
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid user ID from token");
    }

    const user = await findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(error.message || "Failed to find user by token");
  }
};


module.exports = {
  findUserByEmail,
  findUserByPhone,
  createUser,
  findAllUsers,
  findUserById,
  findUserByToken,
};
