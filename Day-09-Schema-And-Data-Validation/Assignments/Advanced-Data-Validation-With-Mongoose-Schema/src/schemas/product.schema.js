const { Schema } = require("mongoose");

const tagValidator = (tags) => {
  if (!Array.isArray(tags)) return false;
  const tagSet = new Set(tags);
  return (
    tags.length > 0 &&
    tags.every((tag) => /^[a-zA-Z0-9]+$/.test(tag)) &&
    tagSet.size === tags.length
  );
};

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      maxlength: [50, "Product name should be less than 50 characters"],
      validate: {
        validator: function (value) {
          return typeof value === "string";
        },
        message: "Product name should be a string",
      },
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [1, "Product price should be a positive number greater than 0"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: {
        values: ["Electronics", "Clothing", "Books", "Home Appliances"],
        message: `{VALUE} is not a valid category`,
      },
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: [0, "Product stock should be a positive number"],
      validate: {
        validator: function (value) {
          return typeof value === "number";
        },
        message: "Product stock should be a positive number",
      },
    },
    SKU: {
      type: String,
      required: [true, "Product SKU is required"],
      unique: true,
      match: [
        /^PROD-[a-zA-Z0-9]{4}$/,
        "Product SKU must follow the pattern PROD-XXXX",
      ],
    },
    tags: {
      type: [String],
      required: [true, "Product tags are required"],
      validate: {
        validator: tagValidator,
        message:
          "Product tags must be an array of unique strings and not contain special characters, spaces or empty string",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = productSchema;
