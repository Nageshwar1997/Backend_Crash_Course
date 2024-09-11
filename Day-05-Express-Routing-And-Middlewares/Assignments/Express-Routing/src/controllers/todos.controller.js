const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, "../database/db.json");
const data = fs.readFileSync(filePath, "utf-8");

const getAllTodosController = async (req, res) => {
  try {
    const { todos } = JSON.parse(data);
    res.status(200).json({ message: "Todos fetched successfully", todos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTodoController = async (req, res) => {
  try {
    const { title, status } = req.body;
    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (
      status === undefined ||
      status === null ||
      typeof status !== "boolean"
    ) {
      return res
        .status(400)
        .json({ message: "Status is required value should be boolean" });
    }

    const { todos, users } = JSON.parse(data);
    const existTodo = todos.find(
      (todo) => todo.title.toLowerCase() === title.toLowerCase()
    );

    if (existTodo) {
      res
        .status(400)
        .json({ message: "This todo is already exist in todos", existTodo });
    }
    const todo = {
      id: Math.floor(Math.random() * 1000),
      title: title.toLowerCase(),
      status,
    };

    todos.push(todo);

    fs.writeFileSync(filePath, JSON.stringify({ todos, users }, null, 2));

    res.status(201).json({
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateTodoController = async (req, res) => {
  try {
    const { title, status } = req.body;
    const { id } = req.params;

    const { todos, users } = JSON.parse(data);

    let todo = todos.find((todo) => todo.id === parseInt(id));

    if (title) {
      todo.title = title;
    }

    if (status && typeof status === "boolean") {
      todo.status = status;
    }

    fs.writeFileSync(filePath, JSON.stringify({ users, todos }, null, 2));
    res
      .status(201)
      .json({ message: "Todo updated successfully", updatedTodo: todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getTodoController = async (req, res) => {
  try {
      const { id } = req.params;
      console.log("id",id)

    const { todos, users } = JSON.parse(data);

    const todo = todos.find((todo) => todo.id === parseInt(id));

    if (!todo) {
      return res
        .status(404)
        .json({ message: `Todo not found with this id ${id}` });
    }
    res.status(200).json({ message: "Todo retrieved successfully" }, todo);
  } catch (error) {
    res.status.json({ message: "Failed to fetch Todo" });
  }
};
const deleteTodoController = async (req, res) => {};

module.exports = {
  getAllTodosController,
  createTodoController,
  getTodoController,
  updateTodoController,
  deleteTodoController,
};
