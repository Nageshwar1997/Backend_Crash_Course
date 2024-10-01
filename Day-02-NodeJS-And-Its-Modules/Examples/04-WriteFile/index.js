const fs = require("fs");

fs.writeFile("./test.txt", "Hello World", "utf8", (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("File created successfully 1");
  }
});

(function () {
  try {
    fs.writeFileSync(
      "./data.json",
      JSON.stringify({ name: "Nageshwar", age: 27 }),
      "utf8"
    );
    console.log("File created successfully 2");
  } catch (error) {
    console.error(error);
  }
})();
