const jwt = require("jsonwebtoken");
const logger = require("./Logger");

/**
 * @desc 120 === 2minutes, '6h' === 6 hours, '6d' === six days
 * @param {number} id
 * @param {string} email
 * @param {boolean} remember
 * @returns token
 */
const generateToken = (id, email, refresh = false) => {
  if (refresh) {
    logger.info("Generating refresh token");
    return jwt.sign({ id, email }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });
  }
  logger.info("Generating access token");
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const validateDate = (expired_date) => {
  const expiredInSeconds = new Date(expired_date * 1000);
  const nowInSeconds = new Date();
  return expiredInSeconds - nowInSeconds > 0;
};

/**
 *
 * @returns {number} OPT
 */
const generateOTP = () => {
  otp = Math.floor(Math.random() * 10000) + 99999;
  return otp;
};

/**
 *
 * @param {string} password
 * @returns {boolean}
 */
const passwordValidation = (password) => {
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/g;
  const found = password.match(pattern);
  return found === null ? false : true;
};

const throwError = (res, error) => {
  const { status, msg } = error;
  logger.error(msg);
  res.status(status);
  throw new Error(msg);
};

const returnResponse = (res, result) => {
  const { data, status, msg, success = true } = result;
  logger.info(msg);
  res.status(status).json({
    success: success ?? true,
    msg: msg,
    data: data || null,
  });
};

module.exports = {
  generateToken,
  generateOTP,
  passwordValidation,
  throwError,
  returnResponse,
  validateDate,
};
