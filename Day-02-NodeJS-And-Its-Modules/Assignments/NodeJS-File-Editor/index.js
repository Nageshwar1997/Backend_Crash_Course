const fs = require("fs");
const path = require("path");

// Import the file operation modules
const readFile = require("./operations/read");
const deleteFile = require("./operations/delete");
const createFile = require("./operations/create");
const appendFile = require("./operations/append");
const renameFile = require("./operations/rename");
const listDirectory = require("./operations/list");

// Parse command-line arguments
const argv = process.argv.slice(2);
const operation = argv[0]; // Operation to perform (e.g., read, delete)
const fileName = argv[1]; // Name of the file or directory
const content = argv.slice(2).join(" "); // Content to use for create/append operations
const filePath = fileName ? path.join(__dirname, fileName) : __dirname; // Full path to the file or directory

// Check if an operation was provided
if (!operation) {
  console.log("Please provide an operation");
  return;
}

// Perform the requested operation based on the command-line arguments
switch (operation) {
  case "read": {
    if (!fileName) {
      console.log("Please provide a file name");
      return;
    }
    // Read the contents of the specified file and print it
    console.log(readFile(filePath));
    break;
  }
  case "delete": {
    if (!fileName) {
      console.log("Please provide a file name");
      return;
    }
    // Delete the specified file and print a success message
    console.log(deleteFile(filePath));
    break;
  }
  case "create": {
    if (!fileName) {
      console.log("Please provide a file name");
      return;
    }
    // Create a new file with the specified name and content
    if (content) {
      console.log(createFile(fileName, content));
    } else {
      console.log(createFile(fileName));
    }
    break;
  }
  case "append": {
    if (!fileName) {
      console.log("Please provide a file name");
      return;
    }
    // Append content to the specified file
    console.log(appendFile(fileName, content));
    break;
  }
  case "rename": {
    if (!fileName) {
      console.log("Please provide a file name");
      return;
    }
    // Get the new file name from the next argument
    const newFileName = argv[2];
    const newFilePath = path.join(__dirname, newFileName); // Full path to the new file name
    // Rename the specified file and print a success message
    console.log(renameFile(filePath, newFilePath));
    break;
  }
  case "list": {
    if (!fileName) {
      console.log("Please provide a file name");
      return;
    }
    try {
      // Check if the path is a directory
      const stats = fs.statSync(filePath);
      // If it's a directory, list its contents; otherwise, print an error message
      if (stats.isDirectory()) {
        console.log(listDirectory(filePath));
      } else {
        console.log("The path provided is not a directory.");
      }
    } catch (error) {
      // Print an error message if there is an issue checking the path
      console.error("Error checking path:", error.message || error);
    }
    break;
  }
  default: {
    // Print an error message if the operation is not recognized
    console.log("Invalid operation");
    break;
  }
}
