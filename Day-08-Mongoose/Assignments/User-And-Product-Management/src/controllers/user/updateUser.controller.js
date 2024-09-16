const bcrypt = require("bcryptjs");
const { testEmail } = require("../../helpers/email.regex");
const { testPassword } = require("../../helpers/password.regex");
const UserModel = require("../../models/user.model");
const {
  findUserById,
  findUserByEmail,
  findUserByPhone,
} = require("../../services/user.services");
const testPhone = require("../../helpers/phone.regex");

const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password, phone } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: "User Id is required & key should be id" });
    }
    if (!firstName && !lastName && !email && !password && !phone) {
      return res.status(400).json({
        message:
          "No data found to update. Please provide at least one field to update",
      });
    }
    const newData = {};
    if (firstName) {
      newData.firstName = firstName.trim().toLowerCase();
    }
    if (lastName) {
      newData.lastName = lastName.trim().toLowerCase();
    }
    if (email) {
      if (testEmail(email)) {
        newData.email = email.trim().toLowerCase();
      } else {
        return res.status(400).json({ message: "Invalid email address" });
      }
    }
    if (password) {
      if (testPassword(password)) {
        const hashedPassword = await bcrypt.hash(password, 10);
        newData.password = hashedPassword;
      } else {
        return res.status(400).json({
          message:
            "Password must contain at least 8 characters (a-z, A-Z, 0-9, @$!%*?&)",
        });
      }
    }
    if (phone && typeof phone === "number") {
      if (testPhone(phone)) {
        newData.phone = phone;
      } else {
        return res.status(400).json({
          message:
            "Invalid phone number, phone number contains 10 digits only & type should be number",
        });
      }
    }
    const existingUser = await findUserById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (
      newData.email &&
      (await findUserByEmail(newData.email)) &&
      newData.email === existingUser.email
    ) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (
      newData.phone &&
      (await findUserByPhone(newData.phone)) &&
      newData.phone === existingUser.phone
    ) {
      return res.status(400).json({ message: "Phone already exists" });
    }
    const user = await UserModel.findByIdAndUpdate(id, newData, { new: true });
    res.status(200).json({ user, message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateUserController;
