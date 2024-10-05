const express = require("express");

const app = express();
app.use(express());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Home Page");
});

const PORT = process.env.PORT || 8080;
app.listen(8080, () => {
  console.log(`Server is running on port ${PORT}`);
});
