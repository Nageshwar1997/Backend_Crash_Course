// Import the functions from other modules
const sum = require("./sum"); // Import the function for addition from the 'sum' module
const multiply = require("./multiplication"); // Import the function for multiplication from the 'multiplication' module
const subtraction = require("./subtraction"); // Import the function for subtraction from the 'subtraction' module
const division = require("./division"); // Import the function for division from the 'division' module

// Retrieve command-line arguments, excluding the first two which are node and script path
const argv = process.argv.slice(2);

// Extract operation and numbers from the arguments
const operation = argv[0]; // The operation to perform (sum, subtraction, multiply, or division)
const num1 = parseInt(argv[1]); // The first number for the operation
const num2 = parseInt(argv[2]); // The second number for the operation

// Check if the operation is provided
if (!operation) {
  console.log(
    "Please provide an operation. Available operations are: sum, subtraction, multiply, division"
  );
  return;
}

// Check if both numbers are provided and are valid
if (isNaN(num1) || isNaN(num2)) {
  console.log("Please provide two valid numbers to perform the operation on");
  return;
}

// Perform the operation based on the input and output the result
switch (operation) {
  case "sum": {
    console.log(sum(num1, num2)); // Call the sum function and log the result
    break;
  }
  case "subtraction": {
    console.log(subtraction(num1, num2)); // Call the subtraction function and log the result
    break;
  }
  case "multiply": {
    console.log(multiply(num1, num2)); // Call the multiplication function and log the result
    break;
  }
  case "division": {
    // Perform division and handle potential division by zero
    if (num2 === 0) {
      console.log("Error: Division by zero is not allowed");
    } else {
      console.log(division(num1, num2)); // Call the division function and log the result
    }
    break;
  }
  default: {
    console.log(
      "Invalid operation provided. Valid operations are: sum, subtraction, multiply, division"
    );
    break;
  }
}
