const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../database/db.json");
const createTodoController = async (req, res) => {
  try {
    let todos;
    try {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      todos = data.todos;
      todos.push(req.body);
    } catch (error) {
      throw new Error(error.message);
    }
    try {
      fs.writeFileSync(filePath, JSON.stringify({ todos }, null, 2));
    } catch (error) {
      throw new Error(error.message);
    }

    res
      .status(201)
      .json({ message: "Todo created successfully", todo: req.body });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = createTodoController;
