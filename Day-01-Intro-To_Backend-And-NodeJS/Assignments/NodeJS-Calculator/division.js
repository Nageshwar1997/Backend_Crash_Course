const divide = (numbers) => {
  
  return numbers
    .slice(1)
    .reduce(
      (accumulator, currentValue) => accumulator / currentValue,
      numbers[0]
    );
};

module.exports = divide;