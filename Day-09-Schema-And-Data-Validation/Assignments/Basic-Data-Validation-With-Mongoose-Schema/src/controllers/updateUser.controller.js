const { testEmail } = require("../helpers/email.regex");
const { testPassword } = require("../helpers/password.regex");
const testPhone = require("../helpers/phone.regex");
const UserModel = require("../models/user.model");

const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { name, email, phone_number, age, password } = req.body;
    const updatedData = {};

    if (name && name.length < 3) {
      return res
        .status(400)
        .json({ message: "Name should be at least 3 characters long" });
    }

    if (email && !testEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (phone_number && !testPhone(phone_number) && phone_number.length < 10) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    if (age && (age < 18 || age > 65)) {
      return res
        .status(400)
        .json({ message: "Age should be between 18 and 65" });
    }

    if (password && !testPassword(password)) {
      return res.status(400).json({
        message:
          "Password should be at least 6 characters long & contains at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }

    if (name) {
      updatedData.name = name;
    }

    if (email) {
      updatedData.email = email;
    }

    if (phone_number) {
      updatedData.phone_number = phone_number;
    }

    if (age) {
      updatedData.age = age;
    }

    if (password) {
      updatedData.password = password;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(201).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateUserController;
