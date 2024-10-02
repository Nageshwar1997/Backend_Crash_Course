const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Express.js Server!");
});

app.get("/about", (req, res) => {
  res.send("This is a about page");
});

app.get("/contact", (req, res) => {
  res.send("This is the contact page");
});

app.post("/users", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    res.send(body);
    console.log(body);
  });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
