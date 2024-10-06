const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    biography: String,
    dateOfBirth: Date,
    nationality: String,
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const AuthorModel = mongoose.model("Author", AuthorSchema);

module.exports = AuthorModel;
