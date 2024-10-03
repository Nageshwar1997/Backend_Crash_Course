const express = require("express");
const router = require("./src/routes");

const app = express();

app.use(express.json());

const loggerMiddleware1 = (req, res, next) => {
  // console.log("Request Method:", req.method);
  // console.log("Request URL:", req.url);
  console.log("Before 1");
  next();
  console.log("After 1");
};
const loggerMiddleware2 = (req, res, next) => {
  // console.log("Request Method:", req.method);
  // console.log("Request URL:", req.url);
  console.log("Before 2");
  next();
  console.log("After 2");
};

const addTimeStampToRequestMiddleware = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(`Request received at: ${req.requestTime}`);
  // console.log("Request Method:", req.method);
  // console.log("Request URL:", req.url);
  // console.log("Before 3");
  next();
  // console.log("After 3");
};

// app.use(loggerMiddleware1); // This middleware will be applied to all routes
// app.use(loggerMiddleware2); // This middleware will be applied to all routes

// app.use("/users", loggerMiddleware1, loggerMiddleware2,, addTimeStampToRequestMiddleware router); // this middleware will be applied to all routes starting with /users
app.use(
  "/users",
  [
    /* loggerMiddleware1,*/ /*loggerMiddleware2,*/ addTimeStampToRequestMiddleware,
  ],
  router
); // this middleware will be applied to all routes starting with /users

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
