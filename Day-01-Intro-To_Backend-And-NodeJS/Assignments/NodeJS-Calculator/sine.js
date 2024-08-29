const sin = (numbers) => {
  if (numbers.length === 1) {
    return `sin(${numbers[0]}) = ${Math.sin(numbers[0])}`;
  }

  let str = "";

  numbers.forEach((num, index) => {
    str += `sin(${num}) = ${Math.sin(num)}\n`;
  });

  return str;
};

module.exports = sin;
