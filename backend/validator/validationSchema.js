import { messagesResponse } from "../constant/errorMessages.js";
import { PASSWORD_REGREX } from "../constant/common.js";
import Joi from "@hapi/joi";
import mongoose from "mongoose";

const ObjectID = mongoose.Types.ObjectId;

export const userNameSchema = Joi.string()
  .label("Name")
  .min(3)
  .max(30)
  .required()
  .messages({
    "string.empty": messagesResponse.name_required,
    "string.min": messagesResponse.name_should_atleast_three_character_long,
    "string.max":
      messagesResponse.name_should_not_exceed_more_than_30_character,
  });

export const emailSchema = Joi.string()
  .email({ tlds: { allow: false } })
  .label("Email")
  .required()
  .messages({
    "string.empty": messagesResponse.email_required,
  });

export const passwordSchema = Joi.string()
  .label("Password")
  .regex(PASSWORD_REGREX)
  .required()
  .messages({
    "string.pattern.base": messagesResponse.password_validation_failed,
    "string.empty": messagesResponse.password_required,
  });

export const OPTCode = Joi.number()
  .label("OPT code")
  .min(100000)
  .max(999999)
  .required()
  .messages({
    "number.empty": messagesResponse.verification_code_required,
    "number.min": messagesResponse.invalid_opt_code,
    "number.max": messagesResponse.invalid_opt_code,
  });

export const UserID = Joi.string()
  .label("User id")
  .required()
  .custom((value, helper) => {
    if (!value) {
      return helper.message(messagesResponse.user_id_required);
    }
    if (!ObjectID.isValid(value)) {
      return helper.message(messagesResponse.invalid_user_id);
    }
    return true;
  });

export const registerUserTypeSchema = Joi.object({
  name: userNameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginUserTypeSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

export const sentVerificationCodeTypeSchema = Joi.object({
  email: emailSchema,
});

export const verifyOPTCodeSchema = Joi.object({
  user_id: UserID,
  code: OPTCode,
});

export const banUserSchema = Joi.object({
  ban: Joi.boolean().label("Ban value").required(),
});

export const updateUserSchema = Joi.object({
  name: userNameSchema,
});
