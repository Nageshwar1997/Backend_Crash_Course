const { testEmail } = require("../helpers/email.regex");
const { testPassword } = require("../helpers/password.regex");
const testPhone = require("../helpers/phone.regex");
const UserModel = require("../models/user.model");

const loginController = async (req, res) => {
  let user = null;
  try {
    const { email, phone_number, password } = req.body;
    if (!email && !phone_number) {
      return res.status(400).json({
        errors: [
          "Email/phone_number is required",
          `Key should be "email/phone_number"`,
        ],
      });
    }
    if (email && !testEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (email && testEmail(email)) {
      user = await UserModel.findOne({ email });
    }
    if (phone_number && !testPhone(phone_number) && phone_number.length < 10) {
      return res.status(400).json({ message: "Invalid phone number" });
    }
    if (phone_number && testPhone(phone_number) && phone_number.length === 10) {
      user = await UserModel.findOne({ phone_number });
    }
    if (!password) {
      return res.status(400).json({
        errors: ["Password is required", `Key should be "password"`],
      });
    }
    if (password && !testPassword(password)) {
      return res.status(400).json({
        message:
          "Password should be at least 6 characters long & contains at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user && user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      message: `${user?.name} Logged in successfully with ${
        email ? email : phone_number
      }`,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = loginController;
