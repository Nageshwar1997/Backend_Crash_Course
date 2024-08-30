const fs = require("fs");

const readFile = (filePath) => {
  try {
    // Read the contents of the file specified by filePath in UTF-8 encoding.
    const data = fs.readFileSync(filePath, "utf-8");

    // Return the file contents as a string.
    return data;
  } catch (error) {
    // Return the error message if an exception occurs while reading the file.
    return error.message || error;
  }
};

module.exports = readFile;
