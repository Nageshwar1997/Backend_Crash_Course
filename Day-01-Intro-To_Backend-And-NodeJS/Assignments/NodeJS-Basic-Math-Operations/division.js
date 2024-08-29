// Define a function named 'division' that takes two arguments, num1 and num2
const division = (num1, num2) => {
  // Check if the denominator (num2) is zero
  if (num2 === 0) {
    // Return an error message if the denominator is zero
    return `Denominator cannot be zero`;
  } else {
    // Perform the division and return the result in a formatted string
    return `${num1} / ${num2} = ${num1 / num2}`;
  }
};

// Export the 'division' function for use in other files
module.exports = division;
