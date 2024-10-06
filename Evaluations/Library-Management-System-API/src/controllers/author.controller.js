const AuthorModel = require("../models/author.model");

const createAuthor = async (req, res) => {
  try {
    const { name, biography, dateOfBirth, nationality } = req.body;
    if (!name) {
      return res.status(401).send("Author name is required");
    }
    const newAuthor = {};

    if (name) {
      newAuthor.name = name;
    }
    if (biography) {
      newAuthor.biography = biography;
    }
    if (dateOfBirth) {
      newAuthor.dateOfBirth = dateOfBirth;
    }
    if (nationality) {
      newAuthor.nationality = nationality;
    }

    const author = new AuthorModel(newAuthor);
    const savedAuthor = await author.save();

    res.status(201).json({
      author: {
        _id: savedAuthor._id,
        name: savedAuthor.name,
        biography: savedAuthor.biography,
        dateOfBirth: savedAuthor.dateOfBirth,
        nationality: savedAuthor.nationality,
      },
      message: "Author created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getAllAuthors = async (req, res) => {
  try {
    const authors = await AuthorModel.find().populate("books");
    console.log(authors);
    res.status(200).json({ authors, message: "Authors fetched successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await AuthorModel.findById(id).populate("books");
    if (!author) {
      return res.status(404).send("Author not found");
    }

    res.status(200).json({ author, message: "Author fetched successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const { name, biography, dateOfBirth, nationality } = req.body;
    const { id } = req.params;
    const author = await AuthorModel.findById(id);
    if (!author) {
      return res.status(404).send("Author not found");
    }

    if (author) {
      author.name = name || author.name;
      author.biography = biography || author.biography;
      author.dateOfBirth = dateOfBirth || author.dateOfBirth;
      author.nationality = nationality || author.nationality;
    }

    const updatedAuthor = await author.save();

    res.status(200).json({
      author: {
        _id: updatedAuthor._id,
        name: updatedAuthor.name,
        biography: updatedAuthor.biography,
        dateOfBirth: updatedAuthor.dateOfBirth,
        nationality: updatedAuthor.nationality,
      },
      message: "Author updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAuthor = await AuthorModel.findByIdAndDelete(id);

    if (!deletedAuthor) {
      return res.status(404).send("Author not found");
    }
    res.status(200).json({
      author: {
        _id: deletedAuthor._id,
        name: deletedAuthor.name,
        biography: deletedAuthor.biography,
        dateOfBirth: deletedAuthor.dateOfBirth,
        nationality: deletedAuthor.nationality,
      },
      message: "Author deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
