const tan = (numbers) => {
  if (numbers.length === 1) {
    return `tan(${numbers[0]}) = ${Math.tan(numbers[0])}`;
  }

  let str = "";

  numbers.forEach((num, index) => {
    str += `tan(${num}) = ${Math.tan(num)}\n`;
  });

  return str;
};

module.exports = tan;
