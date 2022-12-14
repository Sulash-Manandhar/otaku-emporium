const asyncHandler = require("express-async-handler");
const logger = require("../utils/Logger");
const {
  login,
  register,
  me,
  generateRefreshToken,
  sendEmail,
  OPTverification,
} = require("../services/user.service");

/**
 *@desc Register User
 *@route POST/api/users/
 */
const registerUser = asyncHandler(async (req, res) => {
  await register(req.body, res);
});

/**
 * @desc Authenticate a User
 * @route POST/api/users/login
 */
const loginUser = asyncHandler(async (req, res) => {
  await login(req.body, res);
});

/**
 * @desc Get User Data
 * @route Get/api/users/getLoggedInUser
 */
const getMe = asyncHandler(async (req, res) => {
  await me(req.user, res);
});

/**
 * @desc GET Refresh Token
 * @route GET/api/users/getRefreshToken
 */
const refreshToken = asyncHandler(async (req, res) => {
  logger.info("Fetching refresh token");
  console.log("body", req.body.refreshToken);
  await generateRefreshToken(req.body, res);
});

/**
 *@desc POST Generate 6 digit OTP code
 *@route POST /api/users/send-verification-code
 */
const sendVerificationCode = asyncHandler(async (req, res) => {
  logger.info("Sending verification code..");
  const email = req.body.email;
  await sendEmail(email, res);
});

/**
 * @desc POST Verify OPT code
 * @route POST /api/users/verify-opt-code
 */
const verifyOPTCode = asyncHandler(async (req, res) => {
  logger.info("Verifying user OPT code...");
  await OPTverification(req.body, res);
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
  sendVerificationCode,
  verifyOPTCode,
  refreshToken,
};
