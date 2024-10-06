const express = require("express");
const authenticate = require("../middlewares/auth.middleware.js");
const authorization = require("../middlewares/role.middleware.js");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controllers");

const userRouter = express.Router();

userRouter.get("/", [authenticate, authorization.admin], getAllUsers);
userRouter.get("/:id", authenticate, getUserById);
userRouter.put("/:id", authenticate, updateUser);
userRouter.delete("/:id", [authenticate, authorization.admin], deleteUser);

module.exports = userRouter;
