const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getMe,
  sendVerificationCode,
  verifyOPTCode,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/getLoggedInUser", protect, getMe);
router.post("/send-verification-code", sendVerificationCode);
router.post("/verify-opt-code", verifyOPTCode);

module.exports = router;
