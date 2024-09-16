const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    sellingPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discount: { type: Number, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    images: { type: [String], required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = productSchema;
