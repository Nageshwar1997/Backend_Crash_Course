const phoneRegex = /^\d{10}$/;
const testPhone = (phone) => {
  if (!phoneRegex.test(phone)) {
    return false;
  }
  return true;
};

module.exports = testPhone;
