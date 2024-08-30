const fs = require("fs");

const listDirectory = (directoryPath) => {
  try {
    // Read the contents of the directory specified by directoryPath.
    // This returns an array of filenames in the directory.
    const files = fs.readdirSync(directoryPath);

    // Return the array of filenames.
    return files;
  } catch (error) {
    // Return the error message if an exception occurs while reading the directory.
    return error.message || error;
  }
};

module.exports = listDirectory;
