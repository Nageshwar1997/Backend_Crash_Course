const express = require("express");
const registerUserController = require("../controllers/user/registerUser.controller");
const getAllUsersController = require("../controllers/user/getAllUsers.controller");
const getSingleUserController = require("../controllers/user/getSingleUser.controller");
const loginUserController = require("../controllers/user/loginUser.controller");
const getUserProfileByTokenController = require("../controllers/user/getUserProfileByToken.controller");
const updateUserController = require("../controllers/user/updateUser.controller");
const deleteUserController = require("../controllers/user/deleteUser.controller");

const userRouter = express.Router();

userRouter.get("/", getUserProfileByTokenController); // get user profile
userRouter.post("/register", registerUserController); // register user
userRouter.post("/login", loginUserController); // login user
userRouter.get("/all", getAllUsersController); // get all users
userRouter.get("/:id", getSingleUserController); // get single user
userRouter.put("/update/:id", updateUserController); // update user
userRouter.delete("/delete/:id", deleteUserController); // delete user

module.exports = userRouter;
