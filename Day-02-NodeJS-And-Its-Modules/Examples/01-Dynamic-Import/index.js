// Dynamic import syntax

let flag = false;
for (let i = 0; i < 6; i++) {
  if (i === 2) {
    flag = true;
  }
}

if (flag) {
  const printName = require("./printName");
  console.log(printName("Nageshwar"));

  const sum = require("./sum");
  console.log(sum(1, 2));

  const sub = require("./sub");
  console.log(sub(5, 2));
}
