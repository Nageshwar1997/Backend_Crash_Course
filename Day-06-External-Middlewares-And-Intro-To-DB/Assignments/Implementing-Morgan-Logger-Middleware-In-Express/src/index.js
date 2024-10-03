const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

const router = require("./router");

const app = express();

app.use(express.json());
morgan.token("http-version", (req) => req.httpVersion);

const accessLogStream = fs.createWriteStream("access.log", { flags: "a" });

app.use(
  morgan(
    ":method | :status | :res[content-length] | :response-time ms | :date[iso] | :http-version | :url",
    { stream: accessLogStream }
  )
);

app.use("/", router);

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
