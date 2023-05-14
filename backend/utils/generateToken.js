import jwt from "jsonwebtoken";

import logger from "./Logger.js";

const TWO_HOUR = "2h";
const ONE_HOUR = "1h";

/**
 * @desc 120 === 2minutes, '6h' === 6 hours, '6d' === six days
 * @param {number} id
 * @param {string} email
 * @param {boolean} remember
 * @returns token
 */
export function getToken(id, email, refresh = false) {
  logger.info("Generating token for", email);
  const expireTime = refresh ? TWO_HOUR : ONE_HOUR;
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: expireTime,
  });
}
