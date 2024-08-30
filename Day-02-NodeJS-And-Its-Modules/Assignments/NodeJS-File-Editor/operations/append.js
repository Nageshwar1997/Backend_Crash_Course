const fs = require("fs");

const appendFile = (fileName, content = "") => {
  try {
    // Append the content to the file, adding a newline character after the content.
    fs.appendFileSync(fileName, content + "\n", "utf-8");

    // Return a success message indicating that the file was appended successfully.
    // If content is provided, include it in the message.
    return `File ${fileName} appended successfully${
      content ? ` with content ${content}` : ""
    }.`;
  } catch (error) {
    // Return the error message if an exception occurs during the append operation.
    return error.message || error;
  }
};

module.exports = appendFile;
