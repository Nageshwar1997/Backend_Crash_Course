const express = require("express");
const {
  createUserController,
  getAllUsersController,
  getSingleUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/user.controllers");

const userRouter = express.Router();

userRouter.post("/create", createUserController);

userRouter.get("/all", getAllUsersController);

userRouter.get("/user/:id", getSingleUserController);

userRouter.patch("/update/:id", updateUserController);

userRouter.delete("/delete/:id", deleteUserController);

module.exports = userRouter;
