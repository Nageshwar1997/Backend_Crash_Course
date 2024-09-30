const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8080;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Welcome to Home Page");
  } else if (req.url === "/aboutus") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<h3>Welcome to About Page</h3>");
  } else if (req.url === "/contactus") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(
      "<a href='https://www.masaischool.com' target='_blank'>Contact Us</a>"
    );
  } else if (req.url === "/index") {
    const filePath = path.join(__dirname, "index.js");
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/javascript");
      res.end(data);
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end("Internal Server Error");
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Page Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
