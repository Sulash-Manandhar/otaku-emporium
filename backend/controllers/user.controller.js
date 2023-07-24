import asyncHandler from "express-async-handler";
import HttpStatus from "http-status-codes";
import * as UserService from "../services/user.service.js";
import { sendUserVerificationCode } from "../services/mail.service.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  UserService.handleUserRegistration(req.body)
    .then((data) =>
      res.status(HttpStatus.CREATED).json({
        data,
        msg: "user has been registered successfully",
        success: true,
      })
    )
    .catch((err) => next(err));
});

export const loginUser = asyncHandler(async (req, res, next) => {
  UserService.handleUserLogin(req.body)
    .then((data) => res.status(HttpStatus.OK).json(data))
    .catch((err) => next(err));
});

export const verificationCode = asyncHandler(async (req, res, next) => {
  sendUserVerificationCode(req.body)
    .then((data) => {
      res.status(HttpStatus.OK).json({
        data,
        success: true,
        msg: "Verification code has been to your email address.",
      });
    })
    .catch((err) => next(err));
});

export const verifyOPT = asyncHandler(async (req, res, next) => {
  UserService.handleOPTverification(req.body)
    .then((data) => res.status(HttpStatus.OK).json(data))
    .catch((err) => next(err));
});

export const updateUser = asyncHandler(async (req, res, next) => {
  UserService.handleUserUpdate(req.params._id, req.body)
    .then((data) => res.status(HttpStatus.ACCEPTED).json(data))
    .catch((err) => next(err));
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  UserService.handeUserDelete(req.params._id)
    .then((data) => res.status(HttpStatus.OK).json(data))
    .catch((err) => next(err));
});

export const getUser = asyncHandler(async (req, res, next) => {
  UserService.getUserDetail(req.params._id)
    .then((user) => {
      res.json({
        success: true,
        message: "User detail successfully fetched",
        data: user,
      });
    })
    .catch((err) => next(err));
});

export const getAllUser = asyncHandler(async (req, res, next) => {
  UserService.getAllUsers(req.query)
    .then((data) =>
      res.status(HttpStatus.OK).json({
        success: true,
        message: "Successfully fetched all user data",
        data,
      })
    )
    .catch((err) => next(err));
});
