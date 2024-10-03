const fs = require("fs");

const startMemory = process.memoryUsage().heapUsed / 1024 / 1024;
console.log("Start memory: " + startMemory + " MB");

console.time("read");

let usersData = fs.readFileSync("./db.json", "utf-8");

let users = JSON.parse(usersData).users;
// console.log("users", users);

console.timeEnd("read");

const endMemory = process.memoryUsage().heapUsed / 1024 / 1024;

console.log("End memory: " + endMemory + " MB");
console.log("Memory used: " + (endMemory - startMemory) + " MB");

console.log("==================================");

const startMemoryStream = process.memoryUsage().heapUsed / 1024 / 1024;
console.log("Start memory: " + startMemory + " MB");
console.time("stream");

const stream = fs.createReadStream("./db.json", "utf-8");

stream.on("data", (chunk) => {
  console.log(chunk);
});

stream.on("end", () => {
  console.log("Stream Ended");
  const endMemoryStream = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log("End memory: " + endMemory + " MB");
  console.log("Memory used: " + (endMemoryStream - startMemoryStream) + " MB");
  console.timeEnd("stream");
});
