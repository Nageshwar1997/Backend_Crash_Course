const add = (numbers) => {
  return numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
};

module.exports = add;
