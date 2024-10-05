const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    hasWarranty: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    reviews: { type: [String], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;