const fs = require("fs");

const deleteFile = (filePath) => {
  try {
    // Delete the file specified by filePath.
    fs.unlinkSync(filePath);

    // Extract the file name from the filePath by splitting on backslashes
    // and return a success message including the file name.
    return `${filePath.split("\\").pop()} file deleted successfully`;
  } catch (error) {
    // Return the error message if an exception occurs during the file deletion.
    return error.message || error;
  }
};

module.exports = deleteFile;
