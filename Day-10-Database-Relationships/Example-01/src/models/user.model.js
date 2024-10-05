const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, min: [5, "Age should be greater than 5"] },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: { type: String, required: true },
    isMarried: { type: Boolean, default: false },
    gender: {
      type: String,
      enum: ["male", "female", "other", "Male", "Female", "Other"], // enumeration
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
