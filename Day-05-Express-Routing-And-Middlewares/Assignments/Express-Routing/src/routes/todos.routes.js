const express = require("express");
const { getAllTodosController, createTodoController, updateTodoController, getTodoController } = require("../controllers/todos.controller");
const todosRouter = express.Router();

todosRouter.get("/", getAllTodosController)
todosRouter.get("/:id", getTodoController)
todosRouter.post("/create", createTodoController);
todosRouter.put("/update/:id", updateTodoController);

module.exports = todosRouter;
