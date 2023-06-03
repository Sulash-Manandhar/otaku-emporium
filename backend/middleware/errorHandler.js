import { ValidationError } from "@hapi/joi/lib/errors.js";
import logger from "../utils/Logger.js";
import HttpStatus from "http-status-codes";
import { buildError } from "../utils/buildError.js";
import { messagesResponse } from "../constant/errorMessages.js";
import isJSON from "../utils/isJSON.js";
/**
 * Boom error response middleware for handling boom error.
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
export function boomErrorHandler(err, req, res, next) {
  const { isBoom, output } = err;
  if (isBoom) {
    if (isJSON(output.payload.message)) {
      const errorObject = JSON.parse(output?.payload?.message);
      return res.status(output.statusCode ?? 400).json({
        success: false,
        message: messagesResponse.bad_request,
        details: [
          {
            message: errorObject?.message,
            param: errorObject?.param,
          },
        ],
      });
    }
    return res.status(output.payload.statusCode ?? 500).json({
      message: output.payload.message ?? messagesResponse.something_went_wrong,
      success: false,
    });
  }
  next(err);
}

/**
 * Validation error response middleware
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
export function validationErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    const error = buildError(err);
    logger.error(err.stack);
    return res.status(error.code).json({
      error: {
        ...error,
        success: false,
      },
    });
  }
  next(err);
}

/**
 * Generic error response middleware for internal server errors.
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
export function genericErrorHandler(err, _req, res, _next) {
  logger.error(err.stack);
  const error = buildError(err);

  return res.status(error.code || HttpStatus.INTERNAL_SERVER_ERROR).json({
    error: {
      ...error,
      success: false,
    },
  });
}
