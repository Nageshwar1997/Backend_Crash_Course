// Define a function named 'subtraction' that takes two arguments, num1 and num2
const subtraction = (num1, num2) => {
  // Perform the subtraction of num2 from num1 and return the result in a formatted string
  return `${num1} - ${num2} = ${num1 - num2}`;
};

// Export the 'subtraction' function so it can be used in other files
module.exports = subtraction;
