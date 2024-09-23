const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./configs/db.config");
const movieRouter = require("./routes/movie.route");

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to the Movie Store API");
});

app.use("/movies", movieRouter);

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
});
