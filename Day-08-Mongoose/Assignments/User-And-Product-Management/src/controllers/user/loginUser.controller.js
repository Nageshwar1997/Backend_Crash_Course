const bcrypt = require("bcryptjs");
const { testEmail } = require("../../helpers/email.regex");
const { testPassword } = require("../../helpers/password.regex");
const testPhone = require("../../helpers/phone.regex");
const {
  findUserByEmail,
  findUserByPhone,
} = require("../../services/user.services");
const { generateToken } = require("../../providers/jwt.provider");

const loginUserController = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    if (!email && !phone) {
      return res.status(400).json({ message: "Email or Phone is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (email) {
      if (!testEmail(email)) {
        return res.status(400).json({ message: "Invalid email address" });
      }
    }

    if (phone) {
      if (!testPhone(phone)) {
        return res.status(400).json({ message: "Invalid phone number" });
      }
    }

    if (password) {
      if (!testPassword(password)) {
        return res.status(400).json({
          message:
            "Password must contain at least 8 characters (a-z, A-Z, 0-9, @$!%*?&)",
        });
      }
    }

    let user;
    if (email) {
      user = await findUserByEmail(email.trim().toLowerCase());
    } else if (phone) {
      user = await findUserByPhone(phone);
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = await generateToken(user._id);
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ message: error.message || error });
  }
};

module.exports = loginUserController;
