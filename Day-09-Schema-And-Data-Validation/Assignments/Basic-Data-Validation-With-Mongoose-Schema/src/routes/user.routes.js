const express = require("express");
const registerController = require("../controllers/register.controller");
const loginController = require("../controllers/login.controller");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
