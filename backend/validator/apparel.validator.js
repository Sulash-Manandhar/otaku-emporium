import validate from "../utils/validate.js";
import { createProductTypeSchema } from "./validationSchema.js";

export async function createProductValidator(req, _res, next) {
  return await validate(req.body, createProductTypeSchema)
    .then(() => next())
    .catch((err) => next(err));
}
