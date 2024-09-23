const phoneRegex = /^\d{10}$/;
const testPhone = (phone) => {
  if (!phoneRegex.test(parseInt(phone))) {
    return false;
  }
  return true;
};

module.exports = testPhone;
