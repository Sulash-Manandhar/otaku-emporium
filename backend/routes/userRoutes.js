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

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/send-verification-code", sendVerificationCode);
router.post("/verify-opt-code", verifyOPTCode);
router.get("/getLoggedInUser", protect, getMe);
router.get("/getRefreshToken", protect, refreshToken);

module.exports = router;
