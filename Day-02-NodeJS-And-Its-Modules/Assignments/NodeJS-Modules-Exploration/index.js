const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const { performance } = require("perf_hooks");

// Function to encrypt a string
function encryptString(text) {
  const algorithm = "aes-256-cbc";
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return {
    encryptedData: encrypted,
    key: key.toString("hex"),
    iv: iv.toString("hex"),
  };
}

// Function to generate a UUID
function generateUUID() {
  return crypto.randomUUID();
}

// Function to read a file using streams
function readUsingStream(filePath) {
  const start = performance.now();

  const stream = fs.createReadStream(filePath, { encoding: "utf8" });
  stream.on("data", (chunk) => {
    console.log(chunk);
  });

  stream.on("end", () => {
    const end = performance.now();
    console.log("Time taken using stream:", end - start, "ms");
  });
}

// Function to read a file using fs.readFile
function readUsingFs(filePath) {
  const start = performance.now();

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }

    const end = performance.now();
    console.log("Time taken using fs.readFile:", end - start, "ms");
  });
}

// Function to print system details
function printSystemDetails() {
  console.log("OS Type:", os.type());
  console.log("OS Platform:", os.platform());
  console.log("OS Release:", os.release());
  console.log("Total Memory:", os.totalmem());
  console.log("Free Memory:", os.freemem());
  console.log("CPU Architecture:", os.arch());
  console.log("Number of CPUs:", os.cpus().length);
  console.log("Home Directory:", os.homedir());
}

// Parse command line arguments
const args = process.argv.slice(2);
const [functionName, ...inputs] = args;

switch (functionName) {
  case "encrypt":
    if (!inputs) {
      console.log("Please provide a string to encrypt");
      return;
    }
    const encrypted = encryptString(inputs[0]);
    console.log(encrypted);
    break;
  case "generateUUID":
    console.log(generateUUID());
    break;
  case "readStream":
    if (!inputs) {
      console.log("Please provide a file path");
      return;
    }
    readUsingStream(inputs[0]);
    break;
  case "readFile":
    if (!inputs) {
      console.log("Please provide a file path");
      return;
    }
    readUsingFs(inputs[0]);
    break;
  case "systemDetails":
    printSystemDetails();
    break;
  default:
    console.log("Invalid function name provided");
}
