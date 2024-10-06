const BookModel = require("../models/book.model");
const BorrowingModel = require("../models/borrowing.model");
const UserModel = require("../models/user.model");

const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    if (!bookId) {
      return res.status(400).send("bookId is required");
    }
    const book = await BookModel.findById(bookId);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    if (book && book.copiesAvailable === 0) {
      return res.status(400).send("Book not available");
    }

    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const transaction = new BorrowingModel({
      book: bookId,
      member: user._id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    book.copiesAvailable--;
    user.borrowedBooks.push(bookId);

    await transaction.save();
    await book.save();
    await user.save();

    res
      .status(201)
      .json({ message: "Book borrowed successfully", transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllBorrowings = async (req, res) => {
  try {
    const AllBorrowingTransactions = await BorrowingModel.find({})
      .populate("book")
      .populate("member");
    res.status(200).json({
      AllBorrowingTransactions,
      message: "All Borrowing Transactions fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getMyBorrowings = async (req, res) => {
  try {
    const user = req.user;
    const myBorrowings = await BorrowingModel.find({
      member: user._id,
    })
      .populate("book")
      .populate("member");

    res.status(200).json({
      myBorrowings,
      message: "My Borrowing Transactions fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const returnBook = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await BorrowingModel.findById(id).populate("book");
    if (!transaction) {
      return res.status(404).send("Transaction not found");
    }
    if (transaction.dueDate < new Date()) {
      return res.status(400).send("Book overdue");
    }

    if (transaction.status === "Returned") {
      return res.status(400).send("Book already returned");
    }

    transaction.returnDate = Date.now();
    transaction.status = "Returned";

    const book = await BookModel.findById(transaction.book._id);
    if (!book) {
      return res.status(404).send("Book not found");
    }

    book.copiesAvailable++;

    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    user.borrowedBooks = user.borrowedBooks.filter(
      (bookId) => bookId.toString() !== book._id.toString()
    );

    await transaction.save();
    await book.save();
    await user.save();

    res.status(200).json({
      message: "Book returned successfully",
      transaction,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  borrowBook,
  getAllBorrowings,
  getMyBorrowings,
  returnBook,
};
