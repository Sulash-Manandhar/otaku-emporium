import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";
import * as Validator from "../validator/user.validator.js";

const router = Router();

router.post(
  "/register",
  Validator.registerUserValidator,
  UserController.registerUser
);
router.post("/login", Validator.loginUserValidator, UserController.loginUser);

router.post(
  "/send-verification-code",
  Validator.sendVerificationCodeValidator,
  UserController.verificationCode
);

router.post("/verify-code", Validator.verifyOPTCode, UserController.verifyOPT);

router.patch(
  "/update-user/:_id",
  Validator.updateUserValidator,
  UserController.updateUser
);

router.delete("/delete/:_id", UserController.deleteUser);

router.get("/", UserController.getAllUser);
router.get("/:_id", UserController.getUser);

export default router;
