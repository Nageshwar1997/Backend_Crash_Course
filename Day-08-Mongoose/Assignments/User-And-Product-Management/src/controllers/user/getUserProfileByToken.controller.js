const { findUserByToken } = require("../../services/user.services");

const getUserProfileByTokenController = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    const user = await findUserByToken(token);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user, message: "User fetched successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

module.exports = getUserProfileByTokenController;
