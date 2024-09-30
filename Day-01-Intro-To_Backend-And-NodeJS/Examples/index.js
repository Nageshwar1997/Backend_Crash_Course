const sub = require("./sub");
const sum = require("./sum");
const printGreetingWithName = require("./printName");

// const args = process.argv.slice(2);
// const operation = args[0];
// const num1 = Number(args[1]);
// const num2 = Number(args[2]);

// console.log(process)
console.log(process.argv);
/**
[
  'C:\\Program Files\\nodejs\\node.exe',
  'd:\\GitHub Repos\\Backend_Crash_Course\\Day-01-Intro-To_Backend-And-NodeJS\\Examples\\Example-01\\index.js'
]
*/

console.log(sum(1, 2));
console.log(sub(5, 2));
console.log(printGreetingWithName("Nageshwar"));
