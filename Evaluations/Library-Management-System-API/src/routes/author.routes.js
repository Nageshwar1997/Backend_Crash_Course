const express = require("express");
const {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/author.controller");
const authenticate = require("../middlewares/auth.middleware");
const authorization = require("../middlewares/role.middleware.js");

const authorRouter = express.Router();

authorRouter.post("/", [authenticate, authorization.admin], createAuthor);
authorRouter.get("/", getAllAuthors);
authorRouter.get("/:id", getAuthorById);
authorRouter.put("/:id", [authenticate, authorization.admin], updateAuthor);
authorRouter.delete("/:id", [authenticate, authorization.admin], deleteAuthor);

module.exports = authorRouter;
