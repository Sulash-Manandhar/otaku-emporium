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

export const genderSchema = Joi.string()
  .label("Gender")
  .valid("male", "female", "others")
  .required()
  .messages({
    "strings.empty": messagesResponse.gender_is_requird,
  });

export const contactSchema = Joi.number()
  .integer()
  .max(9999999999)
  .min(9800000000)
  .required()
  .messages({
    "number.min": messagesResponse.invalid_contact_number,
    "number.max": messagesResponse.invalid_contact_number,
    "number.empty": messagesResponse.contact_number_required,
  });

export const citySchema = Joi.string().label("city").required().messages({
  "string.empty": messagesResponse.city_name_required,
});
export const zipCodeSchema = Joi.number()
  .label("Zip Code")
  .required()
  .messages({
    "string.empty": messagesResponse.zip_code_required,
  });
export const stateSchema = Joi.string().label("Street").required().messages({
  "string.empty": messagesResponse.state_name_required,
});

export const registerUserTypeSchema = Joi.object({
  name: userNameSchema,
  email: emailSchema,
  password: passwordSchema,
  gender: genderSchema,
  contact: contactSchema,
  address: Joi.object({
    state: stateSchema,
    zip_code: zipCodeSchema,
    city: citySchema,
  }).required(),
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
