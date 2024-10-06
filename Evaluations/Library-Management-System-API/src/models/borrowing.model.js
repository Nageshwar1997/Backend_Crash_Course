const mongoose = require("mongoose");

const BorrowingSchema = new mongoose.Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    member: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    borrowDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: Date,
    status: {
      type: String,
      enum: ["Borrowed", "Returned"],
      default: "Borrowed",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const BorrowingModel = mongoose.model("Transaction", BorrowingSchema);

module.exports = BorrowingModel;
