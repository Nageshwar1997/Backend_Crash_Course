// Function to subtract each subsequent number from the first number
const sub = (numbers) => {
  return numbers
    .slice(1)
    .reduce(
      (accumulator, currentValue) => accumulator - currentValue,
      numbers[0]
    );
};

module.exports = sub;
