// Define a function named 'multiply' that takes two arguments, num1 and num2
const multiply = (num1, num2) => {
  // Perform the multiplication of num1 and num2 and return the result in a formatted string
  return `${num1} * ${num2} = ${num1 * num2}`;
};

// Export the 'multiply' function so it can be used in other files
module.exports = multiply;
