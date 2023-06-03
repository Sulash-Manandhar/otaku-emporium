import validate from "../utils/validate.js";
import { createProductTypeSchema, apparelStatus } from "./validationSchema.js";

export async function createProductValidator(req, _res, next) {
  return await validate(req.body, createProductTypeSchema)
    .then(() => next())
    .catch((err) => next(err));
}

export async function statusChangeValidator(req, res, next) {
  return await validate(req.body, apparelStatus)
    .then(() => next())
    .catch((err) => next(err));
}
