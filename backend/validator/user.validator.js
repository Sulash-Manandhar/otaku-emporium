import validate from "../utils/validate.js";
import * as ValidatorSchema from "./validationSchema.js";

export async function registerUserValidator(req, _res, next) {
  return await validate(req.body, ValidatorSchema.registerUserTypeSchema)
    .then(() => next())
    .catch((err) => next(err));
}

export async function loginUserValidator(req, res, next) {
  return await validate(req.body, ValidatorSchema.loginUserTypeSchema)
    .then(() => next())
    .catch((err) => next(err));
}

export async function sendVerificationCodeValidator(req, res, next) {
  return await validate(
    req.body,
    ValidatorSchema.sentVerificationCodeTypeSchema
  )
    .then(() => next())
    .catch((err) => next(err));
}
export async function verifyOPTCode(req, res, next) {
  return await validate(req.body, ValidatorSchema.verifyOPTCodeSchema)
    .then(() => next())
    .catch((err) => next(err));
}

export async function updateUserValidator(req, res, next) {
  return await validate(req.body, ValidatorSchema.updateUserSchema)
    .then(() => next())
    .catch((err) => next(err));
}
