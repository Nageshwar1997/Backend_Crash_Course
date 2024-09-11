const express = require("express");
const usersRouter = express.Router();

const {
  registerUserController,
  loginUserController,
  updateUserController,
  getAllUsersController,
  deleteUserController,
  getUserController,
} = require("../controllers/users.controller");

usersRouter.post("/register", registerUserController);
usersRouter.post("/login", loginUserController);
usersRouter.put("/update/:id", updateUserController);
usersRouter.get("/", getAllUsersController);
usersRouter.get("/:id", getUserController);
usersRouter.delete("/delete/:id", deleteUserController);

module.exports = usersRouter;
