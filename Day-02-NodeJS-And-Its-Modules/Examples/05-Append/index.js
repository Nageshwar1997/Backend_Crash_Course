const fs = require("fs");

fs.appendFileSync("./test.txt", "Hello World\n", "utf8", (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("File appended successfully");
  }
});
