import asyncHandler from "express-async-handler";
import {
  encryptPassword,
  decryptPassword,
} from "../utils/passwordEncryption.js";
import User from "../models/user.model.js";
import boom from "@hapi/boom";
import logger from "../utils/Logger.js";
import { messagesResponse } from "../constant/errorMessages.js";
import { VALIDATION_ERROR } from "../constant/common.js";
import { getToken } from "../utils/generateToken.js";
import OPT from "../models/opt.model.js";
import mongoose from "mongoose";

const ObjectID = mongoose.Types.ObjectId;

export const handleUserRegistration = asyncHandler(async (body) => {
  const { name, email, password } = body;
  const hassedPassword = await encryptPassword(password);

  try {
    const user = await User.create({
      name,
      email,
      password: hassedPassword,
    });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  } catch (err) {
    if (err.code === 11000) {
      throw boom.conflict(
        JSON.stringify({
          message: messagesResponse.email_already_taken,
          type: VALIDATION_ERROR,
          param: "email",
        })
      );
    }
    logger.error(err);
    throw err;
  }
});

export const handleUserLogin = asyncHandler(async (body) => {
  const { email, password, remember = false } = body;
  const user = await User.findOne({ email });
  if (!user) {
    logger.error(`User with email '${email}' is not registered`);
    throw boom.notFound(
      JSON.stringify({
        message: messagesResponse.email_not_found,
        type: VALIDATION_ERROR,
        param: "email",
      })
    );
  }
  if (!decryptPassword(password, user?.password)) {
    logger.error(messagesResponse.invalid_password);
    throw boom.badRequest(
      JSON.stringify({
        message: messagesResponse.invalid_password,
        type: VALIDATION_ERROR,
        param: "password",
      })
    );
  }

  if (!user.verification) {
    logger.error(messagesResponse.user_not_verified);
    throw boom.forbidden(
      JSON.stringify({
        message: messagesResponse.user_not_verified,
        type: VALIDATION_ERROR,
        param: "user",
      })
    );
  }
  logger.info(`User ${email} is logged in`);
  return {
    success: true,
    message: "User is successfully logged in.",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      url: "https://bit.ly/dan-abramov",
    },
    access_token: getToken(user?.id, user?.email),
    refresh_token: remember ? getToken(user?.id, user?.email, true) : null,
  };
});

export const handleOPTverification = asyncHandler(async (body) => {
  const { user_id, code } = body;
  const user = await User.findById({ _id: user_id });
  if (!user) {
    throw boom.badData(messagesResponse.user_not_register);
  }
  if (user.verification) {
    return {
      success: true,
      message: messagesResponse.user_not_verified,
    };
  }

  const optCode = await OPT.find({ user_id });

  if (!optCode) {
    throw boom.badRequest(messagesResponse.verification_code_not_sent_to_user);
  }
  if (!optCode.code === code) {
    throw boom.badData(messagesResponse.invalid_opt_code);
  }
  const updateuser = await User.findByIdAndUpdate(
    user_id,
    { verification: true },
    { new: false }
  );
  if (!updateuser) {
    throw boom.internal(messagesResponse.something_went_wrong);
  }
  return {
    success: true,
    message: messagesResponse.user_verified,
  };
});

export const handleUserBan = asyncHandler(async (_id, ban) => {
  if (!ObjectID.isValid(_id)) {
    return boom.badData(messagesResponse.invalid_user_id);
  }
  const user = await User.findById({ _id });
  if (!user) {
    throw boom.badData(messagesResponse.invalid_user_id);
  }
  const updateUser = await User.findByIdAndUpdate({ _id }, { ban });
  if (!updateUser) {
    throw boom.internal(messagesResponse.something_went_wrong);
  }
  return {
    success: true,
    message:
      ban === "true" ? messagesResponse.user_ban : messagesResponse.user_unban,
  };
});

export const handeUserDelete = asyncHandler(async (_id) => {
  if (!ObjectID.isValid(_id)) {
    throw boom.badData(messagesResponse.invalid_user_id);
  }
  const user = await User.findById({ _id });
  if (!user) {
    throw boom.badData(messagesResponse.invalid_user_id);
  }
  const deletedUser = await User.findByIdAndRemove({ _id });
  if (!deletedUser) {
    throw boom.internal(messagesResponse.something_went_wrong);
  }
  return {
    success: true,
    message: messagesResponse.user_deleted,
  };
});

export const handleUserUpdate = asyncHandler(async (_id, body) => {
  console.log("body", body);
  const { name } = body;
  if (!ObjectID.isValid(_id)) {
    throw boom.badData(messagesResponse.invalid_user_id);
  }
  const user = await User.findById({ _id });
  if (!user) {
    throw boom.badData(messagesResponse.invalid_user_id);
  }
  const updateUser = await User.findByIdAndUpdate({ _id }, { name });
  console.log("updateUser", updateUser);
  return {
    success: true,
    message: messagesResponse.user_detail_updated,
    data: updateUser,
  };
});
