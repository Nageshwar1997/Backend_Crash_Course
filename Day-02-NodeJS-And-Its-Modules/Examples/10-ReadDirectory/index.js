const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "../");

let list;

(async () => {
  try {
    // Reading the directory synchronously
    list = fs.readdirSync(dirPath);
    console.log("Directory List:", list);

    // Iterate over each file/directory in the list
    list.forEach((file) => {
      const filePath = path.join(dirPath, file);
      // Check if it's a directory or file
      if (fs.lstatSync(filePath).isDirectory()) {
        const data = fs.readdirSync(filePath);
        console.log(`Directory (${file}) contains:`, data);
      } else {
        console.log(`File: ${file}`);
      }
    });
  } catch (error) {
    console.error("Error reading directory:", error);
  }
})();
