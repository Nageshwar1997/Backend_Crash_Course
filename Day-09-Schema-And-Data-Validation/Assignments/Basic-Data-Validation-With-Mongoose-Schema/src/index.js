require("dotenv").config();
const express = require("express");
const connectDB = require("./configs/db.config");
const router = require("./routes/user.routes");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to the Users API");
});

app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error.message || "Server is not running");
  }
});
