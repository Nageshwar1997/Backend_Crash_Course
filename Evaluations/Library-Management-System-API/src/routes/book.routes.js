const express = require("express");
const { createBook, getAllBooks, updateBook, getBookById, deleteBook } = require("../controllers/book.controller");
const authenticate = require("../middlewares/auth.middleware");
const authorization = require("../middlewares/role.middleware.js");
const bookRouter = express.Router();

bookRouter.post("/", [authenticate, authorization.admin], createBook);
bookRouter.get("/",  getAllBooks);
bookRouter.get("/:id",  getBookById);
bookRouter.put("/:id", [authenticate, authorization.admin], updateBook);
bookRouter.delete("/:id", [authenticate, authorization.admin], deleteBook);

module.exports = bookRouter;
