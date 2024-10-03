const http = require("http");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");

// Function to render the signup HTML form
function renderSignupForm(res) {
  fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error loading signup page");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
}

// Function to save user data
function saveUser(username, password, res) {
  const data = `${username}:${password}\n`;

  fs.appendFile(path.join(__dirname, "user.txt"), data, (err) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error saving user data");
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Thank You for Signup...!!!");
    }
  });
}

// Function to read users and display usernames (without passwords)
function showAllUsers(res) {
  fs.readFile(path.join(__dirname, "user.txt"), "utf-8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error reading user data");
    } else {
      const users = data
        .split("\n")
        .filter(Boolean)
        .map((line) => line.split(":")[0]);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
                <div>
                    <h1>All Users</h1>
                    <ul>
                        ${users.map((user) => `<li>${user}</li>`).join("")}
                    </ul>
                </div>
            `);
    }
  });
}

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method == "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      "<button style='background-color:blue; color:white; padding:10px'><a style='color:white; text-decoration:none' href='/signup'>Signup</a></button>"
    );
  } else if (req.url == "/signup" && req.method == "GET") {
    renderSignupForm(res);
  } else if (req.method === "POST" && req.url === "/signup") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { username, password } = qs.parse(body);
      saveUser(username, password, res);
    });
  } else if (req.method === "GET" && req.url === "/allusers") {
    showAllUsers(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

// Listen on port 8080
server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
