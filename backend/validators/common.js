const { passwordValidation } = require("../utils/functions");
const emailValidator = require("email-validator");

function validateEmailAddress(email) {
  if (!email) {
    throw new Error("Email is required.");
  }
  if (!emailValidator.validate(email)) {
    throw new Error("Invalid Email Address");
  }
}

function validateUserName(name) {
  if (name > 3) {
    throw new Error("Username should be more than three character long.");
  }
}

function validatePassword(password) {
  if (!password) {
    throw new Error("Password field is required");
  }
  if (!passwordValidation(password)) {
    throw new Error(
      "Password must contain at least 8 characters, a capital letter, a small letter, a symbol and a number."
    );
  }
}

function validateUserId(id) {
  if (!id) throw new Error("User Id is missing");
  if (id < 12) throw new Error("Invalid user Id");
}

module.exports = {
  validateEmailAddress,
  validateUserName,
  validateUserId,
  validatePassword,
};
