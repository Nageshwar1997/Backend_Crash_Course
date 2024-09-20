const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected to Server`);
  } catch (error) {
    throw new Error(error.message || "Unable to connect to database");
  }
};

module.exports = connectDB;
