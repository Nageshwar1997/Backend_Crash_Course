const cos = (numbers) => {
  if (numbers.length === 1) {
    return `cos(${numbers[0]}) = ${Math.cos(numbers[0])}`;
  }

  let str = "";

  numbers.forEach((num, index) => {
    str += `cos(${num}) = ${Math.cos(num)}\n`;
  });

  return str;
};

module.exports = cos;
