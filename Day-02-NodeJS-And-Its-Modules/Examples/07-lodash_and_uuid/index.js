const _ = require("lodash");
const { v4: uuid } = require("uuid");

const arr = [1, 2, 3, 4, 5, "AJKsjdk"];

const evenNumbers = _.filter(arr, (num) => typeof num === "number").filter(
  (num) => num % 2 === 0
);
const oddNumbers = _.filter(arr, (num) => typeof num === "number").filter(
  (num) => num % 2 !== 0
);

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const square = _.map(nums, (num) => num * num);

const reverse = _.reverse(arr);

const unique = _.uniq(arr);

console.log("Even Numbers:", evenNumbers);
console.log("Odd Numbers:", oddNumbers);
console.log("Square:", square);
console.log("Reverse:", reverse);
console.log("Unique:", unique);

console.log("UUID:", uuid());
