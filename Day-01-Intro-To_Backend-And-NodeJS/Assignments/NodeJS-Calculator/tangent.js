// Function to calculate tangent for each number in the array
const tan = (numbers) => {
  if (numbers.length === 1) {
    // Return single tangent value if only one number is provided
    return `tan(${numbers[0]}) = ${Math.tan(numbers[0])}`;
  }

  let str = "";

  // Calculate and format tangent for each number in the array
  numbers.forEach((num) => {
    str += `tan(${num}) = ${Math.tan(num)}\n`;
  });

  return str;
};

module.exports = tan;
