require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db.config");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to User and Product Management System");
});

app.use("/users", userRouter);
app.use("/products", productRouter);

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
});
