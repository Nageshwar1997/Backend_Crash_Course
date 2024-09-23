const { testEmail } = require("../helpers/email.regex");
const { testPassword } = require("../helpers/password.regex");
const testPhone = require("../helpers/phone.regex");
const UserModel = require("../models/user.model");

const registerController = async (req, res) => {
  try {
    const { name, email, phone_number, age, password } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ errors: ["Name is required", `Key should be "name"`] });
    }
    if (name && name.length < 3) {
      return res
        .status(400)
        .json({ message: "Name should be at least 3 characters long" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ errors: ["Email is required", `Key should be "email"`] });
    }

    if (email && !testEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (email && testEmail(email)) {
      const user = await UserModel.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }
    if (!phone_number) {
      return res.status(400).json({
        errors: ["Phone number is required", `Key should be "phone_number"`],
      });
    }
    if (phone_number && !testPhone(phone_number) && phone_number.length < 10) {
      return res.status(400).json({ message: "Invalid phone number" });
    }
    if (phone_number && testPhone(phone_number) && phone_number.length === 10) {
      const user = await UserModel.findOne({ phone_number });
      if (user) {
        return res.status(400).json({ message: "Phone number already exists" });
      }
    }
    if (!age) {
      return res
        .status(400)
        .json({ errors: ["Age is required", `Key should be "age"`] });
    }
    if (age && (age < 18 || age > 65)) {
      return res
        .status(400)
        .json({ message: "Age should be between 18 and 65" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ errors: ["Password is required", `Key should be "password"`] });
    }
    if (password && !testPassword(password)) {
      return res.status(400).json({
        message:
          "Password should be at least 6 characters long & contains at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }
    const user = await UserModel.create({
      name,
      email,
      phone_number,
      age,
      password,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = registerController;
