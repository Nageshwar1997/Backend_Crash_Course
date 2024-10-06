const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token)
    if (!token) {
      res.status(404).send("Token not found login first");
    }

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const loggedInUser = await UserModel.findById({
      _id: decodedUser._id,
    }).select("-password");
    // console.log(loggedInUser)

    if (!loggedInUser) {
      return res.status(404).send("User not found");
    }

    req.user = loggedInUser;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal server Error" });
  }
};

module.exports = authenticate;
