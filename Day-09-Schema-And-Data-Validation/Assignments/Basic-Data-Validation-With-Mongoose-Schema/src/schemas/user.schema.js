const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    phone_number: { type: String, required: true, unique: true, maxlength: 10 },
    age: { type: Number, required: true, min: 18, max: 65 },
  },
  { versionKey: false, timestamps: true }
);

module.exports = UserSchema;
