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
router.get("/getRefreshToken", refreshToken);
router.get("/getLoggedInUser", protect, getMe);

module.exports = router;
