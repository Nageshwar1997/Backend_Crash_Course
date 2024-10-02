const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const filePath = path.join(__dirname, "index.html");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        // res.writeHead(500, { "Content-Type": "text/plain" });
        // res.end("Error loading index.html");
        // OR
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Error loading index.html");
      } else {
        // res.writeHead(200, { "Content-Type": "text/html" });
        // res.end(data);
        // OR
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Page Not Found");
  }
});

server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
