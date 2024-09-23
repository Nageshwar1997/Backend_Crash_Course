const express = require("express");
const registerController = require("../controllers/register.controller");
const loginController = require("../controllers/login.controller");
const getAllUsersController = require("../controllers/getAllUsers.controller");
const updateUserController = require("../controllers/updateUser.controller");
const deleteUserController = require("../controllers/deleteUser.controller");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/", getAllUsersController);
router.put("/update/:id", updateUserController);
router.delete("/delete/:id", deleteUserController);

module.exports = router;
