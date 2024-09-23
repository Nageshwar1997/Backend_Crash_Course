const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const testPassword = (password) => {
  if (!passwordRegex.test(password)) {
    return false;
  }
  return true;
};

module.exports = { testPassword };
