const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getMe,
  sendVerificationCode,
  verifyOPTCode,
  refreshToken,
} = require("../controllers/userController");
const {
  validateLoginParams,
  validateRegisterParams,
  validateSendVerificationEmailParams,
  validateVerifyOPTParams,
} = require("../validators/user.validator");

router.post("/", validateRegisterParams, registerUser);
router.post("/login", validateLoginParams, loginUser);
router.post(
  "/send-verification-code",
  validateSendVerificationEmailParams,
  sendVerificationCode
);
router.post("/verify-opt-code", validateVerifyOPTParams, verifyOPTCode);
router.get("/getLoggedInUser", protect, getMe);
router.get("/getRefreshToken", protect, refreshToken);

module.exports = router;
