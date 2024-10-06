const UserModel = require("../models/user.model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken.util");

const registerUserController = async (req, res) => {
  try {
    const { username, password, name, email } = req.body;
    if (!username || !password || !name || !email) {
      return res.status(401).send("All fields are required");
    }

    const isUsernameExist = await UserModel.findOne({ username });
    if (isUsernameExist) {
      return res.status(401).send("User is already exist with this username");
    }

    const isEmailExist = await UserModel.findOne({ email });
    if (isEmailExist) {
      return res.status(401).send("User is already exist with this email");
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const user = new UserModel({ ...req.body, password: hashedPassword });

    await user.save();

    const token = await generateToken(user._id);

    res.status(201).json({
      user: {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
      message: "User Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!password || !username) {
      return res.status(401).send("All fields are required");
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword) {
      return res.status(403).send("Incorrect Password");
    }

    const token = await generateToken(user._id);
    if (!token) {
      return res.status(403).send("Failed to generate a token");
    }

    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
      message: "User LoggedIn Successfully",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { registerUserController, loginUserController };
