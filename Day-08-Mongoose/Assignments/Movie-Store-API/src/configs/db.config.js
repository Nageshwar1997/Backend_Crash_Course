const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Server connected to MongoDB`);
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message || "Error connecting to MongoDB");
  }
};

module.exports = connectDB;
