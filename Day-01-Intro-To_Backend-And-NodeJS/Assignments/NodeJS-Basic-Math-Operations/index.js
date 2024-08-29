// Import the functions from other modules
const sum = require("./sum"); // Function for addition
const multiply = require("./multiplication"); // Function for multiplication
const subtraction = require("./subtraction"); // Function for subtraction
const division = require("./division"); // Function for division

// Define variables for the addition operation
let sumA = 3;
let sumB = 5;
// Call the sum function and store the result
let sumResult = sum(sumA, sumB);
// Output the result of the addition operation to the console
console.log(sumResult);

// Define variables for the subtraction operation
let subA = 5;
let subB = 3;
// Call the subtraction function and store the result
let subResult = subtraction(subA, subB);
// Output the result of the subtraction operation to the console
console.log(subResult);

// Define variables for the multiplication operation
let mulA = 4;
let mulB = 6;
// Call the multiplication function and store the result
let mulResult = multiply(mulA, mulB);
// Output the result of the multiplication operation to the console
console.log(mulResult);

// Define variables for the division operation with a non-zero denominator
let divA = 6;
let divB = 2;
// Call the division function and store the result
let divResult1 = division(divA, divB);
// Output the result of the division operation to the console
console.log(divResult1);

// Define variables for the division operation with a zero denominator
let divC = 6;
let divD = 0;
// Call the division function and store the result
let divResult2 = division(divC, divD);
// Output the result of the division operation to the console, including error message
console.log(divResult2);
