const fs = require("fs");

const renameFile = (oldFilePath, newFilePath) => {
  try {
    // Rename or move the file from oldFilePath to newFilePath.
    fs.renameSync(oldFilePath, newFilePath);

    // Extract the old and new file names from their respective paths
    // and return a success message indicating the renaming operation was successful.
    return `${oldFilePath.split("\\").pop()} renamed to ${newFilePath
      .split("\\")
      .pop()} successfully`;
  } catch (error) {
    // Return the error message if an exception occurs during the rename operation.
    return error.message || error;
  }
};

module.exports = renameFile;
