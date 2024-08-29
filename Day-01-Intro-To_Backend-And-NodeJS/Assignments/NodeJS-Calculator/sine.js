// Function to calculate sine for each number in the array
const sin = (numbers) => {
  if (numbers.length === 1) {
    // Return single sine value if only one number is provided
    return `sin(${numbers[0]}) = ${Math.sin(numbers[0])}`;
  }

  let str = "";

  // Calculate and format sine for each number in the array
  numbers.forEach((num) => {
    str += `sin(${num}) = ${Math.sin(num)}\n`;
  });

  return str;
};

module.exports = sin;
