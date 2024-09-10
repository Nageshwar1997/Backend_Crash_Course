const express = require("express");
const usersRouter = require("./routes/users.routes");
const todosRouter = require("./routes/todos.routes");



const app = express();

app.use(express.json());

app.use("/users", usersRouter);
app.use("/todos", todosRouter);

const PORT = 3000 || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
