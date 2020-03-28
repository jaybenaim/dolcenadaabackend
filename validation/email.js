const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validateEmail = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.message = !isEmpty(data.message) ? data.message : "";
  data.html = !isEmpty(data.html) ? data.html : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (Validator.isEmpty(data.message)) {
    errors.message = "Error with your order";
  }
  if (Validator.isEmpty(data.html)) {
    errors.html = "Error with your order";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
