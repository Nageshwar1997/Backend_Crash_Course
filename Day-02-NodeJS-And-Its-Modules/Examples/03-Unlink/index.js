const fs = require("fs");

// fs.unlink("./test.txt", (err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log("File deleted successfully");
//   }
// });

(function () {
  try {
    fs.unlinkSync("./text.txt");
    console.log("File deleted successfully");
  } catch (error) {
    console.error(error);
  }
})();
