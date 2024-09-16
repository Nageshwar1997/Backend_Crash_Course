const bcrypt = require("bcryptjs");

const { testEmail } = require("../../helpers/email.regex");
const { testPassword } = require("../../helpers/password.regex");
const testPhone = require("../../helpers/phone.regex");
const {
  findUserByEmail,
  createUser,
  findUserByPhone,
} = require("../../services/user.services");

const registerUserController = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    if (!firstName) {
      return res
        .status(400)
        .json({ message: "First Name is required & key should be firstName" });
    }
    if (!lastName) {
      return res
        .status(400)
        .json({ message: "Last Name is required & key should be lastName" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required & key should be email" });
    }
    if (email) {
      if (!testEmail(email)) {
        return res.status(400).json({ message: "Invalid email address" });
      }
    }
    if (!password) {
      return res
        .status(400)
        .json({ message: "Password is required & key should be password" });
    }

    if (password) {
      if (!testPassword(password)) {
        return res.status(400).json({
          message:
            "Password must contain at least 8 characters (a-z, A-Z, 0-9, @$!%*?&)",
        });
      }
    }
    if (!phone) {
      return res
        .status(400)
        .json({ message: "Phone Number is required & key should be phone" });
    }

    if (phone && typeof phone === "number") {
      if (!testPhone(phone)) {
        return res.status(400).json({
          message:
            "Invalid phone number, phone number contains 10 digits only & type should be number",
        });
      }
    }

    const emailExists = await findUserByEmail(email);

    if (emailExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const phoneExists = await findUserByPhone(phone);
    if (phoneExists) {
      return res
        .status(400)
        .json({ message: "User with this phone already exists" });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const user = {
      firstName: firstName.trim().toLowerCase(),
      lastName: lastName.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      phone,
      password: hashedPassword,
    };

    await createUser(user);

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = registerUserController;
