const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./src/configs/db.config");
const authRouter = require("./src/routes/auth.routes");
const userRouter = require("./src/routes/user.routes");
const authorRouter = require("./src/routes/author.routes");
const bookRouter = require("./src/routes/book.routes");
const borrowingRouter = require("./src/routes/borrowing.routes");

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).send("Welcome to Library Management System API");
});

// Auth Route
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/authors", authorRouter);
app.use("/api/books", bookRouter);
app.use("/api/borrowings", borrowingRouter);

app.use((_, res) => {
  res.status(404).send("404 Page Not Found!");
});

const PORT = 8080 || 5454;
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error.message || "Server is not running");
  }
});
