const crypto = require("crypto");

const random = (length) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString("binary"));
      }
    });
  });
};

module.exports = random;
