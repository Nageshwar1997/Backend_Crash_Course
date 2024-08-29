const crypto = require("crypto");

const add = require("./addition");
const sub = require("./subtraction");
const mult = require("./multiplication");
const divide = require("./division");
const sin = require("./sine");
const cos = require("./cosine");
const tan = require("./tangent");
const random = require("./randomNumberGeneration");

const argv = process.argv.slice(2);
const operation = argv[0];
const numbers = argv
  .slice(1)
  .map((num) => num.trim())
  .map(Number);

if (!operation) {
  console.log(
    "Please provide an operation, operations are: add, sub, mult, div, sin, cos, tan, random"
  );
  return;
} else if (numbers.length === 0) {
  console.log("Please provide an operands");
  return;
} else if (operation && numbers.includes(NaN)) {
  console.log("Please provide valid operands");
  return;
} else {
  switch (operation) {
    case "add": {
      if (numbers.length === 1) {
        console.log(numbers[0]);
        break;
      } else {
        console.log(add(numbers));
      }
      break;
    }
    case "sub": {
      if (numbers.length === 1) {
        console.log(numbers[0]);
        break;
      } else {
        console.log(sub(numbers));
      }
      break;
    }
    case "mult": {
      if (numbers.length === 1) {
        console.log(numbers[0]);
        break;
      } else {
        console.log(mult(numbers));
      }
      break;
    }
    case "divide": {
      if (numbers.length === 1) {
        console.log(numbers[0]);
        break;
      } else {
        if (numbers.slice(1).includes(0)) {
          console.log("Denominator cannot be zero");
          break;
        } else {
          console.log(divide(numbers));
        }
      }
      break;
    }
    case "sin": {
      console.log(sin(numbers));
      break;
    }
    case "cos": {
      console.log(cos(numbers));
      break;
    }
    case "tan": {
      console.log(tan(numbers));
      break;
    }
    case "random":
      {
        if (numbers.length === 1) {
          (async () => {
            try {
              const binaryStr = await random(4); // Adjust '4' based on your requirements
              console.log(binaryStr);
            } catch (err) {
              console.error(err);
            }
          })();
          break;
        } else {
          console.log("Provide only one length for random number generation.");
        }
      }
      break;

    default: {
      console.log(
        "Invalid Operation :- Please provide valid operation, operations are: add, sub, mult, div, sin, cos, tan, random"
      );
      break;
    }
  }
}
