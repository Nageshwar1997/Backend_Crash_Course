const express = require("express");
const todoValidationMiddleware = require("../middlewares/todoValidatation.middleware");
const createTodoController = require("../controllers/createTodo.controller");

const router = express.Router();

router.post("/create", todoValidationMiddleware, createTodoController);

module.exports = router;
