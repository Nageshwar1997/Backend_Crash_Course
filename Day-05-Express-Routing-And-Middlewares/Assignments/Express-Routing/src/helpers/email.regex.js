const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const testEmail = (email) => {
  if (!emailRegex.test(email)) {
    return false;
  }
  return true;
};

module.exports = { testEmail };