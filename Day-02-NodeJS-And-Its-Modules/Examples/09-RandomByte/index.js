const crypto = require("crypto");

// Synchronous

const buf = crypto.randomBytes(2);
console.log(`${buf.length} bytes of random data: ${buf.toString("hex")}`);
