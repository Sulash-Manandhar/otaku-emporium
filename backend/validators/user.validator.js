const asyncHandler = require("express-async-handler");
const { throwError } = require("../utils/functions");
const {
  validateEmailAddress,
  validateUserName,
  validateUserId,
  validatePassword,
} = require("./common");

const validateLoginParams = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    validateEmailAddress(email);
    validatePassword(password);
    next();
  } catch (error) {
    throwError(res, {
      status: 400,
      msg: error.message,
    });
  }
});

const validateRegisterParams = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    validateUserName(name);
    validateEmailAddress(email);
    validatePassword(password);
    next();
  } catch (error) {
    throwError(res, {
      status: 400,
      msg: error.message,
    });
  }
});

const validateSendVerificationEmailParams = asyncHandler(
  async (req, res, next) => {
    const { email } = req.body;
    try {
      validateEmailAddress(email);
      next();
    } catch (error) {
      throwError(res, {
        status: 400,
        msg: error.message,
      });
    }
  }
);

const validateVerifyOPTParams = asyncHandler(async (req, res, next) => {
  const { user_id, code } = req;
  try {
    validateUserId(user_id);

    if (!code || code.length !== 6) {
      throw new Error("Invalid verification Code");
    }
    next();
  } catch (error) {
    throwError(res, {
      status: 400,
      msg: error.message,
    });
  }
});

module.exports = {
  validateLoginParams,
  validateRegisterParams,
  validateSendVerificationEmailParams,
  validateVerifyOPTParams,
};
