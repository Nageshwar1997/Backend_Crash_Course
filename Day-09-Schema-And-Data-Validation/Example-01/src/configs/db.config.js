const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Server connected to Database`);
  } catch (error) {
    throw new Error(error.message || "Error connecting to database");
  }
};

module.exports = connectDB;