const express = require("express");
const {
  createUserProfileController,
  getAllUsersProfileController,
  getSingleUserProfileController,
  updateUserProfileController,
  deleteUserProfileController,
} = require("../controllers/profile.controllers");

const profileRouter = express.Router();

profileRouter.post("/create", createUserProfileController);

profileRouter.get("/all", getAllUsersProfileController);

profileRouter.get("/profile/:id", getSingleUserProfileController);

profileRouter.patch("/update/:id", updateUserProfileController);

profileRouter.delete("/delete/:id", deleteUserProfileController);

module.exports = profileRouter;
