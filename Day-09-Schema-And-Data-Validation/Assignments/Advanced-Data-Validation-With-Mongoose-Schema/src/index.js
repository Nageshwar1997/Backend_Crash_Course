require("dotenv").config();
const express = require("express");
const connectDB = require("./configs/db.config");
const router = require("./routes/product.routes");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the Products API");
});

app.use("/api/products", router);

// Wrong Routes
app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error.message || "Server is not running");
  }
});
