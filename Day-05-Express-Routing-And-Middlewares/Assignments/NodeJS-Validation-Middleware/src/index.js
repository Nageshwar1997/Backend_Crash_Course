const express = require("express");
const router = require("./routes/todo.routes");

const app = express();

app.use(express.json());

const PORT = 3000 || 5000;

app.use("/todos", router)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
