const path = require("path");
const fs = require("fs");
const { testEmail } = require("../helpers/email.regex");
const { testPassword } = require("../helpers/password.regex");
const filePath = path.join(__dirname, "../database/db.json");
const data = fs.readFileSync(filePath, "utf-8");

const registerUserController = async (req, res) => {
  try {
    let { users, todos } = JSON.parse(data);

    const { firstName, lastName, email, password } = req.body;
    if (!firstName) {
      return res.status(400).json({ message: "First Name is required" });
    }
    if (!lastName) {
      return res.status(400).json({ message: "Last Name is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (email) {
      if (!testEmail(email)) {
        return res.status(400).json({ message: "Invalid email address" });
      }
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
    if (password) {
      if (!testPassword(password)) {
        return res.status(400).json({
          message:
            "Password must contain at least 8 characters (a-z, A-Z, 0-9, @$!%*?&)",
        });
      }
    }

    const isUserExist = await users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (isUserExist) {
      return res
        .status(400)
        .json({ message: `User already exists with email ${email}` });
    }
    console.log("isUserExist", isUserExist);

    const newUser = {
      id: Math.floor(Math.random() * 1000),
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
    };

    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify({ users, todos }, null, 2));
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { users } = JSON.parse(data);
    const { email, password } = req.body;

    if (!testEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    if (!testPassword(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least 8 characters (a-z, A-Z, 0-9, @$!%*?&)",
      });
    }

    const user = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserController = async (req, res) => {
  try {
    let { users, todos } = JSON.parse(data);
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;
    const user = users.find((user) => user.id === parseInt(id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (firstName) {
      user.firstName = firstName;
    }
    if (lastName) {
      user.lastName = lastName;
    }
    if (email) {
      if (testEmail(email)) {
        user.email = email.toLowerCase();
      } else {
        return res.status(400).json({ message: "Invalid email address" });
      }
    }
    if (password) {
      if (testPassword(password)) {
        user.password = password;
      } else {
        return res.status(400).json({
          message:
            "Password must contain at least 8 characters (a-z, A-Z, 0-9, @$!%*?&)",
        });
      }
    }
    fs.writeFileSync(filePath, JSON.stringify({ users, todos }, null, 2));
    res
      .status(200)
      .json({ message: "User updated successfully", updatedUser: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const { users } = JSON.parse(data);
    res.status(200).json({ users, message: "users fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUserController = async (req, res) => {
  try {
    let { users, todos } = JSON.parse(data);
    const { id } = req.params;
    const user = users.find((user) => user.id === parseInt(id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    users = users.filter((user) => user.id !== parseInt(id));

    fs.writeFileSync(filePath, JSON.stringify({ users, todos }, null, 2));

    res
      .status(200)
      .json({ message: "User deleted successfully", deletedUser: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  updateUserController,
  getAllUsersController,
  deleteUserController,
};
