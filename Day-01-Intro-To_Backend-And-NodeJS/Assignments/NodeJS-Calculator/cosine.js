// Function to calculate cosine for each number in the array
const cos = (numbers) => {
  if (numbers.length === 1) {
    // Return single cosine value if only one number is provided
    return `cos(${numbers[0]}) = ${Math.cos(numbers[0])}`;
  }

  let str = "";

  // Calculate and format cosine for each number in the array
  numbers.forEach((num) => {
    str += `cos(${num}) = ${Math.cos(num)}\n`;
  });

  return str;
};

module.exports = cos;
