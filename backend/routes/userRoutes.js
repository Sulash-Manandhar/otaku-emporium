const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getMe,
  sendVerificationCode,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/getLoggedInUser", protect, getMe);
router.post("/send-verification-code", sendVerificationCode);

module.exports = router;
