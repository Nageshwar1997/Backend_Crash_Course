const express = require("express");
const authenticate = require("../middlewares/auth.middleware");
const authorization = require("../middlewares/role.middleware.js");
const {
  borrowBook,
  getAllBorrowings,
  getMyBorrowings,
  returnBook,
} = require("../controllers/borrowing.controller.js");
const borrowingRouter = express.Router();

borrowingRouter.post("/", [authenticate, authorization.member], borrowBook);
borrowingRouter.get("/", [authenticate, authorization.admin], getAllBorrowings);
borrowingRouter.get(
  "/my",
  [authenticate, authorization.member],
  getMyBorrowings
);
borrowingRouter.put("/:id/return", authenticate, returnBook);

module.exports = borrowingRouter;
