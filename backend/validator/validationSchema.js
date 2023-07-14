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
  .valid("male", "female", "other")
  .required()
  .messages({
    "strings.empty": messagesResponse.gender_is_requird,
  });

export const contactSchema = Joi.string().label("Contact").required().messages({
  "string.empty": "Contact is required",
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

export const updateUserSchema = Joi.object({
  name: userNameSchema,
  gender: Joi.string().label("Gender").valid("male", "female", "other"),
  contact: Joi.string().label("Contact"),
  ban: Joi.boolean().label("Ban value"),
  verification: Joi.boolean().label("Ban value"),
});

/**Apparels Validation Schema */

const productName = Joi.string().label("Product Name").required().messages({
  "string.empty": "Product name required.",
});

const price = Joi.number().label("Price").required().messages({
  "number.empty": "Product price is required",
});

const color = Joi.string().label("Color").required().messages({
  "string.empty": "Product color is required",
});

const size = Joi.object({
  small: Joi.number().label("Small size"),
  medium: Joi.number().label("Medium Size"),
  large: Joi.number().label("Large size"),
}).required();

const productCategory = Joi.string()
  .label("Category")
  .valid("hoodie", "sweetshirt", "t-shirt")
  .required()
  .messages({
    "string.empty": "Product category type is required",
  });

const description = Joi.string().label("description").required().messages({
  "string.empty": "Product description is required",
});

const keyword = Joi.array().items(Joi.string()).required();

const image = Joi.object({
  name: Joi.string().label("Image name").required(),
  path: Joi.string().label("Image Path").required(),
}).required();

export const createProductTypeSchema = Joi.object({
  name: productName,
  price,
  color,
  size,
  category: productCategory,
  description,
  keyword,
  image: Joi.array().items(image).required(),
});

export const apparelStatus = Joi.object({
  status: Joi.boolean().label("Status").required(),
});
