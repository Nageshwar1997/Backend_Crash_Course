// Define a function named 'sum' that takes two arguments, num1 and num2
const sum = (num1, num2) => {
  // Perform the addition of num1 and num2 and return the result in a formatted string
  return `${num1} + ${num2} = ${num1 + num2}`;
};

// Export the 'sum' function so it can be used in other files
module.exports = sum;
