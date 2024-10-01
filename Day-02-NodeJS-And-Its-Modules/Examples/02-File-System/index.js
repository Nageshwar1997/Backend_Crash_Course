const fs = require("fs");

fs.readFile("./test.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});

// Immediately Invoked Function Expression
(function () {
  try {
    const fileData = fs.readFileSync("./test.txt", "utf-8");
    console.log(fileData);
  } catch (error) {
    console.error(error);
  }
})();
