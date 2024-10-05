require("dotenv").config();
const express = require("express");

const app = express();
const cors = require("cors");

const connectDB = require("./configs/db.config");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const profileRouter = require("./routes/profile.routes");

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Home Page
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Home Page");
});

// User and Product Routes
app.use("/users", userRouter);
app.use("/profiles", profileRouter);
app.use("/products", productRouter);

// Wrong Routes
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error.message || "Server is not running");
  }
});
