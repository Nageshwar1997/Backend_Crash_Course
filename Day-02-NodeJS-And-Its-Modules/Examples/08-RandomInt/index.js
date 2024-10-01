const crypto = require("crypto");

const randomInt = (min, max) => {
  const bytes = crypto.randomBytes(4);
  const value = bytes.readUInt32BE(0);
  const range = max - min;
  return min + (value % range);
};

console.log(randomInt(10, 20));

crypto.randomInt(3, (err, n) => {
  if (err) throw err;
  console.log(`Random number chosen from (0, 1, 2): ${n}`);
});

let min = 10;
let max = 20;

crypto.randomInt(min, max, (err, n) => {
  if (err) throw err;
  console.log(`Random number chosen from (${min}, ${max}): ${n}`);
})