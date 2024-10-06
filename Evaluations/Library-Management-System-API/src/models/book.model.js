const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    ISBN: { type: String, required: true, unique: true },
    summary: String,
    publicationDate: Date,
    genres: [String],
    copiesAvailable: { type: Number, default: 1 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    borrowedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const BookModel = mongoose.model("Book", BookSchema);

module.exports = BookModel;
