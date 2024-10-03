const express = require("express");
const router = require("./src/routes");

const app = express();

app.use(express.json());

app.use("/users", router);

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
