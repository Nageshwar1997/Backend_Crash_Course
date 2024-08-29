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

// Check for valid operation and numbers
if (!operation) {
  console.log(
    "Please provide an operation, operations are: add, sub, mult, div, sin, cos, tan, random"
  );
  return;
} else if (numbers.length === 0) {
  console.log("Please provide operands");
  return;
} else if (numbers.includes(NaN)) {
  console.log("Please provide valid operands");
  return;
} else {
  switch (operation) {
    case "add": {
      // Handle addition operation
      if (numbers.length === 1) {
        console.log(numbers[0]);
        break;
      } else {
        console.log(add(numbers));
      }
      break;
    }
    case "sub": {
      // Handle subtraction operation
      if (numbers.length === 1) {
        console.log(numbers[0]);
        break;
      } else {
        console.log(sub(numbers));
      }
      break;
    }
    case "mult": {
      // Handle multiplication operation
      if (numbers.length === 1) {
        console.log(numbers[0]);
        break;
      } else {
        console.log(mult(numbers));
      }
      break;
    }
    case "divide": {
      // Handle division operation
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
      // Handle sine operation
      console.log(sin(numbers));
      break;
    }
    case "cos": {
      // Handle cosine operation
      console.log(cos(numbers));
      break;
    }
    case "tan": {
      // Handle tangent operation
      console.log(tan(numbers));
      break;
    }
    case "random": {
      // Handle random number generation
      if (numbers.length === 1) {
        (async () => {
          try {
            const binaryStr = await random(numbers[0]); // Use the provided length for random bytes
            console.log(binaryStr);
          } catch (err) {
            console.error(err);
          }
        })();
        break;
      } else {
        console.log("Provide only one length for random number generation.");
      }
      break;
    }

    default: {
      // Handle invalid operation
      console.log(
        "Invalid Operation :- Please provide valid operation, operations are: add, sub, mult, div, sin, cos, tan, random"
      );
      break;
    }
  }
}
