function validataeEmail(value) {
  const regex = /(^\w.*@\w+\.\w)/;
  if (value && regex.test(value)) {
    return true;
  }
  return false;
}

function validatePassword(value) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{4,10}$)/;
  if (value && regex.test(value)) {
    return true;
  }
  return false;
}

export { validataeEmail, validatePassword };
