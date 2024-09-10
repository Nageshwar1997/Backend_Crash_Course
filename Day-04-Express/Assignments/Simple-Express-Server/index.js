const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Express.js Server!");
});
app.get("/about", (req, res) => {
  res.status(200).send("This is a simple web server built using Express.js");
});
app.get("/contact", async (req, res) => {
  try {
    const responseData = await JSON.parse(
      fs.readFileSync("./data.json", "utf-8")
    );
    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/random", async (req, res) => {
  try {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    res.status(200).send(randomNumber);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Handle 404 error for all other routes
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
