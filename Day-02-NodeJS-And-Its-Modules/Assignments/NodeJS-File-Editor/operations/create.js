const fs = require("fs");

const createFile = (fileName, content = "") => {
  try {
    // Create or overwrite the file with the specified content.
    // If content is provided, it will be written to the file.
    fs.writeFileSync(fileName, content, "utf-8");

    // Return a success message indicating the file was created or overwritten successfully.
    // If content is provided, include it in the message.
    return `File ${fileName} created successfully${
      content ? ` with content ${content}` : ""
    }.`;
  } catch (error) {
    // Return the error message if an exception occurs during file creation.
    return error.message || error;
  }
};

module.exports = createFile;
