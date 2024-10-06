const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin", "Member"], default: "Member" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
