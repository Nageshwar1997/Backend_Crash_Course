const AuthorModel = require("../models/author.model");
const BookModel = require("../models/book.model");

const createBook = async (req, res) => {
  try {
    const {
      title,
      ISBN,
      summary,
      publicationDate,
      genres,
      copiesAvailable,
      authorId,
    } = req.body;
    if (!title || !ISBN || !summary || !publicationDate || !authorId) {
      return res.status(401).send("All fields are required");
    }

    const newBook = {};
    if (title) {
      newBook.title = title;
    }
    if (ISBN) {
      newBook.ISBN = ISBN;
    }
    if (summary) {
      newBook.summary = summary;
    }
    if (publicationDate) {
      newBook.publicationDate = publicationDate;
    }
    if (genres) {
      newBook.genres = genres;
    }
    if (copiesAvailable) {
      newBook.copiesAvailable = copiesAvailable;
    }

    const author = await AuthorModel.findById(authorId);
    if (!author) {
      return res.status(404).send("Author not found");
    }

    if (author) {
      newBook.author = authorId;
    }

    const book = new BookModel(newBook);

    const savedBook = await book.save();

    author.books = [...author.books, savedBook._id];
    await author.save();

    res.status(201).json({
      message: "Book created successfully",
      book: savedBook,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const { author, genre, title, page = 1, limit = 10 } = req.query;
    const query = {};

    if (author) {
      const authors = await AuthorModel.find({
        name: { $regex: new RegExp(author, "i") },
      });
      const authorIds = authors.map((a) => a._id);

      if (authorIds.length > 0) {
        query.author = { $in: authorIds };
      }
    }
    if (genre) {
      query.genres = { $elemMatch: { $regex: new RegExp(genre, "i") } };
    }
    if (title) {
      query.title = { $regex: new RegExp(title, "i") };
    }

    const totalBooks = await BookModel.countDocuments(query);

    const books = await BookModel.find(query)
      .populate("author")
      .limit(Number(limit))
      .skip(Number(limit) * (Number(page) - 1));

    res.status(200).json({
      books,
      totalBooks,
      currentPage: Number(page),
      totalPages: Math.ceil(books.length / Number(limit)),
      message: "Books fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id).populate("author");
    if (!book) {
      return res.status(404).send("Book not found");
    }

    res.status(200).json({ book, message: "Book fetched successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }

    const updatingBook = {};

    if (book) {
      updatingBook.title = req.body.title || book.title;
      updatingBook.summary = req.body.summary || book.summary;
      updatingBook.publicationDate =
        req.body.publicationDate || book.publicationDate;
      updatingBook.genres = req.body.genres || book.genres;
      updatingBook.copiesAvailable =
        req.body.copiesAvailable || book.copiesAvailable;
    }

    const updatedBook = await BookModel.findByIdAndUpdate(id, updatingBook, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).send("Book not found");
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {}
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }

    const deletedBook = await BookModel.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).send("Book not found");
    }

    res.status(200).json({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
